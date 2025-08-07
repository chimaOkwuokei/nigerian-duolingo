import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp, LandingPage, LoginPage, LessonsPage, Dashboard, LessonDetail1, ProgressPage } from "./pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:lessonId" element={<LessonDetail1 />} />
        <Route path="/progress" element={<ProgressPage />} /> 
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;