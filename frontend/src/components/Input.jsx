import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      as = "input",
      placeholder = "",
      onChange,
      onBlur,
      name,
      error = false,
      className = "",
      resize = false,
    },
    ref
  ) => {
    const InputElement = as === "textarea" ? "textarea" : "input";

    return (
      <InputElement
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        className={`p-2 border-2 border-gray-200 hover:bg-gray-100 focus:border-primary-600 rounded outline-none transition-colors duration-150 ${
          !resize ? "resize-none" : ""
        } ${
          error ? "border-rose-500 bg-rose-50 placeholder:text-rose-400" : ""
        } ${className}`}
      />
    );
  }
);

export default Input;
