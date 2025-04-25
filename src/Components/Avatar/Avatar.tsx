import { useEffect, useState } from "react";
import supabase from "../../supabase.ts";
import { Avatar as AvatarComponent, AvatarOwnProps } from "@mui/material";

interface AvatarProps {
  username: string;
  avatarProps?: AvatarOwnProps;
}

export default function Avatar({ username = "", avatarProps }: AvatarProps) {
  const [pfpUrl, setPfpUrl] = useState("");
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("pfp_url, username")
        .eq("username", username)
        .limit(1)
        .single();
      if (error) console.log("ERROR FETCHING URL: ", error);
      else {
        setPfpUrl(data.pfp_url || "");
      }
    };

    getData();
  }, []);

  return (
    <div className="z-0">
      <AvatarComponent
        {...avatarProps}
        sx={{ zIndex: "-1 !important", backgroundColor: "darkorchid" }}
      >
        {pfpUrl ? pfpUrl : username[0]?.toUpperCase()}
      </AvatarComponent>
    </div>
  );
}
