import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./hooks/useTheme";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  // Use centralized theme hook
  const { theme, toggleTheme } = useTheme();

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1a1f3a",
              color: "#fff",
              border: "1px solid rgba(57, 255, 20, 0.3)",
            },
            success: {
              iconTheme: {
                primary: "#39FF14",
                secondary: "#1a1f3a",
              },
            },
            error: {
              iconTheme: {
                primary: "#FF10F0",
                secondary: "#1a1f3a",
              },
            },
          }}
        />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={<Home theme={theme} toggleTheme={toggleTheme} />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
