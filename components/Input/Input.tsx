import * as React from "react";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  placholderText?: string;
  icon?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      placholderText = "Insert text here",
      className,
      type,
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1",
            "hover:border-gray-400",
            "focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 focus-within:ring-opacity-20",
            "transition-all duration-200 ease-in-out",
            "focus-within:hover:border-blue-700",
            error ? "border-red-500" : "border-gray-300"
          )}
        >
          {icon && <MagnifyingGlassIcon className="text-gray-500" />}
          <input
            type={type}
            ref={ref}
            placeholder={placholderText}
            {...rest}
            className="ml-4 focus-visible:outline-none"
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
