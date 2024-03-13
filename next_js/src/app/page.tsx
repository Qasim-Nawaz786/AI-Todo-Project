import Link from "next/link";
import Addtodo from "./add_todo";
import DeleteTodo from "./delete_todo";
import Get_todos from "./get_todos";
import Chat_bot from "./chat_bot";

export default function Home() {
  return (
    <div className="relative">
      <Addtodo />
      <DeleteTodo />
      <Get_todos />
      <Chat_bot />
    </div>
  );
}
