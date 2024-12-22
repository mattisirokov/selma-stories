import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

import {
  generateStoryPrompt,
  generateImagePrompt,
} from "../prompts/storyPrompts";

import { StoryParams, ImageParams, Story } from "@/types";

interface StoriesContextType {
  story: string;
  images: string[];
  stories: Story[];
  createStory: (
    amountOfImages: number,
    storyParams: StoryParams,
    imageParams: ImageParams
  ) => Promise<void>;
  getStories: () => Promise<Story[] | null>;
  getStory: (id: string) => Promise<Story | null>;
  storyLoadingState: "idle" | "loading" | "success" | "error";
  imagesLoadingState: "idle" | "loading" | "success" | "error";
  generateAudioReading: (content: string) => Promise<void>;
  audioLoadingState: "idle" | "loading" | "success" | "error";
}

const StoriesContext = createContext<StoriesContextType | undefined>(undefined);

export function StoriesProvider({ children }: { children: ReactNode }) {
  const [stories, setAllStories] = useState<Story[]>([]);
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

  useEffect(() => {
    const fetchInitialStories = async () => {
      const fetchedStories = await getStories();
      if (fetchedStories) {
        setAllStories(fetchedStories);
      }
    };

    fetchInitialStories();
  }, []);

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

  const generateAudioReading = async (content: string) => {
    // Audio generation implementation
  };

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
      setAllStories((prevStories) => [...prevStories, data[0]]);
      return data[0].id;
    }
  }

  const getStories = async (): Promise<Story[] | null> => {
    const { data, error } = await supabase.from("Stories").select();
    if (error) {
      console.log("get stories failed", error);
      return null;
    }
    return data || [];
  };

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

  const value = {
    story,
    images,
    stories,
    createStory,
    getStories,
    getStory,
    storyLoadingState,
    imagesLoadingState,
    generateAudioReading,
    audioLoadingState,
  };

  return (
    <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>
  );
}

export function useStories() {
  const context = useContext(StoriesContext);
  if (context === undefined) {
    throw new Error("useStories must be used within a StoriesProvider");
  }
  return context;
}
