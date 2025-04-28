import { createBrowserRouter } from "react-router-dom";
import TodosEpisodios from "../pages/TodosEpisodios";
import Episodio from "../pages/EpisodioDetails";
import Intro from "../pages/Intro";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },

  // {
  //   path: "/all",
  //   element: <TodosEpisodios />
  // },

  {
    path: "/episodio/:id",
    element: <Episodio />,
  },
])

export default routes;
