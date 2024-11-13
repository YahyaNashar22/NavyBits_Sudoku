import { useNavigate } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      // Prevents default back action
      event.preventDefault();
      // Redirects to the home page
      navigate("/");
    };

    // Attach listener to popstate event
    window.addEventListener("popstate", handleBackButton);

    // Cleanup on component unmount
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [navigate]);
  return <AppRoutes />;
}

export default App;
