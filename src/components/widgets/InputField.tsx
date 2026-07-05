import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import type {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  isRequired?: boolean;
  hasToggle?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export default function InputField<T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  isRequired,
  hasToggle = false,
  onBlur,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    hasToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;
const registeredProps = register(name);
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <Input
          type={inputType}
          placeholder={placeholder}
          {...registeredProps}
          /* className={error ? "border-red-500 pr-10" : "pr-10"} */
          onBlur={(e) => {
            registeredProps.onBlur(e);
            if (onBlur) onBlur(e);
          }}
          className={error ? "border-red-500 pr-10" : "pr-10"}
        />

        {hasToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
