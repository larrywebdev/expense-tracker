import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import _ from "lodash";

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  // Sync local state if initialValue changes from outside
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Memoize debounced callback to prevent re-creating it on every render
  const debouncedOnChange = useMemo(
    () => _.debounce(onChange, debounce),
    [onChange, debounce],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => debouncedOnChange.cancel();
  }, [debouncedOnChange]);

  // Handle the change directly on the event
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedOnChange(newValue); // Fire debounced callback here
  };
  return <Input {...props} value={value} onChange={handleInputChange} />;
}
