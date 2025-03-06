export const MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_NOT_FOUND: 'User not found',
    INVALID_TOKEN: 'Invalid token (',
    UNAUTHORIZED: 'You are not authorized (',
    USER_ALREADY_EXISTS: 'User with this email already exists',
    EMAIL_WITH_LINK_SEND: 'Link for password reset sent to email',
    PASSWORD_CHANGED: 'Password changed)',
  },
  VALIDATION: {
    ALL_FIELDS_REQUIRED: 'All fields are required',
    NOT_STRONG_PASSWORD: 'Password must be secure',
    INVALID_PASSWORD: 'Invalid password',
    REQUIRED_NEW_PASSWORD: 'New password is required',
    REQUIRED_CONFIRM_NEW_PASSWORD: 'Confirm new password is required',
    PASSWORDS_NOT_MATCH: 'Passwords do not match',
    INVALID_EMAIL: 'Invalid email',
  },
  SERVER: {
    INTERNAL_ERROR: 'Internal server error. Please try again later',
  },
  PROFILE: {
    USER_DELETED: 'User successfully deleted'
  },
  ACCESS: {
    DENIED: 'Access denied'
  }
};
