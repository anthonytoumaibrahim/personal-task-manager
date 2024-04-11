// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
