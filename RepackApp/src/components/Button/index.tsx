import { memo, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

export const buttonSize = {
  sm: 'h-[48px]',
  md: 'h-[51px]',
  lg: 'h-[53px]',
};

export const buttonVariant = {
  solid: 'bg-primary',
  outlined: 'border border-primary',
  ghost: 'bg-transparent',
};

export const buttonTextSize = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
};

export const buttonTextVariant = {
  solid: 'text-secondary',
  outlined: 'text-primary font-secondary',
  ghost: 'text-primary',
};

export interface ButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'solid' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  startIcon?: ReactNode;
  className?: string;
  textClassName?: string;
  onPress?: () => void;
}

const Button = ({
  text,
  variant = 'solid',
  size = 'md',
  disabled,
  startIcon,
  isLoading = false,
  onPress,
  className,
  textClassName,
  ...restProps
}: ButtonProps) => {
  const containerClassName = twMerge(
    'flex-row justify-center items-center gap-[15px] rounded-[25px] w-full',
    buttonVariant[variant],
    buttonSize[size],
    disabled && 'opacity-50',
    className,
  );

  const finalTextClassName = twMerge(
    'text-center rounded-[25px] font-primary',
    buttonTextVariant[variant],
    buttonTextSize[size],
    textClassName,
  );

  return (
    <TouchableOpacity
      {...restProps}
      className={containerClassName}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      onPress={onPress}
      testID="button"
    >
      {startIcon && startIcon}
      <Text className={finalTextClassName}>{text}</Text>

      {isLoading && (
        <ActivityIndicator size="small" className="text-secondary" />
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);
