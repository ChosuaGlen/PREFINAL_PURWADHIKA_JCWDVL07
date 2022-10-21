import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Modal, Button, Group } from "@mantine/core";
import { useRef } from "react";
// import { useHistory } from "react-router";

export default function Profile() {
  const PF = `http://localhost:8800/images/`;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [opened, setOpened] = useState(false);
  console.log(username);

  const dob = useRef();
  const city = useRef();
  const age = useRef();
  const relationship = useRef();
  const completeName = useRef();
  // const navigate = useHistory();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const updateHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);
    data.img = fileName;
    try {
      await axios.post("/upload", data);
    } catch (err) {
      console.log(err);
    }

    const profileChange = {
      fullName: completeName.current.value,
      dob: dob.current.value,
      city: city.current.value,
      age: parseInt(age.current.value),
      relationship: parseInt(relationship.current.value),
      userId: user._id,
      profilePicture: data.img,
    };

    try {
      await axios.put(
        `http://localhost:8800/api/users/${user._id}`,
        profileChange
      );
      window.location.reload();
      console.log(profileChange);
    } catch (err) {
      console.log(err);
    }
    console.log(username);
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        {/* <Sidebar /> */}
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : `http://localhost:8800/images/post/pic3.jpg` //placeholder or default background
                }
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "pfp/nopfp.png"
                }
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {!user.fullName ? user.username : user.fullName}
              </h4>
              <span className="profileInfoDesc">{user.desc}</span>

              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Editing Profile"
                className="modalProfile"
              >
                {/* Modal content */}
                <form className="profileTab" onSubmit={updateHandler}>
                  <div className="editProfPicContainer">
                    <img
                      src={
                        !user.profilePicture
                          ? PF + "pfp/nopfp.png"
                          : user.profilePicture
                      }
                      className="editProfPic"
                    />
                    <label>
                      <span className="changeProfPic">Change</span>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg,.jfif"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <div className="editData">
                    Fullname:{" "}
                    <input
                      ref={completeName}
                      // value={dob}
                      // onChange={(e) => setEditField(e.target.value)}
                      className="editInput"
                      type="text"
                    />
                  </div>
                  <div className="editData">
                    Date of Birth:{" "}
                    <input
                      ref={dob}
                      // value={dob}
                      // onChange={(e) => setEditField(e.target.value)}
                      className="editInput"
                      type="text"
                    />
                  </div>
                  <div className="editData">
                    From:{" "}
                    <input
                      ref={city}
                      // value={city}
                      // onChange={(e) => setEditField(e.target.value)}
                      className="editInput"
                      type="text"
                    />
                  </div>
                  <div className="editData">
                    Age:{" "}
                    <input
                      ref={age}
                      // value={age}
                      // onChange={(e) => setEditField(e.target.value)}
                      className="editInput"
                      type="text"
                    />
                  </div>
                  <div className="editData">
                    Relationship:{" "}
                    <input
                      ref={relationship}
                      // value={status}
                      // onChange={(e) => setEditField(e.target.value)}
                      className="editInput"
                      type="text"
                    />
                  </div>
                  <button type="submit">Save</button>{" "}
                </form>
              </Modal>

              <Group position="center">
                <Button onClick={() => setOpened(true)}>Edit Profile</Button>
              </Group>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
