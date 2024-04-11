const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  className,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`p-2 border-2 border-gray-200 hover:bg-gray-100 focus:border-primary-600 rounded outline-none transition-colors duration-150 ${className}`}
    />
  );
};

export default Input;
