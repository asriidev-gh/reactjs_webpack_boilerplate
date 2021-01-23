import { useState, useEffect } from 'react';

const useSignupForm = (callback,validate,register) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    allowExtraEmails: false    
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;    
    
    setValues({
      ...values,
      [name]: value
    });

    if(name == "allowExtraEmails"){
      setValues({
        ...values,
        [name]: e.target.checked
      });     
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    
    let errResults = validate(values);
    if(!Object.keys(errResults).length){
      // console.log("No err anymore!");
      setIsSubmitting(true);
      register(values);
    }
  };

  const handleReset = e => {
    setValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      allowExtraEmails: false  
    });
    setErrors({});
    setIsSubmitting(true);
  }

  // useEffect(
  //   () => {
  //     if (Object.keys(errors).length === 0 && isSubmitting) {
                
  //       callback();
  //       console.log("No Errors: ");
  //     }
  //   },
  //   [errors]
  // );

  return { handleChange, handleSubmit, handleReset, values, errors, isSubmitting };
};

export default useSignupForm;