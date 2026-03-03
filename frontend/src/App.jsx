import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyEditor from "./pages/SurveyEditor";
import SurveyResponse from "./pages/SurveyResponse";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
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
      </Routes>
    </BrowserRouter>
  )
}

export default App