import { memo, useCallback, useState } from "react";
import { View, Text } from "react-native";
import { twMerge } from "tailwind-merge";

// Components
import Radio from "../Radio";

interface ShippingMethodProps {
  defaultValue?: number;
  className?: string;
  onChange: (value: number) => void;
}

const ShippingMethod = ({
  defaultValue,
  className = "",
  onChange,
}: ShippingMethodProps) => {
  const [value, setValue] = useState(defaultValue);

  const wrapperClassName = twMerge("w-full", className);

  const firstMethodClassName = twMerge(
    "flex-row gap-5 py-5 px-3 justify-center items-center",
    !value && "border-t border-b border-quaternary bg-method-selected",
  );

  const secondMethodClassName = twMerge(
    "flex-row gap-5 py-5 px-3 justify-center items-center",
    value === 9.9 && "border-t border-b border-quaternary bg-method-selected",
  );

  const thirdMethodClassName = twMerge(
    "flex-row gap-5 py-5 px-3 justify-center items-center",
    value === 19.9 && "border-t border-b border-quaternary bg-method-selected",
  );

  const handleChangeValue = useCallback(
    (fee: number) => {
      setValue(fee);
      onChange(fee);
    },
    [onChange],
  );

  return (
    <View className={wrapperClassName}>
      <Text className="text-base font-secondary font-bold text-primary">
        Shipping method
      </Text>
      <View className="mt-[25px]">
        <View className={firstMethodClassName}>
          <Radio selected={!value} onPress={() => handleChangeValue(0)} />
          <View className="flex-1 justify-between gap-[7px]">
            <View className="flex-row items-center gap-[15px]">
              <Text className="text-sm font-primary font-semibold text-primary">
                Free
              </Text>
              <Text className="text-sm text-primary">Delivery to home</Text>
            </View>
            <Text className="text-sm text-quaternary opacity-40">
              Delivery from 3 to 7 business days
            </Text>
          </View>
        </View>
        <View className={secondMethodClassName}>
          <Radio
            selected={value === 9.9}
            onPress={() => handleChangeValue(9.9)}
          />
          <View className="flex-1 justify-between gap-[7px]">
            <View className="flex-row items-center gap-[15px]">
              <Text className="text-sm font-primary font-semibold text-primary">
                $ 9.90
              </Text>
              <Text className="text-sm text-primary">Delivery to home</Text>
            </View>
            <Text className="text-sm text-quaternary opacity-40">
              Delivery from 4 to 6 business days
            </Text>
          </View>
        </View>
        <View className={thirdMethodClassName}>
          <Radio
            selected={value === 19.9}
            onPress={() => handleChangeValue(19.9)}
          />
          <View className="flex-1 justify-between gap-[7px]">
            <View className="flex-row items-center gap-[15px]">
              <Text className="text-sm font-primary font-semibold text-primary">
                $ 19.90
              </Text>
              <Text className="text-sm text-primary">Fast Delivery</Text>
            </View>
            <Text className="text-sm text-quaternary opacity-40">
              Delivery from 2 to 3 business days
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(ShippingMethod);
