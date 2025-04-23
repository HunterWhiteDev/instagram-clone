import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SmartScreenIcon from "@mui/icons-material/SmartScreen";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import { CreateModal } from "../CreateModal";
import { useEffect, useState } from "react";
import supabase from "../../supabase";
import { useNavigate } from "react-router-dom";
import getPublicUrl from "../../utils/getPublicUrl";
import { User } from "@supabase/supabase-js";
import Avatar from "../Avatar/Avatar";
function Sidebar() {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const getUser = async () => {
    const resposne = await supabase.auth.getUser();
    setUser(resposne.data.user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const signout = () => {
    supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      {open && <CreateModal open={open} setOpen={setOpen} />}

      <div className="flex-[0.15] [border-right:1px_solid_gray] h-screen overflow-hidden pl-2 pr-2 fixed w-[15vw]">
        {/* Image here */}
        <img src="https://i.pinimg.com/originals/57/6c/dd/576cdd470fdc0b88f4ca0207d2b471d5.png" />

        <ul>
          <li onClick={() => navigate("/home")}>
            <span className="[transition:all_250ms_ease-in-out]">
              <HomeIcon />
            </span>
            <span className="sidebar__optionText"> Home</span>
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
          <li onClick={() => setOpen(true)}>
            <span className="[transition:all_250ms_ease-in-out]">
              <AddIcon />
            </span>
            <span className="sidebar__optionText">Create</span>
          </li>
          <li
            className="p-0 m-0 h-[35px]"
            onClick={() => navigate(`/profile/${user?.user_metadata.username}`)}
          >
            <span className="[transition:all_250ms_ease-in-out]">
              <Avatar
                avatarProps={{ sx: { width: "30px", height: "30px" } }}
                username={user?.user_metadata.username}
              />
            </span>

            <p className="sidebar__optionText">Profile</p>
          </li>
          <li onClick={signout}>Log Out</li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
