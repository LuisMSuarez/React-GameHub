import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Homepage";
import GameDetailPage from "./GameDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "games/:id", element: <GameDetailPage /> },
    ],
  },
]);

export default router;
