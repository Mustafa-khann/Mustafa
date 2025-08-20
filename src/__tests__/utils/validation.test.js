import { validation, validateForm } from '../../utils/validation';

describe('Validation Utility', () => {
  describe('isValidEmail', () => {
    test('validates correct email addresses', () => {
      expect(validation.isValidEmail('test@example.com')).toBe(true);
      expect(validation.isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    test('rejects invalid email addresses', () => {
      expect(validation.isValidEmail('invalid-email')).toBe(false);
      expect(validation.isValidEmail('test@')).toBe(false);
      expect(validation.isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('isRequired', () => {
    test('validates required fields', () => {
      expect(validation.isRequired('test')).toBe(true);
      expect(validation.isRequired(0)).toBe(true);
      expect(validation.isRequired(false)).toBe(true);
    });

    test('rejects empty values', () => {
      expect(validation.isRequired('')).toBe(false);
      expect(validation.isRequired('   ')).toBe(false);
      expect(validation.isRequired(null)).toBe(false);
      expect(validation.isRequired(undefined)).toBe(false);
    });
  });

  describe('minLength', () => {
    test('validates minimum length', () => {
      expect(validation.minLength('test', 3)).toBe(true);
      expect(validation.minLength('test', 4)).toBe(true);
    });

    test('rejects strings that are too short', () => {
      expect(validation.minLength('test', 5)).toBe(false);
      expect(validation.minLength('', 1)).toBe(false);
    });
  });

  describe('maxLength', () => {
    test('validates maximum length', () => {
      expect(validation.maxLength('test', 5)).toBe(true);
      expect(validation.maxLength('test', 4)).toBe(true);
    });

    test('rejects strings that are too long', () => {
      expect(validation.maxLength('test', 3)).toBe(false);
    });
  });
});

describe('validateForm', () => {
  test('validates form data correctly', () => {
    const data = {
      email: 'test@example.com',
      name: 'John Doe',
      age: '25',
    };

    const rules = {
      email: [
        { type: 'required', message: 'Email is required' },
        { type: 'email', message: 'Invalid email format' },
      ],
      name: [
        { type: 'required', message: 'Name is required' },
        { type: 'minLength', min: 2, message: 'Name must be at least 2 characters' },
      ],
      age: [
        { type: 'number', message: 'Age must be a number' },
        { type: 'positiveNumber', message: 'Age must be positive' },
      ],
    };

    const result = validateForm(data, rules);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test('returns errors for invalid data', () => {
    const data = {
      email: 'invalid-email',
      name: '',
      age: '-5',
    };

    const rules = {
      email: [{ type: 'email', message: 'Invalid email format' }],
      name: [{ type: 'required', message: 'Name is required' }],
      age: [{ type: 'positiveNumber', message: 'Age must be positive' }],
    };

    const result = validateForm(data, rules);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toContain('Invalid email format');
    expect(result.errors.name).toContain('Name is required');
    expect(result.errors.age).toContain('Age must be positive');
  });
});
