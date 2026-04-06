import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyEditor from "./pages/SurveyEditor";
import SurveyResponse from "./pages/SurveyResponse";
import Results from "./pages/Results";
import Statistics from "./pages/Statistics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactUs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "create", element: <CreateSurvey /> },
      { path: "editor/:surveyId", element: <SurveyEditor /> },
      { path: "survey/:surveyId", element: <SurveyResponse /> },
      { path: "results/:surveyId", element: <Results /> },
      { path: "statistics/:surveyId", element: <Statistics /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
