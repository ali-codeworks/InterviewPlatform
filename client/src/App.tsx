import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { AppLayout } from "./layout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
