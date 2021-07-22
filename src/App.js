import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import './App.css';
import UserTool from './components/UserTool';

function App() {

  return (
    <Router>
      <nav><ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/userTools">User Tools</Link></li>
      </ul></nav>
      <Switch>
        <Route path="/home"><div></div></Route>
        <Route path="/userTools"><UserTool /></Route>
      </Switch>
    </Router>
  );
}

export default App;
