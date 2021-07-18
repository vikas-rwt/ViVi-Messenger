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
import Convo_Sent from './Components/Convo_Sent';
import Status from './Components/Status';
import Chat_Body from './Components/Chat_body';
import Friend_name from './Components/Friend_name';
import Conversation_body from './Components/Conversation_body';

// u there ? verifiation required : where he gone ? i wil send you my server link/ address, hmm ok bha ok i have to for 1 min
 
function App() {
  return (
    <>
    {/* <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/sign-up"  component={SignUp}></Route>
        <Route paths="/dashboard" component={Dashboard}/>
      </Switch>
    </Router> */}
    <Conversation_body />
    </>
  )
}

export default App;