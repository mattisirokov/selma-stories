import { useState } from "react";

import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

import {
  generateStoryPrompt,
  generateImagePrompt,
} from "../prompts/storyPrompts";

import { StoryParams, ImageParams } from "@/types";

export const useAIStory = () => {
  const [story, setStory] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_KEY!
  );

  const [imagesLoadingState, setImagesLoadingState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [storyLoadingState, setStoryLoadingState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const client = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  });

  const createStory = async (
    amountOfImages: number,
    storyParams: StoryParams,
    imageParams: ImageParams
  ) => {
    setStoryLoadingState("loading");
    try {
      const storyPrompt = generateStoryPrompt(storyParams || ({} as any));
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: "user", content: storyPrompt }],
        model: "gpt-3.5-turbo",
      });

      const storyContent = chatCompletion.choices[0].message.content;
      if (storyContent) {
        setStory(storyContent);
        console.log("Generated story:", storyContent);

        let imageUrl = "";
        if (amountOfImages > 0) {
          // Generate images before uploading the story
          const urls = await generateImages(
            storyContent,
            amountOfImages,
            imageParams
          );
          imageUrl = urls[0] || "";
          setImages(urls);
        }

        // Upload story content with image URL to Stories table
        await uploadStoryToSupabaseDB(
          storyParams.title,
          storyContent,
          imageUrl
        );
        setStoryLoadingState("success");
      } else {
        setStoryLoadingState("error");
      }
    } catch (error) {
      setStoryLoadingState("error");
      console.error("Error generating story:", error);
    }
  };

  const generateImages = async (
    story: string,
    numberOfImages: number,
    imageParams: ImageParams
  ): Promise<string[]> => {
    setImagesLoadingState("loading");
    try {
      const imageUrls: string[] = [];
      for (let i = 0; i < numberOfImages; i++) {
        const imagePrompt = generateImagePrompt(
          story,
          i,
          numberOfImages,
          imageParams || ({} as any)
        );
        const response = await client.images.generate({
          model: "dall-e-3",
          prompt: imagePrompt,
          n: numberOfImages,
          size: "1024x1024",
        });
        if (response.data[0].url) {
          imageUrls.push(response.data[0].url);
        }
      }
      setImagesLoadingState("success");
      return imageUrls;
    } catch (error) {
      setImagesLoadingState("error");
      console.error("Error generating images:", error);
      return [];
    }
  };

  async function uploadStoryToSupabaseDB(
    title: string,
    content: string,
    imageUrl: string
  ) {
    const { data, error } = await supabase
      .from("Stories")
      .insert([
        {
          title: title,
          content: content,
          image_url: imageUrl,
        },
      ])
      .select();

    if (error) {
      console.log("upload failed", error);
      return null;
    } else {
      console.log("upload successful", data);
      return data[0].id;
    }
  }

  return { story, images, createStory, storyLoadingState, imagesLoadingState };
};
