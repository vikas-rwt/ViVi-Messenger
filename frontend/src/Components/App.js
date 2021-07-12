import React from 'react';
import Home from './Home';
import SignUp from './SignUp';
import Dashboard from './Dashboard.jsx';
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