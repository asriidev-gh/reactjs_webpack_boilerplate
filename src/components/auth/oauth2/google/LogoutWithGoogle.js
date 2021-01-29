import React from 'react';
import { GoogleLogout } from "react-google-login";

const clientId = '833865276502-psc9rbvs5gva6qogpnm8fqf3sdq2smdf.apps.googleusercontent.com';

const LogoutWithGoogle = () => {
    
    const onLogoutSuccess = (res) => {
        console.log('[Logout made successfully]:', res);
        alert("Logout made successfully");
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"                
                onLogoutSuccess={onFailure}                
            />    
        </div>
    )
}

export default LogoutWithGoogle;
