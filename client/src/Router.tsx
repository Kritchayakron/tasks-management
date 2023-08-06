
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css" 
import "./App.css"
import Login from "./components/login/Login"
import Dashboard from "./components/task/dashboard"
import Register from './components/register/Register';
import Dragdrop from './components/dragdrop/dragdrop';
import {
  createBrowserRouter,
} from "react-router-dom";
import Task from './components/task/task';

export const routerPath = createBrowserRouter([
  {
    path: "/" ,
    element: <Dashboard />,
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/task/create",
    element: <Task />
  },
  {
    path: "/task/edit/:id",
    element: <Task />
  },
  {
    path: "*",
    element: <h1>404 NOT FOUND</h1>
  },

  
]);