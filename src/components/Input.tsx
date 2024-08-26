import React from "react";

type InputProps = {
  value: string;
  setValue: (val: string) => void;
};

function Input({ value, setValue }: InputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      let inputValue = e.target.value;
      
  
      if (inputValue.length > 2) {
        inputValue = inputValue.slice(0, 2);
      }
      const numValue = Number(inputValue);
      setValue(String(numValue));
    };
  
    return (
      <input
        type="number"
        className="w-[5vw] text-4xl text-center h-[5vw] appearance-none"
        placeholder="00"
        value={value}
        onChange={handleChange}
      />
    );
  }
  
export default Input;
