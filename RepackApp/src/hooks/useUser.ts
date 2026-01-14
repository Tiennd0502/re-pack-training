import { useCallback, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

// Constants
import { API_PATH } from '@/constants/api';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/message';

// Services
import { GET, PATCH } from '@/services/api';

// Interface
import { User } from '@/interfaces/user';

// Stores
import { useUserStore } from '@/stores/user';

export const useUser = () => {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const lastRefetchTimeRef = useRef<number>(0);
  const REFETCH_DEBOUNCE_MS = 1000;

  const fetchUser = useQuery({
    queryKey: ['user', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return null;
      }
      return GET<User>(`${API_PATH.USER}/${user.id}`);
    },
    enabled: !!user?.id,
    staleTime: 0,
  });

  const refetch = useCallback(
    async (options?: { cancelRefetch?: boolean }) => {
      // Debounce: Skip if refetch was called recently
      const now = Date.now();
      if (now - lastRefetchTimeRef.current < REFETCH_DEBOUNCE_MS) {
        return fetchUser;
      }

      // Skip refetch if already refetching to avoid race conditions
      if (fetchUser.isRefetching) {
        return fetchUser;
      }

      lastRefetchTimeRef.current = now;
      const result = await fetchUser.refetch(options);

      // Only update store if data actually changed
      if (result.data && result.data.id === user?.id) {
        const avatarChanged = result.data.avatar !== user.avatar;
        const nameChanged = result.data.name !== user.name;
        const emailChanged = result.data.email !== user.email;

        if (avatarChanged || nameChanged || emailChanged) {
          setUser(result.data);
        }
      }

      return result;
    },
    [fetchUser, user, setUser],
  );

  const updateAvatar = useMutation({
    mutationFn: async (avatarUrl: string) => {
      if (!user?.id) {
        throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
      }

      const updatedUser = await PATCH<User, { avatar: string }>(
        `${API_PATH.USER}/${user.id}`,
        {
          avatar: avatarUrl,
        },
      );

      return updatedUser;
    },
    onSuccess: updatedUser => {
      if (user) {
        const newUser = {
          ...user,
          avatar: updatedUser.avatar,
        };
        setUser(newUser);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: SUCCESS_MESSAGES.AVATAR_UPDATED,
        });
      }
    },
    onError: (error, avatarUrl) => {
      // If API update fails, still update local store
      if (user) {
        const updatedUser = {
          ...user,
          avatar: avatarUrl,
        };
        setUser(updatedUser);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: ERROR_MESSAGES.AVATAR_UPDATE_FAILED,
        });
      }
    },
  });

  return {
    refetch,
    isLoading: fetchUser.isLoading,
    isRefetching: fetchUser.isRefetching,
    updateAvatar,
  };
};
