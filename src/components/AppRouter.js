import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Home';
import Search from './Search';
import NewPost from './NewPost';
import Notifications from './Notifications';
import Profile from './Profile';

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search/">Search</Link>
            </li>
            <li>
              <Link to="/newpost/">New Post</Link>
            </li>
            <li>
              <Link to="/notifications/">Notifications</Link>
            </li>
            <li>
              <Link to="/profile/">Profile</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/search/" component={Search} />
        <Route path="/newpost/" component={NewPost} />
        <Route path="/notifications/" component={Notifications} />
        <Route path="/profile/" component={Profile} />
      </div>
    </Router>
  );
}

export default AppRouter;