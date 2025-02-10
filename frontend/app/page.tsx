import React, { Suspense } from "react";

import TodoApp from "@/components/TodoApp";

export interface Todo {
  id: number;
  description: string;
  category: string;
  priority: string;
}

export default async function Page() {
  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <TodoApp />
    </Suspense>
  );
}
