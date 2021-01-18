import React, { useEffect } from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";

import { loadUser } from "./redux/auth/authActions";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./components/dashboard";
import PublicRoute from "./utils/PublicRoute";

const App = () => {  
  useEffect(()=>{
    loadUser()
    // console.log("states:"+state);
  },[]);

  return (
    <>      
      <Router>
        <Switch>
            <Route path='/' exact component={Home} />
            {/* <Route path='/signup' component={SignUp} /> */}
            <PrivateRoute
                exact
                path='/dashboard'
                component={Dashboard}
              />
            {/* <PublicRoute exact path='/login' component={Login} /> */}
					  <PublicRoute path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log("States:"+JSON.stringify(state.auth));
};

// Adding connect allows you to inherit root states
// export default connect(null,[])(hot(module)(App));
export default hot(module)(App);
