import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to = "/", className = "", children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        `!no-underline ${
          isActive
            ? "font-medium text-primary-600 relative after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:bg-primary-600"
            : "text-black"
        } ${className}`
      }
      end
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
