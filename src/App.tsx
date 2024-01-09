import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./Screens/Login";
import supabase from "./supabase";
import { useEffect } from "react";
import { Signup } from "./Screens/Signup";
import { Home } from "./Screens/Home";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log({ event, session });
      if (session && session.user) navigate("/home");
      else navigate("/login");
    });
  }, []);

  return (
    <Routes>
      <Route Component={Login} path="/login" />
      <Route Component={Signup} path="/signup" />
      <Route Component={Home} path="/Home" />
    </Routes>
  );
}

export default App;
