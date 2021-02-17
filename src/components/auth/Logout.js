import React from 'react';
import { connect } from "react-redux";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logout } from "../../redux/auth/authActions";
import { clearErrors } from "../../redux/auth/errorActions";

import { useGoogleLogout } from 'react-google-login';

const Logout = ({authType,logout,clearErrors,children}) => {
    const onLogoutSuccess = (res) => {
        console.log('Google Logged out Success');        
    };
    
    const onFailure = () => {
        console.log('Google Logout Failed!');
    };
    
    const clientId = process.env.GOOGLE_CLIENT_ID;

    const handleLogout = () => {
        console.log("Logout");
        clearErrors();
        logout();

        console.log("authType:"+authType);
        if(authType == "google"){
            signOut();
        }
    }

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });

    return (
        <a href="#" 
            className="menu-item"
            onClick={handleLogout}
        >
            <span className="icon-button"><ExitToAppIcon/></span>
            {children}            
        </a>
    )
}

const mapStateToProps = state => ({
    authType: state.auth.user.authType,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });

// export default Logout
export default connect(mapStateToProps,{logout,clearErrors})(Logout);
