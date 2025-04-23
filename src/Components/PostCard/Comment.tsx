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
    <div className="flex items-center">
      <div className="comment__left">
        <img
          className="w-[35px] h-[35px] rounded-[100%]"
          src={getPublicUrl(commenter_id, "pfps")}
        />
      </div>
      <div className="ml-[5px]">
        <span className="text-[18px] font-bold">
          {username}{" "}
          <span className="font-normal text-[12px] text-[rgb(177,_177,_177)]">
            {moment(created_at).fromNow()}
          </span>
        </span>
        <p className="m-0">{comment_text}</p>
      </div>
      <div onClick={deleteComment} className="hidden ml-auto mr-[10px] text-[rgba(255,_0,_0,_0.432)]">
        <DeleteIcon />
      </div>
    </div>
  );
}

export default Comment;
