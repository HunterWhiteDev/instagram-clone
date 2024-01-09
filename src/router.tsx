import { Login } from "./Screens/Login";
import { Signup } from "./Screens/Signup";

const router = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/home",
    element: <h1>Home</h1>,
  },
];

export default router;
