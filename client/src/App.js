import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import PostDetail from "./pages/postDetail/PostDetail";
import {
  BrowserRouter as Router,
  // Routes,
  Route,
  // Navigate,
  Switch,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile /> : <Login />}
          {/* <Profile /> */}
        </Route>
        <Route path="/postdetail/:id">
          <PostDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
