import React, { useEffect } from 'react'
import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
import Navbar from './Navbar'

import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const Home = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);

    const addTodoHandler = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/todos',
                { title, description }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
            );
            console.log(response);
            if (response.data.success) {
                toast.success('Todo added successfully!');
                setTodos([...todos, response.data.todo]);
                setTitle('');
                setDescription('');
            }
            console.log(response);
        } catch (error) {
            toast.error('Error:', error.message);
        }
    }

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/todos', {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setTodos(response.data.todos);
                }
            } catch (error) {
                toast.error('Error fetching todos:', error.message);
            }

        }
        fetchTodos();
    }, [])

    return (
        <div >
            <Navbar />
            <div className='flex items-center gap-5 mt-5'>
                <input value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder='Add a new todo'
                    className='w-1/4' />
                <button onClick={addTodoHandler}>ADD TODO</button>
            </div>
            <Textarea value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description here..." className="w-1/4" mt-2 />

            <div className='grid grid-cols-5 gap-2 mt-5'>
                {todos.map((todo) => (
                    <Card key={todo._id} className="bg-gray-800 text-white">
                        <CardTitle>{todo.title}</CardTitle>
                        <CardDescription>{todo.description}</CardDescription>
                    
                    </Card>
                ))
                }
            </div>

        </div>
    )
}

export default Home
