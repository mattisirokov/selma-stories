import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText } from "ai";

export async function POST(req: Request) {
  const character = "Selma";
  const characterDescription =
    "A young blonde girl with bright blue eyes, large cheeks";
  const heroInTheStory = "Herra Matti";
  const heroDescription =
    "A young man with a kind face, short brown hair and a blue shirt, full beard and glasses.";
  const place = "the moon";
  const moralOfTheStory = "to understand the value of freindship";
  const language = "Finnish";
  const numberOfPages = 3;
  const formatting = `format the story as a JSON object, split the content of the story into ${numberOfPages} arrays. Each page should contain an array called "story_text" and "image_prompt". Each page or array should have an image prompt appended, the image prompt should not involve the names but the character descrptions, ${characterDescription}, ${heroDescription} and it should reflect what the characters are doing on given page. The characters should be shown from a distance and never too close to the camera/viewpoint. The total length of the story should be around 800 characters.`;

  const prompt = `Make me a short story about a girl named ${character}, who goes to ${place}, meets a hero called ${heroInTheStory} and the moral of the story is ${moralOfTheStory}, tell the story in ${language}, apply the following formatting: ${formatting}`;

  const result = await streamText({
    model: openai("gpt-4o"),
    prompt,
  });

  return new StreamingTextResponse(result.toAIStream());
}
