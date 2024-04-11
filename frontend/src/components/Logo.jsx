const Logo = ({ className = "" }) => {
  return (
    <h1
      className={`font-medium text-primary-600 uppercase text-2xl ${className}`}
    >
      Personal Task Manager
    </h1>
  );
};

export default Logo;
