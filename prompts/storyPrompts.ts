import { StoryParams, ImageParams } from "@/types";

export const generateStoryPrompt = (params: StoryParams) => {
  const {
    title,
    theme,
    mainCharacter,
    setting,
    targetAge,
    moral,
    length,
    language,
  } = params;

  return `Create a ${length} children's story in ${language} and in that language only, don't return a seperate translation. suitable for ${targetAge}-year-olds with the following specifications:
    - Title: ${title}
    - Theme: ${theme}
    - Main character should be a ${mainCharacter}
    - Set in a ${setting}
    ${moral ? `- Include this moral lesson: ${moral}` : ""}
    - Use simple, engaging language
    - Include dialogue between characters
    - Create natural breaks for page turns
    - End with a satisfying conclusion`;
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
