import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Components
import Logo from "../../../../components/Logo";
import CustomNavLink from "./CustomNavLink";
import Button from "../../../../components/Button";

import { FaPowerOff } from "react-icons/fa6";

const Header = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({
      type: "userSlice/removeUser",
    });
  };

  return (
    <header className="bg-primary-50/50 border-b border-gray-200 py-4 px-10 flex items-center">
      <Logo className="w-24 md:w-32 mr-4" />
      <nav className="flex gap-4 items-center">
        <CustomNavLink to="/boards">My Boards</CustomNavLink>
      </nav>
      <Link to="/" onClick={logout} className="ml-auto">
        <FaPowerOff size={24} className="block md:hidden text-rose-600" />
        <Button color="error" className="hidden md:block">
          Log out
        </Button>
      </Link>
    </header>
  );
};

export default Header;
