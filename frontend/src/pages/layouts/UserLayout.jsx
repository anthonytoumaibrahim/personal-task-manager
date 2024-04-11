import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <header className="">
        
      </header>

      <main className="container mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
