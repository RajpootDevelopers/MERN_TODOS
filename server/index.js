
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectToMongoDB from "./connectToMongoDB.js";
import cors from "cors";
// import path from "path"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; 
const { Schema } = mongoose;
const toDoSchema = new Schema({
    task: {
        type: String,
        required: true    
    }
});
const Todo = mongoose.model('Todo', toDoSchema);

// const __dirname = path.resolve();

app.use(express.json());
// Allow all origins
app.use(cors());
// Allow specific origin(s)
app.use(cors({
  origin: 'https://todos-server-murex.vercel.app'
}));

// app.use(express.urlencoded({ extended : true}));

// Create Route
app.post("/create_todo", async (req, res) => {
    
    try {
        const { task } = req.body;
        const newTodo = new Todo({ task });
        await newTodo.save()
        let todos_db = await Todo.find();
        res.json(todos_db)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create todo' });
    }

})

// Read Route
app.get("/get_todos", async (_, res) => {

    try {
        const todos_db = await Todo.find();
        res.json(todos_db)
    } catch (error) {
        res.status(500).json({ error : "Failed to get todos"})
        console.log(error);
    }

})

// Delete Route
app.delete("/delete_todo", async (req, res) => {
    try {
        const id = req.query.id
        await Todo.findByIdAndDelete(id)
        const todos_db = await Todo.find();
        res.json(todos_db)
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
})

// Update Route
app.post("/update_todo", async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.body.id, { task: req.body.todoMsg });
    if (updatedTodo) {
        const todos = await Todo.find(); 
        res.json(todos); 
    } else {
        res.status(404).json({ error: "Todos not found" }); 
    }
});
// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend" , "dist", "index.html"));
// })


connectToMongoDB();
app.listen(PORT, () => {
    console.log(`server is listening by ${PORT}`)
})