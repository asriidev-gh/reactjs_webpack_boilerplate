import { useState, useEffect } from 'react';

const useLoginForm = (callback,validate,login) => {
  const [values, setValues] = useState({    
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;    
    
    setValues({
      ...values,
      [name]: value
    });

    // if(name == "allowExtraEmails"){
    //   setValues({
    //     ...values,
    //     [name]: e.target.checked
    //   });     
    // }
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));

    let errResults = validate(values);
    if(!Object.keys(errResults).length){
      setIsSubmitting(true);
      login(values);
    }    
  };

  const handleReset = e => {
    setValues({      
      email: '',
      password: ''      
    });
    setErrors({});
    setIsSubmitting(true);
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
                
        callback();
        console.log("No Errors: ");
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, handleReset, values, errors, isSubmitting };
};

export default useLoginForm;