"use client";

import React, { FormEvent, useState } from "react";

interface TodoFormProps {
  onAdd: (text: string) => void;
  loading: boolean;
}

export const TodoForm = ({ onAdd, loading }: TodoFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="New Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded-lg"
        disabled={loading}
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};
