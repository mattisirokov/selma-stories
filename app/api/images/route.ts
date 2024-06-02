import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI(process.env.OPENAI_API_KEY as any);

export async function POST(req: NextRequest) {
  const prompt =
    "A young blonde girl with bright blue eyes, large cheeks, standing on the moon, looking at a distant figure approaching.";

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    const imageUrls = response.data.map((img: any) => img.url);

    return NextResponse.json({ imageUrls });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}
