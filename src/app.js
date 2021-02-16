import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "./redux/auth/authActions";

import { hot } from "react-hot-loader";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import "./app.css";
import PrivateRoute from "./utils/PrivateRoute";

import PublicRoute from "./utils/PublicRoute";
import Navbar from "./components/menu/v1/Navbar";
import Sidebar from "./components/sidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile";
import Elibrary from "./pages/Elibrary";
import Academy from "./pages/Academy";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Quizzes from "./pages/Quizzes";

import QuizDetails from "./components/quiz/QuizDetails";
import Quiz from "./components/quiz/Quiz";

import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifiedAccountLandingPage from "./pages/VerifiedAccountLandingPage";

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
          isAuthenticated ? <><Navbar toggle={toggle}/></> : ""
        }
        {isAuthenticated ? <Sidebar isOpen={isOpen} toggle={toggle}/> : ""}
        <Switch>                       
            <PublicRoute exact path='/' component={Home} />
            <PublicRoute path='/login' component={Login} />
            
            <PublicRoute path='/forgotPassword' component={ForgotPassword} />
            <PublicRoute path='/verifiedAccount' component={VerifiedAccountLandingPage} />
            
            <PrivateRoute path='/quizzes' component={Quizzes} />
            <PrivateRoute path='/quizdetails/:id' component={QuizDetails} />
            <PrivateRoute path='/quiz/:id' component={Quiz} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/createQuiz' component={Quizzes} />
            <PrivateRoute path='/academy' component={Academy} />
            <PrivateRoute path='/profile'component={Profile} />                         
              
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
