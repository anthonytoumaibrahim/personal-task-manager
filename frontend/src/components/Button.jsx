import Spinner from "./Spinner";

const Button = ({
  type = "button",
  link = false,
  small = false,
  className = "",
  onClick = () => {},
  loading = false,
  disabled = false,
  color = "primary",
  fillType = "filled",
  icon: ButtonIcon,
  children,
}) => {
  const buttonClass = {
    primary: {
      filled:
        "bg-primary-600 hover:bg-primary-700 text-white border-transparent",
      outlined:
        "text-primary-600 border-primary-600 hover:bg-primary-600 hover:text-white",
    },
    error: {
      filled: "bg-rose-600 hover:bg-rose-700 text-white border-transparent",
      outlined:
        "text-rose-600 border-rose-600 hover:bg-rose-600 hover:text-white",
    },
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 ${
        link
          ? "link"
          : `${small ? 'px-2 py-1' : 'px-4 py-2'} rounded font-medium border-2 ${buttonClass[color][fillType]} transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed`
      } ${className}`}
      onClick={() => onClick()}
      disabled={loading ? true : disabled}
    >
      {loading ? (
        <Spinner light={true} className="w-6 mx-auto" />
      ) : (
        <>
          {ButtonIcon && <ButtonIcon />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
