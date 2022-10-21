import "./register.css";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">doConnect</h3>
          <span className="loginDesc">Be connected without boundaries!</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
              minLength="8"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
              minLength="10"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type={passwordShown ? "text" : "password"}
              minLength="6"
            />
            <div className="peekWrapper">
              <button
                type="button"
                className="peekPass"
                onClick={togglePassword}
              >
                Peek
              </button>
            </div>

            <input
              placeholder="Password Check"
              required
              ref={passwordAgain}
              className="loginInput"
              type={passwordShown ? "text" : "password"}
            />

            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
