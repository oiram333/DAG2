import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProjectDetail from "../pages/ProjectDetail";
import LogoUpload from "../pages/admin/LogoUpload/page";

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
    path: "/admin/logo-upload",
    element: <LogoUpload />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
