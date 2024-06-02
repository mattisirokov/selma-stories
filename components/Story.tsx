"use client";

import React, { useState } from "react";

import { Button } from "./ui/button";

export default function GenerateImage() {
  const [imageUrls, setImageUrls] = useState<string[] | null>(null);

  const generateImages = async () => {
    try {
      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.imageUrls) {
        setImageUrls(data.imageUrls);
        console.log(data.imageUrls);
      } else {
        console.error("Error generating images:", data.error);
      }
    } catch (error) {
      console.error("Error generating images:", error);
    }
  };

  return (
    <div>
      <Button variant={"secondary"} onClick={generateImages}>
        Generate Image
      </Button>
      {imageUrls && (
        <div className="flex flex-col gap-4">
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Generated image ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}
