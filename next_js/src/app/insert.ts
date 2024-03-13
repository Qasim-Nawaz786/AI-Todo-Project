// import "core-js";

// import axios from "axios";
import axios, { Axios, AxiosError } from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export async function createTodo() {
  const title = "Sample Title";
  const description = "Sample Description";
  try {
    const response = await axios.post(`${BASE_URL}/todos/`, {
      title,
      description,
    });
    console.log("Todo added successfully");
  } catch (error) {
    console.error("Error:", (error as AxiosError).message);
  }
}

export async function deleteTodo() {
  const todoId = 6; // Replace with the desired Todo ID
  try {
    const response = await axios.delete(`${BASE_URL}/todos/${todoId}`);
    console.log("Todo deleted successfully");
  } catch (error) {
    console.error("Error1:", (error as AxiosError).message);
  }
}

// createTodo();
// deleteTodo();