import React, {useState} from 'react'
import SignUpForm from '../../components/auth/SignUpForm';
import "./SignUp.css";

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>    
      <video src="./assets/video/kids.mp4" id="background-video" autoPlay loop muted />
                  
      <div className='signup-form-container'>          
          {/* <span className='close-btn'>×</span> */}
          <div className='signup-form-content-left'>
            <img className='form-img' src='./assets/images/signup/signup.svg' alt='spaceship' />
          </div>
          <div className='signup-form-content-right'>
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
