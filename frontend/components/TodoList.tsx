"use client";
import { Todo } from "@/app/page";
import React from "react";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul className="space-y-3 mt-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="p-3 bg-gray-100 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{todo.description}</p>
            <p className="text-sm text-gray-600">
              {todo.category} - {todo.priority}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
