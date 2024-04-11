import Spinner from "./Spinner";

const Button = ({
  type = "button",
  link = false,
  className,
  onClick = () => {},
  loading = false,
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      className={`${
        link
          ? "link"
          : "px-4 py-2 rounded font-medium bg-primary-600 hover:bg-primary-700 transition-colors duration-150 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      } ${className}`}
      onClick={() => onClick()}
      disabled={loading ? true : disabled}
    >
      {loading ? <Spinner light={true} className="w-6 mx-auto" /> : children}
    </button>
  );
};

export default Button;
