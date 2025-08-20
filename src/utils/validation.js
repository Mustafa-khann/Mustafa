// Validation utility
// Centralized validation functions for forms and data

export const validation = {
  // Email validation
  isValidEmail: email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // URL validation
  isValidUrl: url => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Required field validation
  isRequired: value => {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  },

  // Minimum length validation
  minLength: (value, min) => {
    return value && value.toString().length >= min;
  },

  // Maximum length validation
  maxLength: (value, max) => {
    return value && value.toString().length <= max;
  },

  // Number validation
  isNumber: value => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  },

  // Positive number validation
  isPositiveNumber: value => {
    return validation.isNumber(value) && parseFloat(value) > 0;
  },

  // Phone number validation (basic)
  isValidPhone: phone => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  // Password strength validation
  isStrongPassword: password => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    );
  },

  // Slug validation
  isValidSlug: slug => {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
  },

  // Date validation
  isValidDate: date => {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
  },

  // Future date validation
  isFutureDate: date => {
    const dateObj = new Date(date);
    const now = new Date();
    return validation.isValidDate(date) && dateObj > now;
  },

  // Past date validation
  isPastDate: date => {
    const dateObj = new Date(date);
    const now = new Date();
    return validation.isValidDate(date) && dateObj < now;
  },
};

// Form validation helper
export const validateForm = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];

    fieldRules.forEach(rule => {
      const { type, message, ...params } = rule;

      let isValid = true;

      switch (type) {
        case 'required':
          isValid = validation.isRequired(value);
          break;
        case 'email':
          isValid = validation.isValidEmail(value);
          break;
        case 'url':
          isValid = validation.isValidUrl(value);
          break;
        case 'minLength':
          isValid = validation.minLength(value, params.min);
          break;
        case 'maxLength':
          isValid = validation.maxLength(value, params.max);
          break;
        case 'number':
          isValid = validation.isNumber(value);
          break;
        case 'positiveNumber':
          isValid = validation.isPositiveNumber(value);
          break;
        case 'phone':
          isValid = validation.isValidPhone(value);
          break;
        case 'password':
          isValid = validation.isStrongPassword(value);
          break;
        case 'slug':
          isValid = validation.isValidSlug(value);
          break;
        case 'date':
          isValid = validation.isValidDate(value);
          break;
        case 'futureDate':
          isValid = validation.isFutureDate(value);
          break;
        case 'pastDate':
          isValid = validation.isPastDate(value);
          break;
        default:
          isValid = true;
      }

      if (!isValid) {
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(message);
      }
    });
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validation;
