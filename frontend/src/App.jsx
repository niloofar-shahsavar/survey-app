import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyEditor from "./pages/SurveyEditor";
import SurveyResponse from "./pages/SurveyResponse";

import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Results from "./pages/Results";
import { ThemeProvider } from "./context/ThemeContext";
import Statistics from "./pages/Statistics";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateSurvey />} />
          <Route path="/editor/:surveyId" element={<SurveyEditor />} />
          <Route path="/survey/:surveyId" element={<SurveyResponse />} />
          <Route path="/results/:surveyId" element={<Results />} />
          <Route path="statistics/:surveyId" element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
