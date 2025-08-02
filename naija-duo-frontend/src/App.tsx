import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/sign-up/sign-up";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/auth/login"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;