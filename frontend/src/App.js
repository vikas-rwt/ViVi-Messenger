import React from 'react';
import SignUp from './Components/SignUp';
import Authentication_controller from './Components/Authentication_controller';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"


function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact component={Authentication_controller}></Route>
        <Route path="/sign-up"  component={SignUp}></Route>
      </Switch>
    </Router>
    </>
  )
}

export default App;