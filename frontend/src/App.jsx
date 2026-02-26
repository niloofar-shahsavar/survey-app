import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyEditor from "./pages/SurveyEditor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateSurvey />} />
        <Route path="/survey-editor" element={<SurveyEditor />} />
        <Route path="/editor" element={<SurveyEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
