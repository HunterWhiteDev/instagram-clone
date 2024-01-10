import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SmartScreenIcon from "@mui/icons-material/SmartScreen";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import { CreateModal } from "../CreateModal";
import { useState } from "react";
function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <CreateModal open={open} setOpen={setOpen} />}

      <div className="sidebar">
        {/* Image here */}
        <img src="https://i.pinimg.com/originals/57/6c/dd/576cdd470fdc0b88f4ca0207d2b471d5.png" />

        <ul>
          <li>
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
          <li>Profile</li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
