import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Constants
import { ERROR_MESSAGES } from '@/constants/message';
import { SCHEMA } from '@/constants/validation';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useFocusInput } from '@/hooks/useFocusInput';

// Interfaces
import { LoginPayLoad } from '@/interfaces/auth';
import { User } from '@/interfaces/user';

// Stores
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

// Components
import Button from '@/components/Button';
import ControllerInput from '@/components/ControllerInput';
import AppleIcon from '@/components/Icons/AppleIcon';
import FacebookIcon from '@/components/Icons/FacebookIcon';
import GoogleIcon from '@/components/Icons/GoogleIcon';
import MainLayout from '@/components/MainLayout';

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
    formState: { isSubmitting },
  } = useForm<LoginPayLoad>({
    defaultValues,
    mode: 'onBlur',
  });
  const isLoading = Boolean(isSubmitting || isPending);

  const handleClearErrorMessage = useCallback(() => setErrorMessage(''), []);

  const handleLogin = useCallback(
    async (data: LoginPayLoad) => {
      mutate(data, {
        onSuccess: async (users: User[]) => {
          if (users?.length) {
            console.log('users----', users);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 h-full w-full align-center px-6 mt-20">
          <Text className="text-2xl font-bold mb-4 text-primary">
            {`Log into\nyour account`}
          </Text>

          <View className="gap-5 mt-12">
            <ControllerInput<LoginPayLoad>
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

          <View className="flex-1 items-center mt-5 gap-6 mb-bottom">
            {errorMessage && <Text className="text-error">{errorMessage}</Text>}
            <Button
              text="Login"
              className="w-36"
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

          <View className="mt-7 mb-0 w-full flex-row items-center justify-between">
            <Text className="text-primary text-xs">Don't have an account?</Text>
            <Button
              disabled
              text="Sign Up"
              variant="ghost"
              textClassName="text-primary text-xs underline"
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default LoginScreen;
