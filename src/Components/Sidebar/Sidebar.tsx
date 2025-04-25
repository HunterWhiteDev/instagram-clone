import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SmartScreenIcon from "@mui/icons-material/SmartScreen";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import CreateModal from "../CreateModal/CreateModal.tsx";
import React, { useEffect, useState } from "react";
import supabase from "../../supabase.ts";
import { useNavigate } from "react-router-dom";
import getPublicUrl from "../../utils/getPublicUrl";
import { User } from "@supabase/supabase-js";
import Avatar from "../Avatar/Avatar.tsx";
import useAuth from "../../hooks/useAuth.ts";
import LoginIcon from "@mui/icons-material/Login";
function Sidebar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const user = useAuth();

  console.log({ user });

  const signout = () => {
    supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      {open && <CreateModal open={open} setOpen={setOpen} />}

      <div className="flex-[0.15] [border-right:1px_solid_gray] h-screen overflow-hidden pl-2 pr-2 fixed w-[15vw]">
        {/* Image here */}
        <img
          src="https://www.pngkey.com/png/full/1-13459_instagram-font-logo-white-png-instagram-white-text.png"
          className="object-cover w-[100px] mt-8 ml-1"
        />

        <ul className="[&>li]:cursor-pointer [&>li]:my-6 [&>li>span]:mx-1 [&>li:hover>span>.MuiSvgIcon-root]:scale-110">
          <li onClick={() => navigate("/home")}>
            <span className="[transition:all_250ms_ease-in-out]">
              <HomeIcon />
            </span>
            <span className="sidebar__optionText">Home</span>
          </li>
          <li>
            <span className="[transition:all_250ms_ease-in-out]">
              <SearchIcon />
            </span>
            <span className="sidebar__optionText">Search</span>
          </li>
          <li>
            <span className="[transition:all_250ms_ease-in-out]">
              <ExploreIcon />
            </span>
            <span className="sidebar__optionText">Explore</span>
          </li>
          <li>
            <span className="[transition:all_250ms_ease-in-out]">
              <SmartScreenIcon />
            </span>
            <span className="sidebar__optionText">Reels</span>
          </li>
          <li>
            <span className="[transition:all_250ms_ease-in-out]">
              <MessageIcon />
            </span>
            <span className="sidebar__optionText">Messages</span>
          </li>
          <li>
            <span className="[transition:all_250ms_ease-in-out]">
              <NotificationsIcon />
            </span>
            <span className="sidebar__optionText">Notifcations</span>
          </li>
          {user ? (
            <>
              <li onClick={() => setOpen(true)}>
                <span className="[transition:all_250ms_ease-in-out]">
                  <AddIcon />
                </span>
                <span className="sidebar__optionText">Create</span>
              </li>

              <li
                className="flex items-center"
                onClick={() =>
                  navigate(`/profile/${user?.user_metadata.username}`)
                }
              >
                <span className="[transition:all_250ms_ease-in-out] mt-8">
                  <Avatar
                    avatarProps={{ sx: { width: "30px", height: "30px" } }}
                    username={user?.user_metadata.username}
                  />
                </span>

                <span className="mt-auto">Profile</span>
              </li>
              <li onClick={signout}>Log Out</li>
            </>
          ) : (
            <li onClick={() => navigate("/login")}>
              <span>
                <LoginIcon />
              </span>

              <span>Log In</span>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
