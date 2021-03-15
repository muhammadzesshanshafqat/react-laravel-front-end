import logo from './laravel-image.png';
import Button from '@material-ui/core/Button';
import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo}
          alt="logo" 
        />
        <p>
          Post-IT!!!!!
        </p>
        <Router>
        <Button variant="contained" color="primary" >
          <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
        </Button>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
        </Router>
        
      </header>
    </div>
  );
}

export default App;
