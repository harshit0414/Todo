import express from 'express';
import dotenv from 'dotenv';
import bobyParser from 'body-parser';
import connectDB from './db/database.js';
import userRoutes from './routes/user.js';
import todoRoutes from './routes/todo.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.use(bobyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 
    "https://beamish-frangollo-af50ea.netlify.app"],

  credentials: true,
}));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
