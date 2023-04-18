"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/add-todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ todo: newTodo });
});
router.post("/delete-todo", (req, res, next) => {
    const body = req.body;
    const id = body.id;
    const existingItem = todos.find((item) => item.id === id);
    if (existingItem) {
        const updatedTodos = todos.filter((item) => item.id !== id);
        todos = updatedTodos;
        res.status(200).json({ message: "Todo deleted" });
    }
    else {
        res.status(404).json({ message: "Item not found!" });
    }
});
router.post("/edit-todo/:todoId", (req, res, next) => {
    const params = req.params;
    const { todoId } = params;
    const { text } = req.body;
    const existingItem = todos.find((item) => item.id === todoId);
    if (existingItem) {
        existingItem.text = text;
        res.status(201).json({ message: "Item edited" });
    }
    else {
        res.status(404).json({ message: "Item not found!" });
    }
});
exports.default = router;
