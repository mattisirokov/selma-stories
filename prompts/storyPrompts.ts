import { StoryParams, ImageParams } from "@/types";

export const generateStoryPrompt = (params: StoryParams) => {
  const {
    title,
    theme,
    mainCharacter,
    mainCharacterTraits,
    herraMattiAddition,
    setting,
    targetAge,
    moral,
    length,
    language,
  } = params;

  return `Create a ${length} children's story in ${language} and in that language only, don't return a seperate translation. suitable for ${targetAge}-year-olds with the following specifications:
    - Title: ${title}
    - Theme: ${theme}
    - Main character should be ${mainCharacter}, who has the traits: ${mainCharacterTraits}
    - Set in a ${setting}
    ${moral ? `- Include this moral lesson: ${moral}` : ""}
    - Use simple, engaging language, make the text easy and fun to read.
    - Include dialogue between characters
    - Create natural breaks for page turns
    - If the ${herraMattiAddition} is true, then make sure to add a twist to the tale: Herra Matti (a 20-something year-old man with a beard and rounded glasses) should save the day and be a hero - how that happend is up to you!
    - End with a satisfying conclusion, do not include the title or "the end" within the generated story.`;
};

export const generateImagePrompt = (
  story: string,
  sceneIndex: number,
  totalScenes: number,
  params: ImageParams
) => {
  const { artStyle, colorScheme, mood, focusElement } = params;

  return `Create a children's book illustration for scene ${
    sceneIndex + 1
  } of ${totalScenes} with these specifications:
    - Art style: ${artStyle}
    - Color scheme: ${colorScheme}
    - Mood: ${mood}
    - Style: child-friendly, engaging, and appropriate for young readers
    ${focusElement ? `- Focus on: ${focusElement}` : ""}
    
    Story context: ${story}
    
    Make sure the illustration:
    - Is clear and easily understandable
    - Has good composition
    - Maintains consistency with children's book aesthetics
    - Avoids any scary or inappropriate elements`;
};
