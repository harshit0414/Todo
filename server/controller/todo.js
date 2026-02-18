import { Todo } from "../models/todo.js";

export const createTodo = async(req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide title and description"
            })
        }
        const todo = await Todo.create({title, description});
        todo.save();
        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo
        });
    } catch (error) {
        res.status(500).send("Error creating todo");
    }
} 

export const getAllTodos = async(req, res) => {
    try {
        const todos = await Todo.find({});
        return res.status(200).json({
            success: true,
            message: "Todos retrieved successfully",
            todos
        });
    } catch (error) {
        res.status(500).send("Error retrieving todos");
    }
}

export const updateTodo = async(req, res) => {
    try {
        const todoid  = req.params.todoId;  
        const {title} = req.body;
        console.log(title);
         
        const updatedTodo = await Todo.findByIdAndUpdate(todoid,{title} , { new: true });
        await updatedTodo.save();

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            updatedTodo
        });
    }catch (error) {
        res.status(500).send("Error updating todo");
    }
}

