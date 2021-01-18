import React, {useState} from 'react'
import SignUpForm from '../components/auth/SignUpForm';
// import "./SignUp.css";
import SignUpSuccess from './SignUpSuccess';

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      <div className='form-container'>
          <span className='close-btn'>×</span>
          <div className='form-content-left'>
            <img className='form-img' src='images/signup/img-2.svg' alt='spaceship' />
          </div>
          <div className='form-content-right'>
          <SignUpForm submitForm={submitForm} />
            {/* {!isSubmitted ? (      
              <SignUpForm submitForm={submitForm} />
            ) : (
              <FormSuccess />
            )} */}
          </div>
        </div>
      
    </>
  )
}

export default SignUp
