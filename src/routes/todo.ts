import { Router } from "express";

import { Todo } from "../models/Todo";

let todos: Todo[] = [];

type RequestBody = { id: string; text: string };
type RequestParams = { todoId: string };

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/add-todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ todo: newTodo });
});

router.post("/delete-todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const id = body.id;
  const existingItem = todos.find((item) => item.id === id);
  if (existingItem) {
    const updatedTodos: Todo[] = todos.filter((item) => item.id !== id);
    todos = updatedTodos;
    res.status(200).json({ message: "Todo deleted" });
  } else {
    res.status(404).json({ message: "Item not found!" });
  }
});

router.post("/edit-todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const { todoId } = params;
  const { text } = req.body;
  const existingItem = todos.find((item) => item.id === todoId)!;
  if (existingItem) {
    existingItem.text = text;
    res.status(201).json({ message: "Item edited" });
  } else {
    res.status(404).json({ message: "Item not found!" });
  }
});

export default router;
