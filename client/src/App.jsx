

import './App.css'
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  }
]);


function App() {
  return <RouterProvider router={appRouter} />;
  
}

export default App;
