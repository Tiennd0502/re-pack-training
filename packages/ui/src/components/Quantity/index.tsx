import { memo, useCallback, useState } from "react";
import { View, Text } from "react-native";
import { twMerge } from "tailwind-merge";

// Components
import PlusIcon from "../Icons/PlusIcon";
import MinusIcon from "../Icons/MinusIcon";

interface QuantityProps {
  defaultValue?: number;
  max?: number;
  onChangeValue: (value: number) => void;
  className?: string;
}

const Quantity = ({
  defaultValue = 0,
  max,
  onChangeValue,
  className,
}: QuantityProps) => {
  const [number, setNumber] = useState<number>(defaultValue);

  const handleIncrement = useCallback(() => {
    const result = number + 1;

    setNumber(result);
    onChangeValue(result);
  }, [number, onChangeValue]);

  const handleDecrement = useCallback(() => {
    setNumber(number - 1);
    onChangeValue(number - 1);
  }, [number, onChangeValue]);

  const wrapperClassName = twMerge(
    "flex-row justify-between items-center border border-primary rounded-[20px] w-[63px] h-[22px] px-2",
    className,
  );

  return (
    <View className={wrapperClassName}>
      <MinusIcon
        width={13}
        height={13}
        disabled={number <= 1}
        onPress={handleDecrement}
      />
      <Text className="flex-0 text-xs text-primary">{number}</Text>
      <PlusIcon
        width={13}
        height={13}
        disabled={Boolean(max && number === max)}
        onPress={handleIncrement}
      />
    </View>
  );
};

export default memo(Quantity);
