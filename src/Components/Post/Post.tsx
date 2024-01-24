import React, { useEffect, useState } from "react";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import supabase from "../../supabase";
function Post({
  username = "username",
  pfp_url = "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
  location = "Florida",
  timestamp = new Date(),
  image_id = "https://placehold.co/600x400",
  like_count = "5",
  description = "desc",
  comments = [],
}) {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const { data } = supabase.storage.from("posts").getPublicUrl(image_id);
      setImageUrl(data.publicUrl);
    };

    getData();
  }, []);

  return (
    <div className="post">
      <div className="post__top">
        <img src={pfp_url} />
        <div className="post__topMeta">
          <p>
            <span>{username}</span>
            <br />
            <span>{location}</span>
          </p>
          <p className="post__topMetaTimestamp">{timestamp.toISOString()}</p>
        </div>
      </div>
      <div className="post__middle">
        <img src={imageUrl} />
      </div>
      <div className="post__bottom">
        <div className="post_bottomButtons">
          <FavoriteBorderIcon />
          <ModeCommentOutlinedIcon />
        </div>
        <p>{like_count} likes</p>
        <p>{description}</p>
        <form>
          <input placeholder="Add a comment..."></input>
        </form>
      </div>
    </div>
  );
}

export default Post;
