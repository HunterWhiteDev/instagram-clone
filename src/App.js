import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
function App() {
  const [posts, setPosts] = useState([
    {
      username: "Jerry Garcia",
      caption: "What a long strange trip it's been!",
      imageUrl:
        "https://ca-times.brightspotcdn.com/dims4/default/6a36f97/2147483647/strip/true/crop/2048x1632+0+0/resize/840x669!/quality/90/?url=https://california-times-brightspot.s3.amazonaws.com/ac/28/44c51c04417e357c9e733424a01b/la-et-ms-grateful-dead-members-plan-final-show-001",
    },
    {
      username: "Jerry Garcia",
      caption: "Chilling with the booooooyys",
      imageUrl:
        "https://ca-times.brightspotcdn.com/dims4/default/6a36f97/2147483647/strip/true/crop/2048x1632+0+0/resize/840x669!/quality/90/?url=https://california-times-brightspot.s3.amazonaws.com/ac/28/44c51c04417e357c9e733424a01b/la-et-ms-grateful-dead-members-plan-final-show-001",
    },
  ]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => {
          doc.data();
        })
      );
    });
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      {posts.map((posts) => (
        <Post
          username={posts.username}
          imageUrl={posts.imageUrl}
          caption={posts.caption}
        />
      ))}

      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;
