import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Text, View } from 'react-native';

// Constants
import { ERROR_MESSAGES } from '@repo/constants/message';
import { SCHEMA } from '@repo/constants/validation';

// Hooks
import { useAuth } from '@repo/hooks/useAuth';
import { useFocusInput } from '@repo/hooks/useFocusInput';

// Interfaces
import { LoginPayLoad } from '@repo/types/auth';
import { User } from '@repo/types/user';

// Stores
import { useAuthStore } from '@repo/stores/auth';
import { useUserStore } from '@repo/stores/user';

// Components
import MainLayout from '@/components/MainLayout';
import Button from '@repo/ui/components/Button';
import ControllerInput from '@repo/ui/components/ControllerInput';
import AppleIcon from '@repo/ui/components/Icons/AppleIcon';
import FacebookIcon from '@repo/ui/components/Icons/FacebookIcon';
import GoogleIcon from '@repo/ui/components/Icons/GoogleIcon';

const LoginScreen = () => {
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  const setUser = useUserStore(state => state.setUser);

  const [errorMessage, setErrorMessage] = useState('');
  const {
    logIn: { mutate, isPending },
  } = useAuth();

  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  );

  const fields = Object.keys(defaultValues) as (keyof typeof defaultValues)[];

  const { fieldRefs, onFocus } = useFocusInput(fields);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<LoginPayLoad>({
    defaultValues,
    mode: 'onBlur',
  });
  const isLoading = Boolean(isSubmitting || isPending);
  const email = watch('email');
  const password = watch('password');
  const hasValidationErrors = !email || !password;

  const handleClearErrorMessage = useCallback(() => setErrorMessage(''), []);

  const handleLogin = useCallback(
    async (data: LoginPayLoad) => {
      Keyboard.dismiss();
      mutate(data, {
        onSuccess: async (users: User[]) => {
          if (users?.length) {
            setUser(users?.[0] ?? null);
            setIsAuthenticated(true);
            reset();
            setErrorMessage('');
          } else {
            setErrorMessage(ERROR_MESSAGES.LOGIN_FAILED);
          }
        },
        onError: (_error: Error) => {
          setErrorMessage(ERROR_MESSAGES.LOGIN_FAILED);
        },
      });
    },
    [mutate, reset, setIsAuthenticated, setUser],
  );

  return (
    <MainLayout>
      <View className="flex-1 h-full w-full align-center px-6 mt-20">
        <Text className="text-2xl font-bold mb-4 text-primary">
          {`Log into\nyour account`}
        </Text>

        <View className="gap-5 mt-12">
          <ControllerInput<LoginPayLoad>
            key="email"
            disabled={isLoading}
            name="email"
            rules={SCHEMA.email}
            inputRef={fieldRefs.email}
            nextField="password"
            control={control}
            placeholder="Email address"
            clearError={handleClearErrorMessage}
            onFocusNextInput={onFocus}
          />

          <ControllerInput<LoginPayLoad>
            key="password"
            disabled={isLoading}
            name="password"
            rules={SCHEMA.password}
            inputRef={fieldRefs.password}
            control={control}
            placeholder="Password"
            secureTextEntry
            returnKeyType="done"
            clearError={handleClearErrorMessage}
          />
        </View>

        <View className="mt-7 ml-auto mr-0 justify-end items-end">
          <Button
            disabled
            text="Forgot Password?"
            variant="ghost"
            textClassName="text-quaternary text-xs"
            onPress={() => {}}
          />
        </View>

        <View className="items-center mt-5 gap-6">
          {errorMessage && <Text className="text-error">{errorMessage}</Text>}
          <Button
            text="Login"
            className="w-36"
            disabled={isLoading || hasValidationErrors}
            isLoading={Boolean(isSubmitting || isPending)}
            onPress={handleSubmit(handleLogin)}
          />
          <Text className="text-primary text-xs font-light">
            or log in with
          </Text>
          <View className="flex-row gap-5">
            <AppleIcon />
            <GoogleIcon />
            <FacebookIcon />
          </View>
        </View>

        <View className="mt-7 mb-0 w-full flex-row justify-center items-center align-center gap-1">
          <Text className="text-primary text-xs">Don't have an account?</Text>
          <Button
            disabled
            text="Sign Up"
            variant="ghost"
            className="p-0 w-fit"
            textClassName="text-primary text-xs underline"
            onPress={() => {}}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default LoginScreen;
