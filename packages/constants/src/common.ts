export const CURRENCY_UNIT = "$";

export const REGEX = {
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  CHECK_NUMBER: /.*[0-9].*/,
  CHECK_UPPERCASE: /[A-Z]/,
  CHECK_SYMBOL: /.*[!@#$%^&+=*].*/,
  PHONE_NUMBER: /^(?:\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-5]|9[0-9])[0-9]{7}$/,
  ZIPCODE: /^\d{5}$/,
};

export const INIT_PAGE = 1;

export const PAGE_SIZE = 10;
