import { useState, useEffect } from 'react';

const useResetPasswordForm = (validateResetPassword,resetPasswordWithSecretCode ,forgetPasswordEmail) => {
  const [resetPasswordValues, setResetPasswordValues] = useState({    
    email: forgetPasswordEmail,
    secretCode: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [resetPasswordErrors, setResetPasswordErrors] = useState({});  

  const resetPasswordHandleChange = e => {
    const { name, value } = e.target;    
    
    setResetPasswordValues({
      ...resetPasswordValues,
      [name]: value
    });    
  };

  const resetPasswordHandleSubmit = e => {
    e.preventDefault();

    setResetPasswordErrors(validateResetPassword(resetPasswordValues));

    let errResults = validateResetPassword(resetPasswordValues);
    
    if(!Object.keys(errResults).length){
      console.log("Reset Password with Secret Code:"+JSON.stringify(resetPasswordValues));            
      resetPasswordWithSecretCode({...resetPasswordValues,email:forgetPasswordEmail});     
    }    
  };

  const resetPasswordHandleReset = e => {
    setResetPasswordValues({      
      email: ''            
    });
    setResetPasswordErrors({});    
  }

  const handleResetPasswordSubmit = e => {
    e.preventDefault();

    setResetPasswordErrors(validateResetPassword(resetPasswordValues));

    let errResults = validateResetPassword(resetPasswordValues);
  };

  return { resetPasswordHandleChange, 
           resetPasswordHandleSubmit, 
           resetPasswordHandleReset, 
           resetPasswordValues, 
           resetPasswordErrors,            
           handleResetPasswordSubmit };
};

export default useResetPasswordForm;