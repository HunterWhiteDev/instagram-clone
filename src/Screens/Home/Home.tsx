import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import "./Home.css";
import Post from "../../Components/Post/Post";
import { Stories } from "../../Components/Stories";
import supabase from "../../supabase";
import invokeFunction from "../../utils/invokeFunction";
import useFunction from "../../hooks/useFunction";
function Home() {
  // const [posts, setPosts] = useState([]);

  const [loading, data] = useFunction("home");

  console.log(data);

  return (
    <>
      <Sidebar />
      <div className="home">
        <Stories />
        <div className="home__feed">
          {data?.posts?.map((post) => (
            <Post {...post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
