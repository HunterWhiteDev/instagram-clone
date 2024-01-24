import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import "./Profile.css";
import supabase from "../../supabase";
import { useNavigate, useParams } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PortraitIcon from "@mui/icons-material/Portrait";
interface User {
  username: string;
  user_id: string;
}

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState<User>();
  const [selected, setSelected] = useState<string>("posts");
  const [posts, setPosts] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { error, data } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);
      if (data) setUser(data[0]);
      else if (error) alert(error.message);
    };

    getUser();
  }, [username]);

  useEffect(() => {
    const getPosts = async () => {
      const { error, data } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user.user_id);

      data?.forEach((post) => {
        post.images.forEach((url: string, idx: number) => {
          const {
            data: { publicUrl },
          } = supabase.storage.from("posts").getPublicUrl(url);
          post.images[idx] = publicUrl;
        });
      });

      if (data) setPosts(data);
      else if (error) alert(error.message);
    };
    if (user) getPosts();
  }, [user]);

  return (
    <>
      <Sidebar />
      <div className="profile">
        <div className="profile__top">
          <div className="profile__topLeft">
            <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
          </div>
          <div className="profile__topRight">
            <div className="profile__topRightActions">
              <h2>{user && user.username}</h2>
              <button className="profileButton">Edit Profile </button>
              <button className="profileButton"> Archive </button>
            </div>
            <div className="profile__topRightStats">
              <span>12 posts</span>
              <span>53 followers</span>
              <span>53 following</span>
            </div>
            <div className="profie__topRightDetails"></div>
          </div>
        </div>
        <div className="profile__stories"></div>
        <div className="profile__posts">
          <hr />
          <div className="profile__postsActions">
            <div
              className={`profile__postsAction ${
                selected === "posts" && "selected"
              }`}
            >
              <span>
                <GridViewIcon />
              </span>
              <p>POSTS</p>
            </div>
            <div
              className={`profile__postsAction ${
                selected === "bookmarks" && "selected"
              }`}
            >
              <span>
                <BookmarkIcon />
              </span>
              <p>BOOKMARKS</p>
            </div>
            <div
              className={`profile__postsAction ${
                selected === "tagged" && "selected"
              }`}
            >
              <span>
                <PortraitIcon />
              </span>
              <p>TAGGED</p>
            </div>
          </div>
          <div className="profile__postsGrid">
            {posts.map((post) => (
              <img
                onClick={() => navigate(`/post/${post.id}`)}
                src={post.images[0]}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
