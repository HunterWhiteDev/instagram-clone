import { useMemo, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PortraitIcon from "@mui/icons-material/Portrait";
import { AuthUser } from "@supabase/supabase-js";
import useFunction from "../../hooks/useFunction";
import getPublicUrl from "../../utils/getPublicUrl";
import invokeFunction from "../../utils/invokeFunction";
import Avatar from "../../Components/Avatar/Avatar";
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
    setIsFollowing(res.isFollowing as boolean),
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
      <div className="ml-[22.5vw] pt-[5vh] w-[75%]">
        <div className="flex justify-center items-center gap-4">
          <div className="">
            <Avatar
              avatarProps={{ sx: { width: "60px", height: "60px" } }}
              username={username as string}
            ></Avatar>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold text-left bg-red">
              {data?.user && data?.user?.username}
            </div>
            <div className="flex gap-2">
              {data?.isUser ? (
                <>
                  <button
                    className="bg-gray-600 p-1 rounded-md cursor-pointer hover:bg-gray-500"
                    onClick={() => navigate("/profile/edit")}
                  >
                    Edit Profile
                  </button>
                  <button className="bg-gray-600 p-1 rounded-md cursor-pointer hover:bg-gray-500">
                    {" "}
                    Archive{" "}
                  </button>{" "}
                </>
              ) : (
                <button
                  className="bg-gray-600 p-1 rounded-md"
                  onClick={isFollowing ? unfollowUser : followUser}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <div className="flex gap-4">
              <span>12 posts</span>
              <span>53 followers</span>
              <span>53 following</span>
            </div>
            <div className=""></div>
          </div>
        </div>
        <div className=""></div>
        <div className="">
          <hr />
          <div className="flex justify-center">
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
          <div className="">
            <div className="">
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
