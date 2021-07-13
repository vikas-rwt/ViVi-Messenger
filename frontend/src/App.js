import React from 'react';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard.jsx';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"


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