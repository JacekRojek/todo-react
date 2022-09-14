import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskEdit } from "./taskEdit";

export type Task = {
  text: string;
  id: string;
  done: boolean;
};

type TodoListProps = {
  todos: Task[];
  setTodos: (asks: Task[]) => void;
};
export const TodoList = ({ todos, setTodos }: TodoListProps) => {
  const [editedTaskId, setEditedTaskId] = useState<string | undefined>(
    undefined
  );
  const onEdit = (id: string) => {
    setEditedTaskId(id);
  };
  const onDelete = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };
  return (
    <ul className="todoList" data-testid={`tasks-list`}>
      {todos.map(({ id, done, text }, i) => (
        <li key={i} className={done ? "done" : ""}>
          {editedTaskId === id ? (
            <TaskEdit
              text={todos.find((t: Task) => t.id === editedTaskId)?.text || ""}
              finishEditing={(text) => {
                setTodos(
                  todos.map((t) => ({
                    ...t,
                    text: t.id === editedTaskId ? text : t.text,
                  }))
                );
                setEditedTaskId(undefined);
              }}
            />
          ) : (
            <>
              <div>
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() =>
                    setTodos(
                      todos.map((t) => ({
                        ...t,
                        done: t.id === id ? !t.done : t.done,
                      }))
                    )
                  }
                  data-testid={`toggle${i}`}
                />

                <span data-testid={`todo${i}`}>{text}</span>
              </div>
              <div className="icons">
                <div
                  className="icon"
                  onClick={() => onEdit(id)}
                  data-testid={`edit${i}`}
                >
                  <FaEdit />
                </div>
                <div
                  className="icon"
                  onClick={() => onDelete(id)}
                  data-testid={`delete${i}`}
                >
                  <FaTrash />
                </div>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
