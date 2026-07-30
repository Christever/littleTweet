import GuestRoute from "@/components/Auth/GuestRoute";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import Loader from "@/components/common/Loader/Loader";
import MainLayout from "@/layouts/MainLayout";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("@/pages/Home/Home"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Register = lazy(() => import("@/pages/Register/Register"));
const Tweets = lazy(() => import("@/pages/Tweets/TweetsList"));
const NewTweet = lazy(() => import("@/pages/Tweets/NewTweet"));
const About = lazy(() => import("@/pages/About/About"));
const Test = lazy(() => import("@/pages/Test"));

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          element: (
            <GuestRoute>
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            </GuestRoute>
          ),
          index: true,
        },
        {
          path: "register",
          element: (
            <GuestRoute>
              <Suspense fallback={<Loader />}>
                <Register />
              </Suspense>
            </GuestRoute>
          ),
        },
        {
          path: "login",
          element: (
            <GuestRoute>
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            </GuestRoute>
          ),
        },
        {
          path: "tweets",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Tweets />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "new-tweet",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <NewTweet />
              </Suspense>
            </ProtectedRoute>
          ),
        },

        {
          path: "about",
          element: (
            <Suspense fallback={<Loader />}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "test",
          element: (
            <Suspense fallback={<Loader />}>
              <Test />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    basename: "/tweet",
  },
);
