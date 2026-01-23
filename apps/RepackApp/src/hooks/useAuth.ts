import { useMutation } from '@tanstack/react-query';

import { API_PATH } from '@repo/constants/api';
import { GET } from '@/services/api';
import { User } from '@repo/types/user';
import { LoginPayLoad } from '@repo/types/auth';

export const useAuth = () => {
  const logIn = useMutation({
    mutationFn: ({ email, password }: LoginPayLoad) => {
      const url = `${process.env.API_URL}${
        API_PATH.USER
      }?email=${email.toLocaleLowerCase()}&password=${password}`;

      return GET<User[]>(url);
    },
  });

  return {
    logIn,
  };
};
