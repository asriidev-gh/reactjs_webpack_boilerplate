import React, {useState} from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }
    return (
        <div>
            <LoginForm submitForm={submitForm}/>
        </div>
    )
}

export default Login
