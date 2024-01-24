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
function Sidebar() {
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  const getUser = async () => {
    const resposne = await supabase.auth.getUser();
    setUsername(resposne.data.user?.user_metadata.username);
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
          <li onClick={() => navigate(`/profile/${username}`)}>Profile</li>
          <li onClick={signout}>Log Out</li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
