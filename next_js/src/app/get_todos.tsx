"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import TodoButton from "./todo_button"; // Ensure this is correctly imported
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Addtodo() {
  const BASE_URL = "http://127.0.0.1:8000";
  const [formattedTodos, setFormattedTodos] = useState("");
  const [selectId, setSelectId] = useState("");

  const formatTodo = (todo: any) =>
    ` id: ${todo.id}\t Title: ${todo.title}\t Description: ${todo.description}\n`;

  async function fetchTodobyid() {
    if (!selectId) return; // Early return if selectId is empty
    try {
      const response = await axios.get(`${BASE_URL}/todos/${selectId}`);
      console.log("Todo fetched successfully", response.data);
      // Directly format and set the single todo
      const formatted = formatTodo(response.data);
      setFormattedTodos(formatted);
    } catch (error) {
      console.error("Error fetching todo:", (error as AxiosError).message);
      setFormattedTodos("Error fetching todo"); // Set error message if fetch fails
    }
  }

  async function fetchTodos() {
    try {
      const response = await axios.get(`${BASE_URL}/todos/`);
      console.log("Todos fetched successfully", response.data);
      // Format each todo and join with double line breaks for separation
      const formatted = response.data.map(formatTodo).join("\n\n");
      setFormattedTodos(formatted);
    } catch (error) {
      console.error("Error fetching todos:", (error as AxiosError).message);
    }
  }

  // Function to clear the formattedTodos state
  function clearFormattedTodos() {
    setFormattedTodos("");
  }

  return (
    <main className="">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-2xl font-bold mb-3">Get your Data</h1>
        <Input
          placeholder="Get data by ID"
          value={selectId}
          onChange={(e) => setSelectId(e.target.value)}
          className="mr-2 w-48 h-12 border-2 border-slate-300 rounded-2xl"
        />
        <TodoButton onClick={fetchTodobyid} />
        <textarea
          placeholder="Results will appear here..."
          value={formattedTodos}
          className="w-[600px] h-48 mb-3 border-2 border-slate-300 rounded-2xl "
          readOnly
        />
        <div className="flex">
          <TodoButton onClick={fetchTodos} />
          <button
            className="bg-blue-500 text-white px-10 my-2 py-2 mb-2 rounded-2xl ml-3"
            onClick={clearFormattedTodos}
          >
            Clear
          </button>
        </div>
      </div>
    </main>
  );
}
