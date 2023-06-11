import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { DefaultLayout } from "./layouts/DefaultLayout";
import { LoginLayout } from "./layouts/LoginLayout";

import { PrivateRoutes } from "./helpers/PrivateRoutes";

export function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<h1>Account</h1>} />
        </Route>

        <Route path="/login/*" element={<LoginLayout />}>
          <Route index element={<Login />} />
          <Route path="create" element={<Register />} />
          <Route path="password/lost" element={<h1>/login/password/lost</h1>} />
          <Route
            path="password/reset"
            element={<h1>/login/password/reset</h1>}
          />
        </Route>
      </Route>
    </Routes>
  );
}
