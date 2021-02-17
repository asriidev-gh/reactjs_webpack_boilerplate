export default function validateResetPasswordInfo(values) {
    let errors = {};

    if (!values.secretCode) {
      errors.secretCode = 'Secret Code is required';
    }
  
    if (!values.newPassword) {
      errors.newPassword = 'Password is required';
    } else if (values.newPassword.length < 6) {
      errors.newPassword = 'Password needs to be 6 characters or more';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Password is required';
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = 'Passwords do not match';      
    }else if (!values.newPassword.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/)){
      errors.confirmPassword = 'Your password must contain a lowercase letter, an uppercase letter, a numeric digit and a special character.';
    }

    
    
    return errors;
}