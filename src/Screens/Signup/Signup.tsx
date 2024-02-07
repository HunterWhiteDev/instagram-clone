import React, { useState } from "react";
import "./Signup.css";
import supabase from "../../supabase";
import { useNavigate } from "react-router-dom";
import { AuthResponse, User } from "@supabase/supabase-js";
import invokeFunction from "../../utils/invokeFunction";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match");

    const { error, data }: AuthResponse = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) return alert(error.message);

    const body = {
      user_id: data.user?.id || Math.floor(Math.random() * 1000),
      username,
      email,
    };

    const headers = {
      Authorization: `Bearer ${data.session?.access_token}`,
    };

    const response = await invokeFunction("signup", body, headers);
    console.log(response);

    if (response && response.success) {
      navigate("/home");
    } else {
      alert("An Error has occured");
    }
  };

  return (
    <div className="signup">
      <div className="signup__top">
        <img src="https://i.pinimg.com/originals/57/6c/dd/576cdd470fdc0b88f4ca0207d2b471d5.png" />

        <p>Sign up to see photos and videos from your friends.</p>

        <form onSubmit={signUp}>
          <input
            className="input"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="username"
            placeholder="usrnamae"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input"
            placeholder="confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="blueButton" type="submit">
            Sign up
          </button>
        </form>
      </div>
      <div className="signup__bottom">
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
