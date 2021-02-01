import React, {useState} from 'react';
import LoginForm from '../../components/auth/LoginForm';
import Link from '@material-ui/core/Link';
import "./Login.css";
import LoginHooks from '../../components/auth/oauth2/google/LoginHooks';

const Login = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }
    return (
        <>
        <video src="./video/login_video.mp4" id="background-video" autoPlay loop muted />

        <div className='login-form-container'>
            {/* <span className='login-close-btn'><Link color="inherit" href="/">×</Link></span> */}
            
            <div className='login-form-content-left'>                
                <div className='google-login-sec'>
                    <LoginHooks/>
                    <span className="login-sec-or">OR</span>
                </div>
                
                <LoginForm submitForm={submitForm}/>
            </div>
            <div className='login-form-content-right'>
                <img className='form-img' src='images/signup/login.svg' alt='spaceship' />
            </div>
        </div>
        </>
    )
}

export default Login
