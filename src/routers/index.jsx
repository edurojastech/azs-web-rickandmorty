import { createBrowserRouter } from "react-router-dom";
import TodosEpisodios from "../pages/TodosEpisodios";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <TodosEpisodios />,
  },
])

export default routes;
