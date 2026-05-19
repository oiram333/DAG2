import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProjectDetail from "../pages/ProjectDetail";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/proyecto/:slug",
    element: <ProjectDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
