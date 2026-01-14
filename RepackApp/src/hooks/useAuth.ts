import { useMutation } from '@tanstack/react-query';

// Constants
import { API_PATH } from '@/constants/api';

// Services
import { GET } from '@/services/api';

// Interface
import { User } from '@/interfaces/user';
import { LoginPayLoad } from '@/interfaces/auth';

export const useAuth = () => {
  const logIn = useMutation({
    mutationFn: ({ email, password }: LoginPayLoad) => {
      const url = `${
        API_PATH.USER
      }?email=${email.toLocaleLowerCase()}&password=${password}`;

      return GET<User[]>(url);
    },
  });

  return {
    logIn,
  };
};
