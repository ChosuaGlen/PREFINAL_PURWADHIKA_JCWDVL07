import "./topbar.css";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from "../../apiCalls";
export default function Topbar() {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const PF = "http://localhost:8800/images/";

  const handleClick = () => {
    logoutCall(dispatch);
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">doConnect</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friends, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <Link
          to={`/profile/${currentUser.username}`}
          style={{ textDecoration: "none" }}
        >
          {/* <img
            src={
              !currentUser.profilePicture
                ? PF + "pfp/nopfp.png"
                : PF + currentUser.profilePicture
            }
            className="topbarImg"
          /> */}
          <div className="profileLinker">
            Hey, {currentUser.username} check your profile here
          </div>
        </Link>
        <Link className="signoutLink" to="/login">
          <span className="topbarLink" onClick={handleClick}>
            Sign Out
          </span>
        </Link>
      </div>
    </div>
  );
}
