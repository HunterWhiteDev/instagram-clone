import React from "react";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
function Post({
  username = "username",
  pfp_url = "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
  location = "Florida",
  timestamp = new Date(),
  image_url = "https://placehold.co/600x400",
  like_count = "5",
  description = "desc",
  comments = [],
}) {
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
        <img src={image_url} />
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
