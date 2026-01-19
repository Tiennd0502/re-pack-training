import { Theme } from '@repo/interfaces/style';

import { colors } from './colors';

export const lightThemes: Theme = {
  primary: colors.black[500],
  secondary: colors.white[600],
  tertiary: colors.black[300],
  quaternary: colors.gray.A300,
  quinary: colors.black[50],
  senary: colors.gray[500],
  septenary: colors.gray.A500,

  background: colors.white[500],
  bgSelectedMethod: colors.white[400],
  bgIconForm: colors.green[200],

  error: colors.red[400],
  success: colors.green[500],
  info: colors.blue[500],
  favorite: colors.pink[900],

  fontFamilyPrimary: 'ProductSansMedium',
  fontFamilySecondary: 'Nunito-Medium',
  fontFamilyTertiary: 'Roboto-Medium',
};

export const darkThemes: Theme = {
  ...lightThemes,
  primary: colors.white[500],
  secondary: colors.black[800],
  tertiary: colors.white[600],
  quaternary: colors.gray[200],
  quinary: colors.gray.A200,
  senary: colors.gray.A200,
  septenary: colors.gray.A50,

  background: colors.black[500],
  bgSelectedMethod: colors.black[800],
};
