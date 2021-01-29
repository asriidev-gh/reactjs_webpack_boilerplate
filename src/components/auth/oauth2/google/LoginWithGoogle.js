import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { refreshGoogleLoginTokenSetup } from "../../../../utils/refreshGoogleLoginTokenSetup";
import { loginWithGoogle } from "../../../../redux/auth/authActions";

const clientId = '833865276502-psc9rbvs5gva6qogpnm8fqf3sdq2smdf.apps.googleusercontent.com';

const LoginWithGoogle = ({loginWithGoogle}) => {
    const history = useHistory();
    
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser: ', res.profileObj);

        // Initializing the setup
        refreshGoogleLoginTokenSetup(res);
        
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BACKEND_API}/user/googlelogin`,
            data: {tokenId: res.tokenId}
        }).then(response => {
            console.log(response);
            if(response.status == 200 && response.data.code){
                loginWithGoogle({token: response.data.token,
                                 email: response.data.user.email, 
                                 name: response.data.user.name});
            }
        });
    }

    const onFailure = (res) => {
        console.log('[Login Failed] res:', res);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />    
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });
  
  export default connect(mapStateToProps, {loginWithGoogle})(LoginWithGoogle);
