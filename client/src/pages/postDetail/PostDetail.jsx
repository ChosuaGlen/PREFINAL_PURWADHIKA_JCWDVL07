import { useState, useEffect, useContext } from "react";
import OnePost from "../../components/singularPost/OnePost";
import Post from "../../components/post/Post";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function PostDetail() {
  const { user } = useContext(AuthContext);
  const checkURL = window.location.pathname.split("/");
  const postParam = checkURL[2];
  const [post, setPost] = useState([]);

  useEffect(async () => {
    await axios
      .get(`/posts/${postParam}`)
      .then((res) => {
        console.log(res.data);
        // setPost(res.data);
        setPost(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      })
      .catch((err) => console.log(err));
  }, [postParam]);

  console.log(post._id);

  return (
    <>
      <Topbar />
      <OnePost key={post._id} post={post} />
      <Post key={post._id} post={post} />
    </>
  );
}
