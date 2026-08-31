export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) {
    return "Email address is required.";
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return "Please enter a valid email address.";
  }
  return undefined;
}

export function validatePassword(password: string, minLength = 6): string | undefined {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters.`;
  }
  return undefined;
}

export function validateRequired(value: string, fieldName: string): string | undefined {
  if (!value || !value.trim()) {
    return `${fieldName} is required.`;
  }
  return undefined;
}
