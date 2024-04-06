import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  const { isAuthanticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthanticated) navigate("/");
  }, [isAuthanticated, navigate]);

  return isAuthanticated ? children : null;
}

export default ProtectedRoute;
