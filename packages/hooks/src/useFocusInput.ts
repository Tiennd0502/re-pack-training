import { createRef, useCallback, useMemo, RefObject } from "react";
import { TextInput } from "react-native";

export const useFocusInput = <T extends string>(fields: T[]) => {
  const fieldRefs: Record<T, RefObject<TextInput>> = useMemo(() => {
    return Object.fromEntries(
      fields.map((key) => [key, createRef<TextInput>()]),
    ) as Record<T, RefObject<TextInput>>;
  }, [fields]);

  const handleFocus = useCallback(
    (field?: T) => {
      field && fieldRefs[field]?.current?.focus();
    },
    [fieldRefs],
  );

  return {
    fieldRefs,
    onFocus: handleFocus,
  };
};
