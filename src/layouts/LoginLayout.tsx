import { Outlet } from "react-router-dom";

export function LoginLayout() {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}
