import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css" 
import { createRoot } from "react-dom/client";
import { routerPath } from "./Router"
import "./App.css"
import Login from "./components/login/Login"
import Dashboard from "./components/task/dashboard"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = routerPath;

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
)
