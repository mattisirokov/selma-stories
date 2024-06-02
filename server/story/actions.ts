"use server";

import { createClient } from "@/utils/supabase/server";
import { Story } from "@/types";

// function to get authenticated user object from supabase

export async function getAllGeneratedStories(): Promise<Story[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("Stories").select(`*`);

  if (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }

  return data;
}

// function to save a new story to the database, content should be a JSON object

export async function addNewStoryToDB(title: string, content: string) {
  const supabase = await createClient();

  const jsonStringMatch = content.match(/```json\s*([\s\S]*?)\s*```/);

  if (jsonStringMatch) {
    const jsonString = jsonStringMatch[1].trim();

    try {
      const jsonObject = JSON.parse(jsonString);

      const { error: storyError } = await supabase.from("Stories").insert([
        {
          title: title,
          content: jsonObject,
        },
      ]);

      if (storyError) {
        console.error("Error adding story:", storyError);
        return [];
      }

      return jsonObject;
    } catch (error) {
      console.error("Invalid JSON format:", error);
      return [];
    }
  } else {
    console.error("No JSON found in the content.");
    return [];
  }
}
