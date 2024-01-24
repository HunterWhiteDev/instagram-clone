import "./Login.css";
import MainImage from "../../assets/MainImage.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../../supabase";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data) navigate("/home");
    if (error) alert(error.message);
  };

  return (
    <div className="login">
      <div className="login__left">
        <img src={MainImage} />
      </div>
      <div className="login__right">
        <div className="login__rightLogin">
          <img src="https://i.pinimg.com/originals/57/6c/dd/576cdd470fdc0b88f4ca0207d2b471d5.png" />

          <form onSubmit={handleLogin}>
            <input
              className="input"
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="blueButton" type="submit">
              Log in
            </button>
          </form>
          <div className="login__loginRightOrText">
            <hr /> <span>OR</span> <hr />
          </div>

          <p className="login__loginRightForgotPasswordText">
            Forgot Password?
          </p>
        </div>
        <div className="login__rightSignUp">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
