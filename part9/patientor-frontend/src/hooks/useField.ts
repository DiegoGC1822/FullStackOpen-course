import { useState } from "react";

const useField = (type: string) => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    input: {
      type,
      value,
      onChange,
    },
    reset,
  };
};

export default useField;
