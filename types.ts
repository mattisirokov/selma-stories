export type StoryTheme =
  | "adventure"
  | "fantasy"
  | "educational"
  | "moral"
  | "bedtime";

export type ArtStyle =
  | "watercolor"
  | "cartoon"
  | "realistic"
  | "digital"
  | "pencil";

export type StoryLength = "short" | "medium" | "long";

export type Language = "English" | "Finnish";

export interface FormState {
  title: string;
  mainCharacter: string;
  mainCharacterTraits: string[];
  theme: string[];
  moral: string;
  setting: string;
  amountOfImages: number;
  imageStyle: string;
}

export interface StoryParams {
  title: string;
  theme: StoryTheme;
  mainCharacter: string;
  setting: string;
  targetAge: number;
  moral: string;
  length: StoryLength;
  language: Language;
}

export interface ImageParams {
  artStyle: ArtStyle;
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
