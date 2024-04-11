const Button = ({
  type = "button",
  link = false,
  className,
  onClick = () => {},
  children,
}) => {
  return (
    <button
      type={type}
      className={`${
        link
          ? "link"
          : "px-4 py-2 rounded font-medium bg-primary-600 hover:bg-primary-700 transition-colors duration-150 text-white"
      } ${className}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
