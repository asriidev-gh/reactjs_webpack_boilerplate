import { useState, useEffect } from 'react';

const useForgetPasswordForm = (validateForgotPassword,validateResetPassword,forgetPassword) => {
  const [values, setValues] = useState({    
    email: '',    
  });
  const [errors, setErrors] = useState({});  

  const handleChange = e => {
    const { name, value } = e.target;    
    
    setValues({
      ...values,
      [name]: value
    });    
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validateForgotPassword(values));

    let errResults = validateForgotPassword(values);
    if(!Object.keys(errResults).length){      
      forgetPassword(values);     
    }    
  };

  const handleReset = e => {
    setValues({      
      email: ''            
    });
    setErrors({});    
  }

  const handleResetPasswordSubmit = e => {
    e.preventDefault();

    setErrors(validateResetPassword(values));

    let errResults = validateResetPassword(values);
    if(!Object.keys(errResults).length){      
      // forgetPassword(values);     
    }    
  };

  return { handleChange, 
           handleSubmit, 
           handleReset, 
           values, 
           errors,            
           handleResetPasswordSubmit };
};

export default useForgetPasswordForm;