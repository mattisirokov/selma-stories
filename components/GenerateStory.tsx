"use client";

import { useChat } from "ai/react";
import { addNewStoryToDB } from "@/server/story/actions";

export default function GenerateStory() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleSaveStoryToDatabase = async (formData: FormData) => {
    const title = formData.get("title") as string;
    await addNewStoryToDB(
      title,
      messages.map((message) => message.content).join(""),
    );
  };

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}
      <form
        className={
          "absolute right-10 top-[50%] flex -translate-y-1/2 transform flex-col"
        }
        action={handleSaveStoryToDatabase}
      >
        <input
          type="text"
          title={"Title"}
          name={"title"}
          placeholder="Title"
          className={"border-2"}
        />
        <button type={"submit"}>save to database</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-12 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Let's make a story..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
