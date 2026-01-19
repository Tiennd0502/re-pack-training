import { useMutation } from "@tanstack/react-query";

import { API_PATH } from "@repo/constants/api";
import { GET } from "@repo/services/api";
import { User } from "@repo/interfaces/user";
import { LoginPayLoad } from "@repo/interfaces/auth";

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
