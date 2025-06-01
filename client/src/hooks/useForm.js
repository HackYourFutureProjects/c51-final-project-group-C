import { useState } from "react";

export const useForm = (initialValues = {}) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [clientValidationError, setClientValidationError] = useState(null);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const updateField = (fieldName, value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // 👇 Some simple validation on a client side to avoid unnecessary API calls to the server (check emty fileds, etc)

  // Check if there are some empty fields
  const validateRequired = (fieldNames) => {
    for (const field of fieldNames) {
      const value = formValues[field];
      if (!value || (typeof value === "string" && !value.trim())) {
        setClientValidationError(`Please enter ${field}`);
        return false;
      }
    }
    return true;
  };

  // 👇 Check if valid email format
  const validateEmail = (fieldName) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues[fieldName])) {
      setClientValidationError(`Please enter a valid email address`);
      return false;
    }
    return true;
  };

  // 👇 Check if password and confirm password match
  const validatePasswordMatch = (passwordField, confirmField) => {
    if (formValues[passwordField] !== formValues[confirmField]) {
      setClientValidationError(`Passwords do not match`);
      return false;
    }
    return true;
  };

  const clearClientValidationError = () => setClientValidationError(null);

  const resetForm = () => {
    setFormValues(initialValues);
    clearClientValidationError();
  };

  return {
    formValues,
    clientValidationError,
    handleFormChange,
    updateField,
    validateRequired,
    validateEmail,
    validatePasswordMatch,
    clearClientValidationError,
    resetForm,
    setFormValues,
  };
};
