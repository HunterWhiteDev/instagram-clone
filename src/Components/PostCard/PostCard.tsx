import React, { useEffect, useRef, useState } from "react";
import "./PostCard.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import supabase from "../../supabase";
import getPublicUrl from "../../utils/getPublicUrl";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import getUsername from "../../utils/getUsername";
import useUsername from "../../hooks/useUsername";
function PostCard({
  id,
  location = "",
  like_count = "5",
  description = "desc",
  comments = [],
  user_id = "",
  created_at = new Date().getTime(),
  images = [""],
  // username = "name",
}) {
  const userRef = useRef<HTMLDivElement>(null);

  const username = useUsername(user_id);

  const navigate = useNavigate();

  const { id: postId } = useParams();

  const handleNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
    if (userRef.current) {
      const checkChild = (userRef.current as HTMLElement).contains(
        e.target as Node
      );

      if (checkChild) navigate(`/profile/${username}`);
      else if (!postId) navigate(`/post/${id}`);
    }
  };

  return (
    <div className="post" onClick={handleNavigation}>
      <div ref={userRef} className="post__top">
        <img src={getPublicUrl(user_id, "pfps")} />
        <div className="post__topMeta">
          <p>
            <span>{username}</span>
            <br />
            <span>{location}</span>
          </p>
          <p className="post__topMetaTimestamp">
            {moment(created_at).startOf("hour").fromNow()}
          </p>
        </div>
      </div>
      <div className="post__middle">
        <img src={getPublicUrl(images[0], "posts")} />
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

export default PostCard;
