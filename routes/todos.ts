import { Router } from "express";

import { Todo } from "../models/Todo";

let todos: Todo[] = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/add-todo", (req, res, next) => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ todo: newTodo });
});

router.post("/delete-todo", (req, res, next) => {
  const id = req.body.id;
  const existingItem = todos.find((item) => item.id === id);
  if (existingItem) {
    const updatedTodos: Todo[] = todos.filter((item) => item.id !== id);
    todos = updatedTodos;
    res.status(200).json({ message: "Todo deleted" });
  } else {
    res.status(404).json({ message: "Item not found!" });
  }
});

router.post("/edit-todo", (req, res, next) => {
  const { id, newText } = req.body;
  const existingItem = todos.find((item) => item.id === id)!;
  if (existingItem) {
    existingItem.text = newText;
    res.status(201).json({ message: "Item edited" });
  } else {
    res.status(404).json({ message: "Item not found!" });
  }
});

export default router;
