
import axios from 'axios';
import React from 'react'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async() => {
    try {
      const response = await axios.get('https://todo-tan-ten-20.vercel.app/api/v1/users/logout', {
        withCredentials: true,
        
      });
      
      if (response.data.success) {
        toast.success('Logout successful!');
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <div className='bg-gray-600'>
      <div className='flex items-center justify-between p-2'>
        <h1 className='font-bold text-lg'>Harshit singh</h1>
      <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}


export default Navbar
