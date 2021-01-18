import { useState, useEffect } from 'react';

const useForm = (callback,validate,register) => {
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
    // console.log("Validate:"+JSON.stringify(validate(values)));
    let result = validate(values);
    if(Object.keys(result).length){
      setErrors(result);
    }else{
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

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {                
        callback();
        // console.log("No Form Errors: ");
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, handleReset, values, errors, isSubmitting };
};

export default useForm;