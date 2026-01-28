import { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { FieldErrors, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Types
import { User } from '@repo/types/user';

// Constants
import { SCHEMA } from '@repo/constants/validation';

// Hooks
import { useFocusInput } from '@repo/hooks/useFocusInput';

// Components
import ControllerInput from '@repo/ui/components/ControllerInput';
import Checkbox from '@repo/ui/components/Checkbox';
import Button from '@repo/ui/components/Button';
import ShippingMethod from '@repo/ui/components/ShippingMethod';

type FormData = {
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  city: string;
  state?: string;
  zipCode: string;
  phoneNumber: string;
  fee?: number;
  isCopyAddress: boolean;
};
interface ShippingAddressProps {
  user: User;
  onCheckout: (data: FormData) => void;
}

const ShippingAddress = ({ user, onCheckout }: ShippingAddressProps) => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    firstName = '',
    lastName = '',
    country = '',
    street = '',
    city = '',
    state = '',
    zipCode = '',
    phoneNumber = '',
  } = user || {};

  const defaultValues = useMemo(
    () => ({
      firstName,
      lastName,
      country,
      street,
      city,
      state,
      zipCode: zipCode.toString(),
      phoneNumber,
      fee: 0,
      isCopyAddress: false,
    }),
    [city, country, firstName, lastName, phoneNumber, state, street, zipCode],
  );

  const { fieldRefs, onFocus } = useFocusInput(
    Object.keys(defaultValues) as (keyof typeof defaultValues)[],
  );

  const { control, getValues, setValue, watch, reset, handleSubmit } =
    useForm<FormData>({
      defaultValues,
      mode: 'onBlur',
    });

  const isCopyAddress = watch('isCopyAddress');

  const handleToggleCheckbox = useCallback(() => {
    const newValue = !getValues('isCopyAddress');
    setValue('isCopyAddress', newValue);
  }, [getValues, setValue]);

  const handleClearErrorMessage = useCallback(() => setErrorMessage(''), []);

  const handleChangeShippingMethod = useCallback(
    (value: number) => setValue('fee', value),
    [],
  );

  const handleErrorForm = useCallback(
    (errors: FieldErrors<FormData>) => {
      const getFieldsError = Object.keys(
        errors,
      ) as (keyof typeof defaultValues)[];

      const firstFieldError = getFieldsError.filter(
        key => key !== 'fee' && key !== 'isCopyAddress',
      )[0];
      if (getFieldsError?.length && firstFieldError) {
        fieldRefs[firstFieldError].current.focus();
      }
    },
    [fieldRefs],
  );

  const onSubmit = useCallback((data: FormData) => {
    onCheckout(data);
  }, []);

  useEffect(() => {
    if (user) {
      reset(defaultValues);
    }
  }, [user]);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bottomOffset={20}
      extraKeyboardSpace={30}
    >
      <View className="flex-1 mt-5 px-4 pb-6">
        <Text className="text-tertiary text-base font-regular">STEP 1</Text>
        <Text className="text-primary text-2xl font-bold">Shipping</Text>
        <View className="mt-10 gap-5">
          <ControllerInput<FormData>
            name="firstName"
            nextField="lastName"
            placeholder="First Name"
            control={control}
            rules={SCHEMA.firstName}
            inputRef={fieldRefs.firstName}
            clearError={handleClearErrorMessage}
            onFocusNextInput={onFocus}
          />
          <ControllerInput<FormData>
            name="lastName"
            nextField="country"
            placeholder="Last Name"
            control={control}
            rules={SCHEMA.lastName}
            inputRef={fieldRefs.lastName}
            clearError={handleClearErrorMessage}
            onFocusNextInput={onFocus}
          />
          <ControllerInput<FormData>
            name="country"
            nextField="street"
            placeholder="Country"
            control={control}
            rules={SCHEMA.country}
            inputRef={fieldRefs.country}
            clearError={handleClearErrorMessage}
            onFocusNextInput={onFocus}
          />
          <ControllerInput<FormData>
            name="street"
            nextField="city"
            placeholder="Street name"
            control={control}
            rules={SCHEMA.street}
            inputRef={fieldRefs.street}
            clearError={handleClearErrorMessage}
            onFocusNextInput={onFocus}
          />
          <ControllerInput<FormData>
            name="city"
            nextField="state"
            placeholder="City"
            control={control}
            rules={SCHEMA.city}
            inputRef={fieldRefs.city}
            clearError={handleClearErrorMessage}
            onFocusNextInput={onFocus}
          />
          <ControllerInput<FormData>
            name="state"
            nextField="zipCode"
            placeholder="State / Province"
            control={control}
            rules={SCHEMA.state}
            inputRef={fieldRefs.state}
            clearError={handleClearErrorMessage}
            onFocusNextInput={onFocus}
          />
          <ControllerInput<FormData>
            name="zipCode"
            nextField="phoneNumber"
            placeholder="Zip-code"
            keyboardType="numeric"
            control={control}
            rules={SCHEMA.zipCode}
            inputRef={fieldRefs.zipCode}
            clearError={handleClearErrorMessage}
            onFocusNextInput={onFocus}
          />
          <ControllerInput<FormData>
            name="phoneNumber"
            placeholder="Phone Number"
            keyboardType="numeric"
            control={control}
            rules={SCHEMA.phoneNumber}
            inputRef={fieldRefs.phoneNumber}
            clearError={handleClearErrorMessage}
            onFocusNextInput={onFocus}
          />
        </View>
        <View className="mt-12 px-4 py-5">
          <ShippingMethod
            defaultValue={0}
            onChange={handleChangeShippingMethod}
          />
        </View>
        <View className="mt-5 px-4 py-5 gap-5">
          <Text className="text-primary text-base font-bold">
            Billing Address
          </Text>
          <Checkbox
            selected={isCopyAddress}
            label="Copy address data from shipping"
            onValueChange={handleToggleCheckbox}
          />
        </View>
        {errorMessage && (
          <Text className="text-error text-sm">{errorMessage}</Text>
        )}
        <Button
          disabled={!user}
          text="Continue to payment"
          onPress={handleSubmit(onSubmit, handleErrorForm)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ShippingAddress;
