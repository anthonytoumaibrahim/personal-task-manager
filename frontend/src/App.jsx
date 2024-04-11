import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<>Hello world</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
