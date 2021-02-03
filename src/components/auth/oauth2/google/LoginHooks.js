import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { useGoogleLogin } from 'react-google-login';
import axios from 'axios';
import "./LoginHooks.css";

// refresh token
import { refreshGoogleLoginTokenSetup } from "../../../../utils/refreshGoogleLoginTokenSetup";
import { loginWithGoogle } from "../../../../redux/auth/authActions";

const clientId = process.env.GOOGLE_CLIENT_ID;

function LoginHooks({loginWithGoogle,isAuthenticated}) {

  const onSuccess = (res) => {
    refreshGoogleLoginTokenSetup(res);
    
    if(res.profileObj.name){        
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BACKEND_API}/user/googlelogin`,
            data: {tokenId: res.tokenId}
        }).then(response => {
            // console.log(response);
            if(response.status == 200 && response.data.code){
                loginWithGoogle({token: response.data.token,
                                 id: response.data.user.id,
                                 email: response.data.user.email, 
                                 name: response.data.user.name,
                                 authType: response.data.user.authType
                                });
            }
        });
    }    
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please try again with correct credentials`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    // isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="button">
      <img src="./assets/images/signup/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });
  
export default connect(mapStateToProps, {loginWithGoogle})(LoginHooks);