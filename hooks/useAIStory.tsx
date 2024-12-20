import { useState } from "react";

import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

import {
  generateStoryPrompt,
  generateImagePrompt,
} from "../prompts/storyPrompts";

import { StoryParams, ImageParams, Story } from "@/types";

// import ReactNativeBlobUtil from "react-native-blob-util";
// import { Audio } from "expo-av";

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

  const [audioLoadingState, setAudioLoadingState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const client = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  });

  // function to create a story

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

        let imageUrls: string[] = [];
        if (amountOfImages > 0) {
          imageUrls = await generateImages(
            storyContent,
            amountOfImages,
            imageParams
          );
          setImages(imageUrls);
        }

        await uploadStoryToSupabaseDB(
          storyParams.title,
          storyContent,
          imageUrls
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

  // function to generate images for a story

  const generateImages = async (
    story: string,
    numberOfImages: number,
    imageParams: ImageParams
  ): Promise<string[]> => {
    setImagesLoadingState("loading");
    try {
      const imageUrls: string[] = [];

      // Generate one image at a time
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
          n: 1,
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

  // function to generate audio reading from story content

  const generateAudioReading = async (content: string) => {
    // setAudioLoadingState("loading");
    // try {
    //   const response = await client.audio.speech.create({
    //     model: "tts-1",
    //     voice: "alloy",
    //     input: content,
    //   });
    //   // Get the temporary directory path
    //   const tempPath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/temp-audio.mp3`;
    //   // Write the audio buffer to a temporary file
    //   await ReactNativeBlobUtil.fs.writeFile(
    //     tempPath,
    //     // @ts-ignore
    //     await response.arrayBuffer(),
    //     "binary"
    //   );
    //   // Load and play the audio using Expo's Audio API
    //   const { sound } = await Audio.Sound.createAsync({
    //     uri: `file://${tempPath}`,
    //   });
    //   await sound.playAsync();
    //   setAudioLoadingState("success");
    //   return sound;
    // } catch (error) {
    //   setAudioLoadingState("error");
    //   console.error("Error generating audio:", error);
    //   return null;
    // }
  };

  // function to upload story to the database

  async function uploadStoryToSupabaseDB(
    title: string,
    content: string,
    imageUrls: string[]
  ) {
    const { data, error } = await supabase
      .from("Stories")
      .insert([
        {
          title: title,
          content: content,
          image_urls: imageUrls,
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

  // function to get all stories from the database

  const getStories = async (): Promise<Story[] | null> => {
    const { data, error } = await supabase.from("Stories").select();
    if (error) {
      console.log("get stories failed", error);
      return null;
    }
    return data || [];
  };

  // function to get a single story from the database

  const getStory = async (id: string): Promise<Story | null> => {
    const { data, error } = await supabase
      .from("Stories")
      .select()
      .eq("id", id);
    if (error) {
      console.log("get story failed", error);
      return null;
    }
    return data[0] || null;
  };

  return {
    story,
    images,
    createStory,
    getStories,
    getStory,
    storyLoadingState,
    imagesLoadingState,
    generateAudioReading,
    audioLoadingState,
  };
};
