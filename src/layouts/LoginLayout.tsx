import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

export function LoginLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="container">
      <Outlet />
    </div>
  );
}
