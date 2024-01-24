import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import { Post as PostCard } from "../../Components/Post";
import "./Post.css";
import { useParams } from "react-router-dom";
import supabase from "../../supabase";
function Post() {
  const { id } = useParams();

  const [post, setPost] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const { error, data } = await supabase
        .from(`posts`)
        .select("*")
        .eq("id", id);
      setPost(data[0]);
    };
    getData();
  }, [id]);

  return (
    <>
      <Sidebar />
      <div className="postScren">
        {post ? <PostCard image_id={post.images[0]} /> : null}
      </div>
    </>
  );
}

export default Post;
