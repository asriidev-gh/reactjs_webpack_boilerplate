import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import "./Profile.css";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },    
  },
  deactivateSecBtn: {
    zIndex: "-1"
  }
}));

const Profile = ({user}) => {
    const classes = useStyles();

    return (
        <div className="profileSec">            
            <div className="mainContent">
                <Link to="/" className="profileSecBg profileSecBlock"></Link>                
                <Link to="/" className="avatarLink">                    
                    <img src="https://mertskaplan.com/wp-content/plugins/msk-twprofilecard/img/mertskaplan.jpg" className="avatarImg"/>
                </Link>

                <div className="userSec">
                    <div className="deactivateSec">                        
                        <Button className="deactivateSecBtn" variant="contained" color="secondary" size="small">
                            Deactivate
                        </Button>
                    </div>
                    <div className="userSecName">
                        <Link to="/">{user.name}</Link>
                    </div>
                    <span className="userSecEmail">
                        <Link to="/">{user.email}</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.error
});

export default connect(mapStateToProps, null)(Profile);
