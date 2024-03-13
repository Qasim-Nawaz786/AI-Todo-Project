"use client";
import { Input } from "@/components/ui/input";
import axios, { Axios, AxiosError } from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function DeleteTodo() {
  const BASE_URL = "http://127.0.0.1:8000";

  const [deleteId, setDeleteId] = useState(""); // New state for delete operation
  const [isDataDeleted, setIsDataDeleted] = useState(false);

  async function deleteTodo() {
    try {
      const response = await axios.delete(`${BASE_URL}/todos/${deleteId}`);
      console.log("Todo deleted successfully");
      // Additional logic if needed after successful deletion
      setIsDataDeleted(true);
      setDeleteId("");

      return response;
    } catch (error) {
      console.error("Error:", (error as AxiosError).message);
    }
  }

  const handleIncrementplus = () => {
    setDeleteId((prevId) => {
      const newId = parseInt(prevId) + 1;
      return newId.toString();
    });
  };

  const handleIncrementminus = () => {
    setDeleteId((prevId) => {
      const newId = parseInt(
        prevId === "1" ? "1" : (parseInt(prevId) - 1).toString()
      );
      return newId.toString();
    });
  };

  return (
    <main className="sticky">
      <div className="w-full mb-16  flex flex-col justify-center items-center ">
        <div className="mt-4">
          <label className="text-lg font-semibold -4">Delete Todo by ID:</label>
          <div className="flex py-4">
            <Input
              placeholder="Enter Todo ID"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              className="mr-2 w-48 h-12 border-2 border-slate-300 rounded-2xl"
            />
            <button
              className=" text-red-500 font-semibold text-2xl  bg-slate-100 rounded-full px-[18px] "
              onClick={handleIncrementplus}
            >
              +
            </button>
            <button
              className=" text-black mx-3 font-semibold text-2xl  bg-slate-100 rounded-full px-[18px]"
              onClick={handleIncrementminus}
            >
              -
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={deleteTodo}
            >
              Delete Todo
            </button>
          </div>
          {isDataDeleted && (
            <p className="text-green-800">Data deleted successfully!</p>
          )}
        </div>
      </div>
    </main>
  );
}
