import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const UserLayout = () => {
  return (
    <>
      <Header />

      <main className="container mx-auto mt-6">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
