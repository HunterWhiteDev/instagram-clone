import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./Post.css";
import firebase from "firebase";
function Post({ postId, username, caption, imageUrl, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  return (
    <div className="post">
      {/*Header - Avatar + Name  */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      {/* Image */}
      <img className="post__image" src={imageUrl} alt="" />

      {/* username + caption */}
      <h4 className="post__text">
        {" "}
        <strong>{username}: </strong>
        {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            {" "}
            <strong>{comment.username}: </strong>
            {comment.text}
          </p>
        ))}
      </div>

      <form className="post__commentBox">
        <input
          className="post__input"
          type="text"
          placeholder="Add a commnet..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>
        <button
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          POST
        </button>
      </form>
    </div>
  );
}

export default Post;
