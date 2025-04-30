import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PortraitIcon from "@mui/icons-material/Portrait";
import getPublicUrl from "../../utils/getPublicUrl";
import Avatar from "../../Components/Avatar/Avatar";
import supabase from "../../supabase";
import useAuth from "../../hooks/useAuth";
import { Posts } from "../../../types/collection";

interface User {
  username: string;
  user_id: string;
}

function Profile() {
  const { username } = useParams();
  const auth = useAuth();

  //Page State
  const [selected, setSelected] = useState<string>("posts");
  const [loading, setLoading] = useState<boolean>(false);
  //Auth user states
  const [isFollowing, setIsFollowing] = useState(false);

  //Metrics
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  //Profile info
  const [profile, setProfile] = useState<User | null>();
  const [posts, setPosts] = useState<Posts[] | null>();

  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("username", username as string)
        .limit(1)
        .single();
      if (profileData && !profileError) setProfile(profileData as User);

      console.log({ profileData, auth });

      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", profileData?.user_id as string);

      if (postsData && !postsError) setPosts(postsData);

      const { data: followingData, error: followingError } = await supabase
        .from("following")
        .select("*")
        .eq("following_id", profileData?.user_id as string)
        .eq("follower_id", auth?.id as string);

      if (followingData && !followingError) setIsFollowing(true);

      const { count: followingCountData, error: followingCountError } =
        await supabase
          .from("following")
          .select("*", { count: "exact", head: true })
          .eq("follower_id", profileData?.user_id as string);

      setFollowingCount(followingCountData);

      const { count: followerCountData, error: followwerCountError } =
        await supabase
          .from("following")
          .select("*", { count: "exact", head: true })
          .eq("following_id", profileData?.user_id as string);

      setFollowersCount(followerCountData);

      const { count: postsCountData, error: postsCountError } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", profileData?.user_id as string);

      setPostsCount(postsCountData);

      console.log({ data: followingCountData, error: followingCountError });
      setLoading(false);
    };
    run();
  }, []);

  console.log({ profile });

  const followUser = async () => {
    await supabase.from("following").insert({
      follower_id: auth?.id,
      following_id: profile?.user_id,
    });

    setIsFollowing(true);
  };

  const unfollowUser = async () => {
    await supabase
      .from("following")
      .delete()
      .eq("follower_id", auth?.id as string)
      .eq("following_id", profile?.user_id as string);
    setIsFollowing(false);
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
              {profile && profile.username}
            </div>
            <div className="flex gap-2">
              {auth?.id === profile?.user_id ? (
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
                  className="bg-gray-600 p-1 rounded-md cursor-pointer"
                  onClick={isFollowing ? unfollowUser : followUser}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <div className="flex gap-4 [&>span]:cursor-pointer ">
              <span>{postsCount} posts</span>
              <span>{followersCount} followers</span>

              <span>{followingCount} following</span>
            </div>
            <div className=""></div>
          </div>
        </div>
        <div className=""></div>
        <div className="">
          <hr />
          <div className="flex justify-center [&>div]:flex [&>div]:items-center [&>div:hover]:bg-[rgba(255,255,255,0.20)] [&>div]:cursor-pointer [&>div]:p-2 [&>div]:rounded-b-lg gap-8">
            <div
              className={`profile__postsAction ${selected === "posts" && "bg-[var(--gray)]"
                }`}
            >
              <span>
                <GridViewIcon />
              </span>
              <p>POSTS</p>
            </div>
            <div
              className={`profile__postsAction ${selected === "bookmarks" && "selected"
                }`}
            >
              <span>
                <BookmarkIcon />
              </span>
              <p>BOOKMARKS</p>
            </div>
            <div
              className={`profile__postsAction ${selected === "tagged" && "selected"
                }`}
            >
              <span>
                <PortraitIcon />
              </span>
              <p>TAGGED</p>
            </div>
          </div>
          <div className="">
            <div className="mt-4">
              {!loading &&
                posts &&
                posts?.map((post) => (
                  <div>
                    <img
                      className="object-cover h-[400px] w-[350px] cursor-pointer"
                      onClick={() => navigate(`/post/${post?.id}`)}
                      src={getPublicUrl(
                        `${profile?.user_id}/${post?.images?.[0]}`,
                        "posts",
                      )}
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
