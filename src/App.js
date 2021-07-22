import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import './App.css';
import UserTool from './components/UserTool';
import VotesTools from './components/VotesTools';
import ElectionPage from './components/ElectionPage';

function App() {

  return (
    <Router>
      <nav><ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/register">Register Voters</Link></li>
        <li><Link to="/vote">Vote</Link></li>
        <li><Link to="/election">Create Elections</Link></li>
        <li><Link to="/userTools">User Tools</Link></li>
      </ul></nav>
      <Switch>
        <Route path="/home"><div></div></Route>
        <Route path="/userTools"><UserTool /></Route>
        <Route path="/register"><div>register</div></Route>
        <Route path="/vote"><VotesTools /></Route>
        <Route path="/election"><div><ElectionPage /></div></Route>
      </Switch>
    </Router>
  );
}

export default App;
