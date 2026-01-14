import { REGEX } from './common';
import { ERROR_MESSAGES } from './message';

export const SCHEMA = {
  name: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Name'),
  },
  email: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.FIELD_INVALID('Email'),
    },
  },
  password: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Password'),
    minLength: { value: 8, message: ERROR_MESSAGES.PASSWORD_NOT_LONG },
    validate: (value: string) => {
      switch (true) {
        case !REGEX.CHECK_NUMBER.test(value):
          return ERROR_MESSAGES.PASSWORD_NOT_HAVE_NUMBER;
        case !REGEX.CHECK_UPPERCASE.test(value):
          return ERROR_MESSAGES.PASSWORD_NOT_HAVE_UPPERCASE;
        case !REGEX.CHECK_SYMBOL.test(value):
          return ERROR_MESSAGES.PASSWORD_NOT_HAVE_SYMBOL;
      }
    },
  },
  confirmPassword: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Confirm password'),
  },
  firstName: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('First Name'),
  },
  lastName: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Last Name'),
  },
  country: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Country'),
  },
  street: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Street Name'),
  },
  city: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('City'),
  },
  state: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('State / Province'),
  },
  zipCode: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Zip-code'),
    pattern: {
      value: REGEX.ZIPCODE,
      message: ERROR_MESSAGES.FIELD_INVALID('Zipcode'),
    },
  },
  phoneNumber: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Phone Number'),
    pattern: {
      value: REGEX.PHONE_NUMBER,
      message: ERROR_MESSAGES.FIELD_INVALID('Phone Number'),
    },
  },
};
