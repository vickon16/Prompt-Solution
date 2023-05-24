"use client"

import { useEffect, useState } from "react"

export default function useDebounce(value : string, delay : number) {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay)

    return () => clearTimeout(timeoutId);
  }, [value])

  return debouncedValue
}