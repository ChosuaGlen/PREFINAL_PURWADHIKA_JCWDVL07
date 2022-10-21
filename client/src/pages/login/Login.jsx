import { useRef, useContext, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  console.log(user);

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
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type={passwordShown ? "text" : "password"}
              required
              minLength="6"
              className="loginInput"
              ref={password}
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
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? <CircularProgress size="20px" /> : "Log In"}
            </button>
            <span className="loginForgot">Forget Password?</span>
            <Link to="/register">
              <button className="loginRegisterButton" disabled={isFetching}>
                {isFetching ? (
                  <CircularProgress size="20px" />
                ) : (
                  "Create New Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
