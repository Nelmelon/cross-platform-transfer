import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ThemedContainer from "./components/ThemedContainer";
import { useAuth } from "./contexts/AuthContext";

function RootRedirect() {
  const { currentUser } = useAuth();
  return <Navigate to={currentUser ? "/dashboard" : "/login"} replace />;
}

export default function App() {
  return (
    <ThemedContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
        </Routes>
      </BrowserRouter>
    </ThemedContainer>
  );
}
