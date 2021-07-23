import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import './App.css';
import UserTool from './components/UserTool';
import VotesTools from './components/VotesTools';
import ElectionPage from './components/ElectionPage';
import logo from "./res/votwin_logo.png";

function App() {
  return (
    <div className="container">
      <h1  className="header">Votwin</h1>
      <img className="center" src={logo} alt="new" />
      <Router>
        <nav className="router">
          <ul>
            <li>
              <Link to="/userTools">User Tools</Link>
            </li>
            <li>
              <Link to="/vote">Vote</Link>
            </li>
            <li>
              <Link to="/election">Create Elections</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/userTools">
            <UserTool />
          </Route>
          <Route path="/vote">
            <div className="form-box">
            <VotesTools />
            </div>
          </Route>
          <Route path="/election">
            <div className="form-box"><ElectionPage /></div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
