import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { listed } from "./listed";
import Login from "../pages/Login";

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
    {
        path: listed.home,
        element: <Home />,
    },
    {
        path: listed.login,
        element: <Login />,
    },
])

export default Route;