import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  return [
    values,
    // form change
    ev => {
      const { name, value } = ev.target;
      setValues(state => ({ ...state, [name]: value }));
    }
  ];
};

export default useForm;
