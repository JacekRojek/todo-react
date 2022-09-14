import { useState } from "react";
import { Task, TodoList } from "./components/todoList";
import { v4 } from "uuid";

import "./styles.scss";
import { AddTask } from "./components/addTask";

export default function App() {
  const [todos, setTodos] = useState<Task[]>([
    { text: "Buy milk", done: true, id: v4() },
    { text: "Buy bread", done: false, id: v4() },
  ]);

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <AddTask addTask={(task: Task) => setTodos([task, ...todos])} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
