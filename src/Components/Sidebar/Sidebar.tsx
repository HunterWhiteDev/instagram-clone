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

      <div className="sidebar">
        {/* Image here */}
        <img src="https://i.pinimg.com/originals/57/6c/dd/576cdd470fdc0b88f4ca0207d2b471d5.png" />

        <ul>
          <li onClick={() => navigate("/home")}>
            <HomeIcon /> <span> Home</span>
          </li>
          <li>
            <SearchIcon /> <span>Search</span>
          </li>
          <li>
            <ExploreIcon /> <span>Explore</span>
          </li>
          <li>
            <SmartScreenIcon /> <span>Reels</span>
          </li>
          <li>
            <MessageIcon /> <span>Messages</span>
          </li>
          <li>
            <NotificationsIcon /> <span>Notifcations</span>
          </li>
          <li onClick={() => setOpen(true)}>
            <AddIcon /> <span>Create</span>
          </li>
          <li
            className="sidebar__profile"
            onClick={() => navigate(`/profile/${user?.user_metadata.username}`)}
          >
            <img
              className="sidebar__pfp"
              src={getPublicUrl(user?.id as string, "pfps")}
            />
            <p>Profile</p>
          </li>
          <li onClick={signout}>Log Out</li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
