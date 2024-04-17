import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Payment from "./Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Payment />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
