import { useState } from "react";
import validator from "validator";

interface InputFieldProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: "" | "email" | "password";
  isShowError?: boolean;
}

const InputField = ({
  name,
  value,
  onChange,
  label,
  type,
  isShowError
}: InputFieldProps) => {

  const [showPassword, setShowPassword] = useState(false);


  const validate = (value: string) => {
    if (type === "email") {
      return validator.isEmail(value);
    }
    if (type === "password") {
      return validator.isStrongPassword(value);
    }
    return !!value;
  };

  const isError = isShowError && !validate(value);

  const inputType = (type === "password" && !showPassword)
    ? "password"
    : (type !== "password" && type)
    ? type : "text";

  return (
    <div className="mb-6 relative">
      {label ? (<label
        htmlFor={name}
        className={(isError ? "text-red-700" : "") + " block mb-2 text-sm font-medium text-start"}
      >
        {label}
      </label>) : ""}
      <input
        type={inputType}
        id={name}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.value?.trim();
          onChange(newValue);
        }}
        className={(isError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500") + " border  text-gray-900 text-sm rounded-lg block w-full p-2.5"}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 cursor-pointer"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  )
}
export default InputField;