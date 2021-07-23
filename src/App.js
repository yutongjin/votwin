import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import './App.css';
import UserTool from './components/UserTool';
import VotesTools from './components/VotesTools'

function App() {
  return (
    <Router>
      <nav>
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
          <VotesTools />
        </Route>
        <Route path="/election">
          <div>election</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
