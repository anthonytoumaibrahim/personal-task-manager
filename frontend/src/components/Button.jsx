const Button = ({ link = false, className, children }) => {
  return (
    <button
      className={`${
        link
          ? "link"
          : "px-4 py-2 rounded font-medium bg-primary-600 hover:bg-primary-700 transition-colors duration-150 text-white"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
