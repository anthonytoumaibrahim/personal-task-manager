import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      placeholder = "",
      onChange,
      onBlur,
      name,
      error = false,
      className,
    },
    ref
  ) => (
    <input
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      placeholder={placeholder}
      className={`p-2 border-2 border-gray-200 hover:bg-gray-100 focus:border-primary-600 rounded outline-none transition-colors duration-150 ${
        error ? "border-red-500 bg-red-50 placeholder:text-red-400" : ""
      } ${className}`}
    />
  )
);

export default Input;
