// todo_button.tsx

import React, { MouseEventHandler } from "react";

interface TodoButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const TodoButton: React.FC<TodoButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white px-10 my-2 py-2 mb-2 rounded-2xl"
  >
    Enter
  </button>
);

export default TodoButton;
