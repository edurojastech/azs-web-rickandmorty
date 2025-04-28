import { createBrowserRouter } from "react-router-dom";
import Episodio from "../pages/EpisodioDetails";
import Episodios from "../pages/Episodios";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Episodios />,
  },

  {
    path: "/episodio/:id",
    element: <Episodio />,
  },
])

export default routes;
