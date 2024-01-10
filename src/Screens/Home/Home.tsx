import React from "react";
import { Sidebar } from "../../Components/ScreenWrapper";
import "./Home.css";
import Post from "../../Components/Post/Post";
import { Stories } from "../../Components/Stories";
function Home() {
  return (
    <div className="screen">
      <Sidebar />
      <div className="home">
        <Stories />
        <div className="home__feed">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
}

export default Home;
