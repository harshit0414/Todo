import axios from 'axios';
import React, {useState} from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const login = () => {
    
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    } 
    const loginHandler =async() => {
        try{
            const response = await axios.post('https://todo-tan-ten-20.vercel.app/api/v1/users/login', 
                user,{headers: {
                'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log(response);
            if(response.status === 200){
                toast.success('Login successful!');
                navigate('/');
            }
            console.log(response);
        } catch (error) {
            toast.error(error.response.data.message);  

        }
        
    }


  return (
    <div className=''>
       <input value={user.email} name="email" onChange={changeHandler} type="text" placeholder="Enter email" />
       <input value={user.password} name="password" onChange={changeHandler} type="password" placeholder="Enter password" /> 
         <button onClick={loginHandler}>Login</button>
    </div>
  )
}

export default login
