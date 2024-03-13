"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Todo from "@/app/accets/todo.jpeg";
import axios, { Axios, AxiosError } from "axios";
import TodoButton from "./todo_button";
import React, { useState } from "react";

export default function Addtodo() {
  const BASE_URL = "http://127.0.0.1:8000";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDataAdded, setIsDataAdded] = useState(false);

  async function createTodo() {
    try {
      const response = await axios.post(`${BASE_URL}/todos/`, {
        title,
        description,
      });
      console.log("Todo added successfully");
      setIsDataAdded(true);

      // Clear the input fields after successful data addition
      setTitle("");
      setDescription("");

      return response;
    } catch (error) {
      console.error("Error:", (error as AxiosError).message);
    }
  }

  return (
    <main className="sticky">
      <div className="w-full h-screen  flex flex-col justify-center items-center ">
        <Image src={Todo} alt="logo" width={400} height={400} />
        <h1 className="text-2xl font-bold mb-3">Todo App</h1>

        <h2 className="">Enter todo title</h2>
        <Input
          placeholder="Input the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-96 h-12 mb-3  border-2 border-slate-300 rounded-2xl"
        />
        <h2 className="">Enter todo Description</h2>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="max-w-96 h-28 border-2 border-slate-300 rounded-2xl "
        />

        <TodoButton onClick={createTodo} />
        {isDataAdded && (
          <p className="text-green-800">Data added successfully!</p>
        )}
      </div>
    </main>
  );
}
