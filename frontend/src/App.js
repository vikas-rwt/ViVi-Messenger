import React from 'react';
import SignUp from './Components/SignUp';
import Authentication_controller from './Components/Authentication_controller';
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

 
function App() {
  return (
    <>
    {/* <Router>
      <Switch>
        <Route path="/" exact component={Authentication_controller}></Route>
        <Route path="/sign-up"  component={SignUp}></Route>
      </Switch>
    </Router> */}
    <Conversation_body />
    </>
  )
}

export default App;