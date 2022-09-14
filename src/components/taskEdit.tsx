import { FormEvent, useState } from "react";
import { FaUndo } from "react-icons/fa";

type TaskEditProps = {
  finishEditing: (text: string) => void;
  text: string;
};
export const TaskEdit = ({ finishEditing, text }: TaskEditProps) => {
  const [taskText, setTaskText] = useState(text);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    finishEditing(taskText);
  };
  return (
    <div className="editTask" data-testid={`editArea`}>
      <form onSubmit={onSubmit} data-testid={`editForm`}>
        <input
          type="text"
          name="text"
          defaultValue={taskText}
          data-testid={`editInput`}
          onChange={(event) => {
            setTaskText(event.target.value);
          }}
        />
        <input type="submit" value="Edit" />
      </form>
      <div
        className="icon"
        onClick={() => finishEditing(text)}
        data-testid={`editRevert`}
      >
        <FaUndo />
      </div>
    </div>
  );
};
