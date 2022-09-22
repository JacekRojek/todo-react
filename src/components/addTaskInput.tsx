import { FormEvent, useState } from "react";
import { v4 } from "uuid";

export type Task = {
  text: string;
  id: string;
  done: boolean;
};

type AddTaskProps = {
  addTask: (task: Task) => void;
  setIsAdding: (isAdding: boolean) => void;
};
export const AddTaskInput = ({ addTask, setIsAdding }: AddTaskProps) => {
  const [taskText, setTaskText] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAdding(false);

    addTask({
      id: v4(),
      text: taskText,
      done: false,
    });
  };
  return (
    <form onSubmit={onSubmit}>
        <label>
        Task:
        <input
            type="text"
            name="text"
            value={taskText}
            data-testid={`addTaskInput`}
            onChange={(event) => {
            setTaskText(event.target.value);
            }}
        />
        </label>
        <input type="submit" value="Add" data-testid={`addTaskSubmit`} />
    </form>
  );
};
