import React from "react";
import "./Comment.css";
import useUsername from "../../hooks/useUsername";
import getPublicUrl from "../../utils/getPublicUrl";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import DeleteIcon from "@mui/icons-material/Delete";
import invokeFunction from "../../utils/invokeFunction";

export interface CommentProps {
  id: string;
  created_at: Date;
  commenter_id: string;
  comment_text: string;
  onDelete: (id: string) => void;
}

function Comment({
  id,
  created_at,
  post_id,
  commenter_id,
  comment_text,
  onDelete,
}: CommentProps) {
  const username = useUsername(commenter_id);

  const auth = useAuth();

  const deleteComment = async () => {
    const [success, data] = await invokeFunction("deleteComment", {
      commentId: id,
    });

    if (success) {
      onDelete(id);
    }
  };

  return (
    <div className="comment">
      <div className="comment__left">
        <img
          className="comment__leftPfp"
          src={getPublicUrl(commenter_id, "pfps")}
        />
      </div>
      <div className="comment__right">
        <span className="comment__rightUsername">
          {username}{" "}
          <span className="comment__rightDate">
            {moment(created_at).fromNow()}
          </span>
        </span>
        <p className="comment__rightText">{comment_text}</p>
      </div>
      <div onClick={deleteComment} className="comment__trash">
        <DeleteIcon />
      </div>
    </div>
  );
}

export default Comment;
