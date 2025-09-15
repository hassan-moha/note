// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation regex
// At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  return EMAIL_REGEX.test(email);
};

/**
 * Validates a password
 * @param {string} password - The password to validate
 * @returns {boolean} - Whether the password is valid
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== "string") return false;
  return PASSWORD_REGEX.test(password);
};
