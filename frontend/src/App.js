import React from 'react';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard.jsx';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Profile from './Components/Profile';
import Search from './Components/Search';
import Button from './Components/Button';
import User_Img from './Components/User_Img';
import User_Convo from './Components/User_Convo';
import Convo_Received from './Components/Convo_Received';
import Convo_Sent from './Components/Convo-Sent';
import Status from './Components/Status';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/sign-up"  component={SignUp}></Route>
        <Route paths="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
    </>
  )
}

export default App;