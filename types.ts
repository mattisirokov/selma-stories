export type StoryLength = "short" | "medium" | "long";

export type Language = "English" | "Finnish";

export interface StoryParams {
  title: string;
  theme: string[];
  herraMattiAddition: boolean;
  mainCharacter: string;
  mainCharacterTraits: string[];
  setting: string;
  amountOfImages: number;
  imageStyle: string;
  targetAge: number;
  moral: string;
  length: StoryLength;
  language: Language;
}

export interface ImageParams {
  artStyle: string;
  colorScheme: string;
  mood: string;
  focusElement: string;
}

export interface Story {
  id: number;
  created_at: string;
  title: string;
  content: string;
  image_urls: string[];
}
