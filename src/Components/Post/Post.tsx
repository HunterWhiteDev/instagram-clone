import React, { useEffect, useState } from "react";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import supabase from "../../supabase";
function Post({
  location = "",
  like_count = "5",
  description = "desc",
  comments = [],
  user_id = "",
  created_at = new Date().getTime(),
  images = [""],
  // username = "name",
}) {
  const [username, setUsername] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [pfp, setPfp] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const imagesUrlsArr = [];

      for (const id of images) {
        const { data } = supabase.storage.from("posts").getPublicUrl(id);
        imagesUrlsArr.push(data.publicUrl);
      }

      const { data: usernameRes } = await supabase
        .from("users")
        .select("username")
        .eq("user_id", user_id);

      setImageUrls(imagesUrlsArr);
      setUsername(usernameRes[0].username);
    };

    getData();
  }, []);

  useEffect(() => {
    const getPfp = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage.from("pfps").getPublicUrl(user_id);
      setPfp(publicUrl + "?random=" + new Date().getTime());
    };

    getPfp();
  }, [user_id]);

  return (
    <div className="post">
      <div className="post__top">
        <img src={pfp} />
        <div className="post__topMeta">
          <p>
            <span>{username}</span>
            <br />
            <span>{location}</span>
          </p>
          <p className="post__topMetaTimestamp">
            {new Date(created_at).toISOString()}
          </p>
        </div>
      </div>
      <div className="post__middle">
        <img src={imageUrls[0]} />
      </div>
      <div className="post__bottom">
        <div className="post_bottomButtons">
          <FavoriteBorderIcon />
          <ModeCommentOutlinedIcon />
        </div>
        <p>{like_count} likes</p>
        <p>{description}</p>
        <form>
          <input placeholder="Add a comment..."></input>
        </form>
      </div>
    </div>
  );
}

export default Post;
