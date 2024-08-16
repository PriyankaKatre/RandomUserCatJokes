import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import RandomJokes from "./randomJokes/index.jsx";
import Profile from "./randomUser/index.jsx";
import CatListing from "./catListing/index.jsx";
import NotFound from "./wildCard/notFound.jsx";
import "@fontsource/dm-sans";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/400-italic.css";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/random-user" replace />,
    },
    {
      path: "/random-user",
      element: <Profile />,
    },
    {
      path: "/random-jokes",
      element: <RandomJokes />,
    },
    {
      path: "/cats-listing",
      element: <CatListing />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default App;
