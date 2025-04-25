import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import Post from "../../Components/PostCard/PostCard";
import { Stories } from "../../Components/Stories";
import useFunction from "../../hooks/useFunction";
import supabase from "../../supabase";
function Home() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      setPosts(data);
    };

    run();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="ml-[17.5vw] pt-[2.5vh] w-3/4">
        <Stories />
        <div className="w-[500px] mx-[auto] my-[0] mt-4">
          {posts?.map((post) => <Post {...post} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
