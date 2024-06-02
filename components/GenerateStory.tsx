"use client";

import { useChat } from "ai/react";

export default function GenerateStory() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}

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
