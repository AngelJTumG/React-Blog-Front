import { useState } from 'react';

export function useForm(initialValues, validateOnSubmit) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    if (validateOnSubmit(values)) {
      callback(values);
      setValues(initialValues);
    }
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
}
