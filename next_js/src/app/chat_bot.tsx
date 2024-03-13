"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const openai = require("openai");

const aiclient = new openai.OpenAI({
  apiKey: "apikey",
  dangerouslyAllowBrowser: true,
});

export default function Addtodo() {
  const [formattedTodos, setFormattedTodos] = useState("");
  const [userInput, setUserInput] = useState("");

  function clearFormattedTodos() {
    setFormattedTodos("");
  }

  async function handleUserInput() {
    try {
      // Fetch data from the base URL
      const baseResponse = await axios.get(`${BASE_URL}/todos/`);
      const databaseData = baseResponse.data;
      console.log("Base URL response:", baseResponse.data);

      // Format or serialize your databaseData here if necessary
      // For example, if databaseData is an object or array, you might want to convert it to a string
      // This step depends on your data and how you want the AI to interpret it
      const databaseDataString = JSON.stringify(databaseData); // This is a simple example; adjust as needed

      const chatCompletion = await aiclient.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Database data: ${databaseDataString}`,
          }, // Pass database data as context
          { role: "user", content: userInput },
        ],
        model: "gpt-3.5-turbo-0125",
      });
      console.log("OpenAI completion:", chatCompletion);
      const completionMessage =
        chatCompletion.choices[0]?.message?.content || "No response from AI";

      setFormattedTodos(completionMessage);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      setFormattedTodos("Error: " + error); // More descriptive error handling
    }
  }

  return (
    <main className="">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-2xl font-bold mb-3 mt-6">Chat Bot</h1>
        <Input
          placeholder="Enter your query"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="mr-2 w-[650px] h-12 border-2 border-slate-300 rounded-2xl my-6"
        />
        <textarea
          placeholder="Results will appear here..."
          value={formattedTodos}
          className="w-[600px] h-48 mb-3 border-2 border-slate-300 rounded-2xl p-3"
          readOnly
        />
        <div className="flex">
          <button
            className="bg-blue-500 text-white px-10 my-2 py-2 mb-2 rounded-2xl ml-3"
            onClick={handleUserInput}
          >
            Submit
          </button>
          <button
            className="bg-gray-500 text-white px-10 my-2 py-2 mb-2 rounded-2xl ml-3"
            onClick={clearFormattedTodos}
          >
            Clear
          </button>
        </div>
      </div>
    </main>
  );
}
