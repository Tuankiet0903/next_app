import { forwardRef, InputHTMLAttributes } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | FieldError;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  showPassword?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      showPasswordToggle = false,
      onPasswordToggle,
      showPassword = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseInputClasses =
      "input-field bg-transparent dark:bg-gray-700 dark:border-gray-600 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500";

    const inputClasses = showPasswordToggle
      ? `${baseInputClasses} pr-10 ${className}`
      : `${baseInputClasses} ${className}`;

    return (
      <div>
        <label htmlFor={props.id} className="block text-sm font-medium mb-1">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={inputClasses}
            {...props}
            type={
              showPasswordToggle
                ? showPassword
                  ? "text"
                  : "password"
                : props.type
            }
          />
          {showPasswordToggle && onPasswordToggle && (
            <button
              type="button"
              onClick={onPasswordToggle}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-1">
            {typeof error === "string" ? error : error.message}
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
