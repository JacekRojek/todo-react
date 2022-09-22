import { useState } from "react";
import { AddTaskInput } from "./addTaskInput";

export type Task = {
  text: string;
  id: string;
  done: boolean;
};

type AddTaskProps = {
  addTask: (task: Task) => void;
};
export const AddTask = ({ addTask }: AddTaskProps) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="addTodo">
      {isAdding ? <AddTaskInput addTask={addTask} setIsAdding={setIsAdding}/> : (
        <button data-testid={`addTask`} onClick={() => setIsAdding(true)}>
          Add task
        </button>
      )}
    </div>
  );
};
