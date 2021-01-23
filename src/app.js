import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "./redux/auth/authActions";

import { hot } from "react-hot-loader";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import "./App.css";


import PrivateRoute from "./utils/PrivateRoute";

import PublicRoute from "./utils/PublicRoute";
import Navbar from "./components/menu/v1/Navbar";
import Sidebar from "./components/sidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Elibrary from "./pages/Elibrary";
import Academy from "./pages/Academy";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const App = ({isAuthenticated}) => {  
  useEffect(()=>{
    loadUser()
    // console.log("states:"+state);
  },[]);

const [isOpen, setIsOpen] = useState(false);
const toggle = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
}

  return (
    <>      
      <Router>
      
        {
          isAuthenticated ? <Navbar toggle={toggle}/> : ""          
          // <Sidebar isOpen={isOpen} toggle={toggle}/>
          
          // <Redirect to='/signup' />
        }
        {isAuthenticated ? <Sidebar isOpen={isOpen} toggle={toggle}/> : ""}
        <Switch>            
            <PublicRoute exact path='/' component={Home} />
            <PublicRoute path='/login' component={Login} />
            {/* <Route path='/signup' component={SignUp} /> */}
            <PrivateRoute                
                path='/dashboard'
                component={Dashboard}
              />
            <PrivateRoute                
                path='/elibrary'
                component={Elibrary}
              />
            <PrivateRoute                
                path='/academy'
                component={Academy}
              />
            {/* <PublicRoute exact path='/login' component={Login} /> */}
					  <PublicRoute path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated  
});

// Adding connect allows you to inherit root states
// export default connect(null,[])(hot(module)(App));
export default connect(mapStateToProps,null)(hot(module)(App));
