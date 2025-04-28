import React, { useMemo, useRef, useState } from "react";
import "./PostCard.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import getPublicUrl from "../../utils/getPublicUrl";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import useUsername from "../../hooks/useUsername";
import invokeFunction from "../../utils/invokeFunction";
import useFunction from "../../hooks/useFunction";
import Comment from "./Comment";
import { CommentProps } from "./Comment";
import Avatar from "../Avatar/Avatar";
import { Posts } from "../../../types/collection.ts";
function PostCard({
  id,
  location = "",
  like_count = "5",
  description = "desc",
  user_id = "",
  created_at,
  images = [""],
  // username = "name",
}: Posts) {
  const [commentText, setCommentText] = useState<string>("");

  const [comments, setComments] = useState<CommentProps[]>([]);

  const userRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const username = useUsername(user_id);
  const navigate = useNavigate();

  const body = useMemo(() => {
    return { id };
  }, [id]);

  const [success, data] = useFunction("getComments", body, null, (res) =>
    setComments(res.comments),
  );

  const handleNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
    if (userRef.current) {
      const checkUser = (userRef.current as HTMLElement).contains(
        e.target as Node,
      );

      if (checkUser) navigate(`/profile/${username}`);
    }
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const [success, data] = await invokeFunction("addComment", {
      postId: id,
      commentText,
    });
    if (!success) {
      alert("Error Adding Comment");
    } else {
      setCommentText("");
      setComments([...comments, data.comment]);
    }
  };

  const onDelete = (id: string) => {
    const newComments = comments.filter((comment) => comment.id !== id);
    setComments([...newComments]);
  };

  return (
    <div
      className="border-[1px] border-solid border-[rgba(128,128,128,0.341)] rounded-lg cursor-pointer mb-4"
      onClick={handleNavigation}
    >
      <div ref={userRef} className="flex items-center p-3 pl-2">
        <Avatar username={username[0]?.toUpperCase()} />
        <div className="flex items-center">
          <p className="ml-2">
            <span>{username}</span>
            <br />
            <span>{location}</span>
          </p>
          <p className="!ml-[5px] text-sm text-[rgb(155,_155,_155)]">
            {moment(created_at).startOf("hour").fromNow()}
          </p>
        </div>
      </div>
      <div
        className="bg-[black] flex items-center"
        onClick={() => navigate(`/post/${id}`)}
      >
        <img
          className="object-cover"
          src={getPublicUrl(images[0], `posts/${user_id}`)}
        />
      </div>
      <div className="pl-[5px] pt-[5px] pb-[5px]">
        <div className="post_bottomButtons">
          <FavoriteBorderIcon />
          <ModeCommentOutlinedIcon />
        </div>
        <p className="text-gray-300 mt-1">{like_count} likes</p>
        <p>{description}</p>

        {comments?.map((comment) => (
          <Comment {...comment} onDelete={onDelete} />
        ))}
        <form ref={formRef} onSubmit={addComment}>
          <input
            className="w-full outline-0 mt-2 "
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
          ></input>
        </form>
      </div>
    </div>
  );
}

export default PostCard;
