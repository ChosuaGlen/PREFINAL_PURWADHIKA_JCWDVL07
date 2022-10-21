import "./post.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Modal, Button, Group } from "@mantine/core";
import { useRef } from "react";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [opened, setOpened] = useState(false);

  const desc = useRef();

  const PF = "http://localhost:8800/images/";
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deleteHandler = async (postId) => {
    const confirmDelete = window.confirm("Delete post?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8800/api/posts/${postId}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Delete post cancelled");
    }
  };

  const captionHandler = async (e) => {
    e.preventDefault();
    const captionChange = {
      desc: desc.current.value,
      userId: currentUser._id,
    };
    try {
      await axios.put(
        `http://localhost:8800/api/posts/${post._id}`,
        captionChange
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const activeLike = (
    <img
      src={`http://localhost:8800/images/like.png`}
      className="likeIcon"
      onClick={likeHandler}
    />
  );
  const inactiveLike = (
    <img
      src={`http://localhost:8800/images/like.png`}
      className="unlikeIcon"
      onClick={likeHandler}
    />
  );

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "pfp/nopfp.png"
                }
                className="postProfileImg"
              />
            </Link>

            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <button
              disabled={post.userId !== currentUser._id}
              onClick={() => deleteHandler(post._id)}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="editCaptionWrapper">
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Editing Caption"
          >
            {/* Modal content */}
            <form className="modalCaption" onSubmit={captionHandler}>
              <input
                placeholder={"Do not leave it empty! Share us your story here"}
                className="captionInput"
                ref={desc}
              />
              <button className="saveCaption" type="submit">
                Save
              </button>
            </form>
          </Modal>

          <Group position="center">
            <Button
              className="captionButton"
              onClick={() => setOpened(true)}
              disabled={post.userId !== currentUser._id}
            ></Button>
          </Group>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <Link to={`/postdetail/${post._id}`}>
            {/* this will link to postdetail */}
            {post.img ? <img className="postImg" src={PF + post.img} /> : null}
          </Link>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ? activeLike : inactiveLike}
            <span className="postLikeCounter">
              {like} people liked this post
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
        <div className="commentSection">
          <input
            placeholder="Add comment here.."
            type="text"
            className="commentInput"
          />
          <button
            className="commentButton"
            disabled={currentUser.verified == false}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
