import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import "./Profile.css";
import supabase from "../../supabase";
import { useNavigate, useParams } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PortraitIcon from "@mui/icons-material/Portrait";
import { AuthUser, UserResponse } from "@supabase/supabase-js";
import useFunction from "../../hooks/useFunction";
import getPublicUrl from "../../utils/getPublicUrl";
interface User {
  username: string;
  user_id: string;
}

interface body {
  username: string;
}

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState<User>();
  const [selected, setSelected] = useState<string>("posts");
  // const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState<AuthUser>();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [pfp, setpfp] = useState<string>("");

  const navigate = useNavigate();

  const body = useMemo(() => {
    return { username };
  }, [username]);

  const [loading, data] = useFunction("profile", body);

  console.log(data);

  const followUser = async () => {
    try {
      await supabase.from("following").insert({
        follower_id: auth?.data.user?.id,
        following_id: user?.user_id,
      });
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowUser = async () => {
    try {
      await supabase
        .from("following")
        .delete()
        .eq("follower_id", auth?.data.user?.id)
        .eq("following_id", user?.user_id);
      setIsFollowing(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="profile">
        <div className="profile__top">
          <div className="profile__topLeft">
            <img src={getPublicUrl(data.user.user_id, "pfps")} />
          </div>
          <div className="profile__topRight">
            <div className="profile__topRightActions">
              <h2>{user && user.username}</h2>

              {data?.isUser ? (
                <>
                  <button
                    className="profileButton"
                    onClick={() => navigate("/profile/edit")}
                  >
                    Edit Profile
                  </button>
                  <button className="profileButton"> Archive </button>{" "}
                </>
              ) : (
                <button
                  className="profileButton"
                  onClick={isFollowing ? unfollowUser : followUser}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
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
          <div className="profile__postsGridContainer">
            <div className="profile__postsGrid">
              {!loading &&
                data?.posts?.map((post) => (
                  <div>
                    <img
                      onClick={() => navigate(`/post/${post.id}`)}
                      src={getPublicUrl(post.images[0], "posts")}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
