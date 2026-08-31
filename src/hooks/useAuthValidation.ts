import { useState, useCallback } from "react";
import { validateEmail, validatePassword, validateRequired } from "@/lib/validation";

export type AuthErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export function useAuthValidation() {
  const [errors, setErrors] = useState<AuthErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const clearFieldError = useCallback((field: keyof AuthErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }, []);

  const appendCredentialErrors = useCallback((email: string, password: string, newErrors: AuthErrors) => {
    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    const passErr = validatePassword(password);
    if (passErr) newErrors.password = passErr;
  }, []);

  const validateLoginForm = useCallback((email: string, password: string): boolean => {
    const newErrors: AuthErrors = {};
    appendCredentialErrors(email, password, newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [appendCredentialErrors]);

  const validateCreateAccountForm = useCallback(
    (firstName: string, lastName: string, email: string, password: string): boolean => {
      const newErrors: AuthErrors = {};

      const fnErr = validateRequired(firstName, "First name");
      if (fnErr) newErrors.firstName = fnErr;

      const lnErr = validateRequired(lastName, "Last name");
      if (lnErr) newErrors.lastName = lnErr;

      appendCredentialErrors(email, password, newErrors);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [appendCredentialErrors]
  );


  const validateResetPasswordForm = useCallback((email: string): boolean => {
    const newErrors: AuthErrors = {};
    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  return {
    errors,
    setErrors,
    clearFieldError,
    isSubmitting,
    setIsSubmitting,
    isSuccess,
    setIsSuccess,
    validateLoginForm,
    validateCreateAccountForm,
    validateResetPasswordForm,
  };
}
