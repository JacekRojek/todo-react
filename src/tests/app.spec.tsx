import App from "../App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

describe("TodoApp", () => {
  it("renders app", () => {
    const view = render(<App />);
    expect(view).not.toBeUndefined();
  });

  it("renders initial items", () => {
    render(<App />);

    expect(screen.getByText("Buy milk")).toBeDefined();
    const buyMilkTodo = screen.getByTestId("toggle0");
    expect(buyMilkTodo).toBeChecked();

    expect(screen.getByText("Buy bread")).toBeDefined();
    const buyBreadTodo = screen.getByTestId("toggle1");
    expect(buyBreadTodo).not.toBeChecked();
  });
  it("toggles task state", () => {
    render(<App />);

    const buyMilkTodo = screen.getByTestId("toggle0");
    userEvent.click(buyMilkTodo);
    expect(buyMilkTodo).not.toBeChecked();

    const buyBreadTodo = screen.getByTestId("toggle1");
    userEvent.click(buyBreadTodo);
    expect(buyBreadTodo).toBeChecked();
  });
  it("can remove task", async () => {
    render(<App />);
    const editMilkTodo = screen.getByTestId("delete0");
    userEvent.click(editMilkTodo);
    await waitFor(() => screen.findByTestId("tasks-list"));
    expect(screen.getByTestId("tasks-list").childElementCount).toBe(1);
  });
  it("can edit task", async () => {
    render(<App />);
    expect(screen.getByTestId("todo0").innerHTML).toBe("Buy milk");

    const editMilkTodo = screen.getByTestId("edit0");
    expect(editMilkTodo).toBeDefined();
    userEvent.click(editMilkTodo);
    await waitFor(() => screen.findByTestId("editArea"));
    expect(screen.getByTestId("editArea")).toBeDefined();
    const editInput = screen.getByTestId("editInput");
    const editForm = screen.getByTestId("editForm");
    userEvent.type(editInput, "s");
    expect(screen.getByTestId("editInput")).toHaveValue("Buy milks");
    fireEvent.submit(editForm);
    await waitFor(() => screen.findByTestId("todo0"));
    expect(screen.getByTestId("todo0").innerHTML).toBe("Buy milks");
  });
  it("can add task", async () => {
    render(<App />);
    expect(screen.getByTestId("addTask")).toBeDefined();
    userEvent.click(screen.getByTestId("addTask"));
    await waitFor(() => screen.findByTestId("addTaskInput"));
    const addTaskInput = screen.getByTestId("addTaskInput");
    const addTaskSubmit = screen.getByTestId("addTaskSubmit");
    userEvent.type(addTaskInput, "buy eggs");
    userEvent.click(addTaskSubmit);
    await waitFor(() => screen.findByTestId("tasks-list"));
    expect(screen.getByTestId("tasks-list").childElementCount).toBe(3);

    await waitFor(() => screen.findByTestId("todo0"));
    expect(screen.getByTestId("todo0").innerHTML).toBe("buy eggs");
  });
  it("clear add task form input", async () => {
    render(<App />);
    expect(screen.getByTestId("addTask")).toBeDefined();
    userEvent.click(screen.getByTestId("addTask"));
    await waitFor(() => screen.findByTestId("addTaskInput"));
    const addTaskInput = screen.getByTestId("addTaskInput");
    const addTaskSubmit = screen.getByTestId("addTaskSubmit");
    userEvent.type(addTaskInput, "eggs");
    userEvent.click(addTaskSubmit);
    await waitFor(() => screen.findByTestId("addTask"));
    expect(screen.getByTestId("tasks-list").childElementCount).toBe(3);
    userEvent.click(screen.getByTestId("addTask"));
    await waitFor(() => screen.findByTestId("addTaskInput"));
    expect(screen.getByTestId("addTaskInput")).toBeDefined();
    expect(screen.getByTestId("addTaskInput")).toHaveDisplayValue([""]);
  });

});
