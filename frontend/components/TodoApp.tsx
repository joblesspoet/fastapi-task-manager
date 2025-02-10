"use client";

import { Suspense, useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "@/app/page";
import TodoList from "./TodoList";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/tasks/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (description: string) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });
      const newTodo = await response.json();
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>

      <TodoForm onAdd={addTodo} loading={loading} />

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <Suspense fallback={<p>Loading list...</p>}>
          <TodoList todos={todos} />
        </Suspense>
      )}
    </div>
  );
}
