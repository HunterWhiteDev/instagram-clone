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
    } else if (data) navigate("/");
  };

  return (
    <div className="flex justify-center gap-[50px] mt-[5vh]">
      <div className="login__left">
        <img src={MainImage} className="object-cover w-[500px]" />
      </div>
      <div className="w-[20vw]">
        <div className="flex flex-col">
          <img
            src="https://www.pngkey.com/png/full/1-13459_instagram-font-logo-white-png-instagram-white-text.png"
            className="object-contain w-[250px] mx-auto my-6"
          />

          <form onSubmit={handleLogin} className="flex flex-col justify-center">
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
          <div className="flex items-center mt-4 justify-center [&>hr]:bg-gray-500 [&>hr]:w-full [&>hr]:mx-2">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <p className="mx-[auto] my-[0] text-[lightblue] mt-4 text-[16px] cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <div className="border-[1px] border-solid border-[gray] flex justify-center mt-2 rounded-md p-1">
          <p>
            Don't have an account?{" "}
            <span
              className="text-[lightblue] cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
