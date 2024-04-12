import { useSelector } from "react-redux";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import UserLayout from "./pages/layouts/UserLayout";

// Pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import MyBoards from "./pages/MyBoards";
import Board from "./pages/Board";

const App = () => {
  const tokenSelector = useSelector((state) => state.userSlice.token);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        className="z-50"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {tokenSelector ? (
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="boards" element={<MyBoards />} />
            <Route path="boards/:id" element={<Board />} />
          </Route>
        ) : (
          <Route index element={<Landing />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
