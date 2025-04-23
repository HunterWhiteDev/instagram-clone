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

    console.log(data);
    if (error) {
      console.log({ error });
      alert(error.message);
    } else if (data) navigate("/home");
  };

  return (
    <div className="flex justify-center gap-[50px] mt-[5vh]">
      <div className="login__left">
        <img src={MainImage} />
      </div>
      <div className="w-[20vw]">
        <div className="flex flex-col">
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
          <div className="flex items-center mt-4">
            <hr /> <span>OR</span> <hr />
          </div>

          <p className="mx-[auto] my-[0] text-[lightblue] mt-4 text-[14px] cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <div className="border-[1px] border-solid border-[gray] flex justify-center mt-2">
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
