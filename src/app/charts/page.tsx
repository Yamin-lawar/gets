"use client"
import React, { ButtonHTMLAttributes, HtmlHTMLAttributes, InputHTMLAttributes, useState } from "react";

type Props = {};

export default function Charts({}: Props) {
  const [promptValue, setPromptValue] = useState<string>("");

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const { value } = e.target;
    setPromptValue(value);
  }
  return (
    <div>
      <div className="flex justify-center relative h-screen overflow-y-auto">
        <div className="p-4">{/* Your page content can go here */}</div>

        <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300 flex justify-center">
          <div className="relative w-9/12">
            <input
              type="text"
              className="w-full border-2 border-blue-500 p-2 pr-16 rounded-lg"
              placeholder="Generate chart for any data..."
              onChange={handlePromptChange}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 
                rounded-2xl p-1 text-white bg-blue-500 px-3 disabled:bg-gray-400 
                disabled:cursor-not-allowed"
                disabled={promptValue.length <= 0}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
