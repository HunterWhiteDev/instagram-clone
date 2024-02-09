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
function PostCard({
  id,
  location = "",
  like_count = "5",
  description = "desc",
  user_id = "",
  created_at = new Date().getTime(),
  images = [""],
  // username = "name",
}) {
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
    setComments(res.comments)
  );

  const handleNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
    if (userRef.current) {
      const checkUser = (userRef.current as HTMLElement).contains(
        e.target as Node
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
      <div className="post__middle" onClick={() => navigate(`/post/${id}`)}>
        <img src={getPublicUrl(images[0], "posts")} />
      </div>
      <div className="post__bottom">
        <div className="post_bottomButtons">
          <FavoriteBorderIcon />
          <ModeCommentOutlinedIcon />
        </div>
        <p className="post__bottomLikeCount">{like_count} likes</p>
        <p>{description}</p>

        {comments.map((comment) => (
          <Comment {...comment} onDelete={onDelete} />
        ))}
        <form ref={formRef} onSubmit={addComment}>
          <input
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
