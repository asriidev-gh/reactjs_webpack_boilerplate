import React, {useState} from 'react';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import "./Login.css";

const ForgotPassword = () => {
  
    return (
        <>
            <video src="./video/login_video.mp4" id="background-video" autoPlay loop muted />

            <div className='login-form-container'>
                <div className='login-form-content-left'>
                    <ForgotPasswordForm />
                </div>
                <div className='login-form-content-right'>
                    <img className='form-img' src='images/signup/login.svg' alt='spaceship' />
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
