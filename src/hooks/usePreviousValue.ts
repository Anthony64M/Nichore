import { useEffect, useRef } from "react";

export function usePreviousValue<T extends unknown>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
