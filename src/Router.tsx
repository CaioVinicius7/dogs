import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CreatePost } from "./pages/CreatePost";
import { NotFound } from "./pages/NotFound";
import { UserFeed } from "./pages/UserFeed";
import { PasswordLost } from "./pages/PasswordLost";
import { PasswordReset } from "./pages/PasswordReset";
import { UserProfile } from "./pages/UserProfile";
import { Post } from "./pages/Post";

const Stats = lazy(() => import("./pages/Stats"));

import { DefaultLayout } from "./layouts/DefaultLayout";
import { LoginLayout } from "./layouts/LoginLayout";
import { AccountLayout } from "./layouts/AccountLayout";

import { PrivateRoutes } from "./helpers/PrivateRoutes";

export function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<UserFeed />} />
            <Route
              path="stats"
              element={
                <Suspense fallback={<></>}>
                  <Stats />
                </Suspense>
              }
            />
            <Route path="post" element={<CreatePost />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginLayout />}>
          <Route index element={<Login />} />
          <Route path="create" element={<Register />} />
          <Route path="password/lost" element={<PasswordLost />} />
          <Route path="password/reset" element={<PasswordReset />} />
        </Route>
      </Route>
    </Routes>
  );
}
