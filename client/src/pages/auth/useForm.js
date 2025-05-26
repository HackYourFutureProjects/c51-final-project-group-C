import { useState } from "react";

export const useForm = (initialValues = {}) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (formErrors[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const updateFormValue = (fieldName, value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (formErrors[fieldName]) {
      setFormErrors((prev) => ({ ...prev, [fieldName]: null }));
    }
  };

  const setFormError = (field, message) => {
    setFormErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearFormErrors = () => setFormErrors({});

  return {
    formValues,
    formErrors,
    handleFormChange,
    updateFormValue,
    setFormError,
    clearFormErrors,
    setFormValues,
  };
};
