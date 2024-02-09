import { useMemo, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import "./Profile.css";
import { useNavigate, useParams } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PortraitIcon from "@mui/icons-material/Portrait";
import { AuthUser } from "@supabase/supabase-js";
import useFunction from "../../hooks/useFunction";
import getPublicUrl from "../../utils/getPublicUrl";
import invokeFunction from "../../utils/invokeFunction";
interface User {
  username: string;
  user_id: string;
}

interface body {
  username: string;
}

function Profile() {
  const { username } = useParams();

  const [selected, setSelected] = useState<string>("posts");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const body = useMemo(() => {
    return { username };
  }, [username]);

  const [loading, data] = useFunction("profile", body, null, (res) =>
    setIsFollowing(res.isFollowing as boolean)
  );

  const navigate = useNavigate();

  const followUser = async () => {
    const [success, data] = await invokeFunction("follow", { username });
    if (success) setIsFollowing(true);
  };

  const unfollowUser = async () => {
    const [success, data] = await invokeFunction("unfollow", { username });
    if (success) setIsFollowing(false);
  };

  return (
    <>
      <Sidebar />
      <div className="profile">
        <div className="profile__top">
          <div className="profile__topLeft">
            <img src={getPublicUrl(data?.user?.user_id, "pfps")} />
          </div>
          <div className="profile__topRight">
            <div className="profile__topRightActions">
              <h2>{data?.user && data?.user?.username}</h2>

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
