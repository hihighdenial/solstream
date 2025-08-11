import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetails from "../pages/movie-details"; // Pastikan path sesuai

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetails />,
  },
]);

export default Route;
