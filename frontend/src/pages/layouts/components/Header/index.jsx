import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Components
import CustomNavLink from "./CustomNavLink";
import Button from "../../../../components/Button";

const Header = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({
      type: "userSlice/removeUser",
    });
  };

  return (
    <header className="bg-primary-50/50 border-b border-gray-200 py-4 px-10 flex items-center justify-between">
      <nav className="flex gap-4">
        <CustomNavLink to="/">Dashboard</CustomNavLink>
        <CustomNavLink to="/boards">My Boards</CustomNavLink>
      </nav>
      <Link to="/" onClick={logout}>
        <Button color="error">Log out</Button>
      </Link>
    </header>
  );
};

export default Header;
