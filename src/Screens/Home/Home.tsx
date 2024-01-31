import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import "./Home.css";
import Post from "../../Components/Post/Post";
import { Stories } from "../../Components/Stories";
import supabase from "../../supabase";
function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const followerId = user.id;

      const { data: followersData, error: followersError } = await supabase
        .from("following")
        .select("following_id")
        .eq("follower_id", followerId);

      if (followersError) {
        alert(followersError);
      } else {
        // Extract the following IDs from the followersData
        const followingIds = followersData.map(
          (follower) => follower.following_id
        );

        // Now, use the following IDs to fetch the posts
        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .in("user_id", followingIds)
          .order("created_at", { ascending: false });

        if (postsError) {
          alert(postsError);
        } else {
          console.log(postsData);
          setPosts(postsData);
        }
      }
    };

    getData();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="home">
        <Stories />
        <div className="home__feed">
          {posts.map((post) => (
            <Post {...post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
