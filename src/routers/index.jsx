import { createBrowserRouter } from "react-router-dom";
import TodosEpisodios from "../pages/TodosEpisodios";
import Episodio from "../pages/EpisodioDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <TodosEpisodios />,
  },

  {
    path: "/episodio/:id",
    element: <Episodio />,
  },
])

export default routes;
