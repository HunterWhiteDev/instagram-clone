import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Screens/Login";
import { Signup } from "./Screens/Signup";
import { Home } from "./Screens/Home";
import { Post } from "./Screens/Post";
import { Profile } from "./Screens/Profile";

function App() {
  return (
    <Routes>
      <Route Component={Login} path="/login" />
      <Route Component={Signup} path="/signup" />
      <Route Component={Home} path="/home" />
      <Route Component={Post} path="/post/:id" />
      <Route Component={Profile} path="/profile/:username" />
    </Routes>
  );
}

export default App;
