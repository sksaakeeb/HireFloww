import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

import Loader from "../components/Loader";

import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

import DashboardPage from "../pages/home/DashboardPage";
import UserProfilePage from "../pages/home/UserProfilePage";

import AllJobsPage from "@/pages/home/AllJobsPage";
import JobFormPage from "../pages/home/JobFormPage";
import JobDetailsPage from "../pages/home/JobDetailsPage";
import UpdateJobPage from "@/pages/home/UpdateJobPage";

import AllInterviewPage from "@/pages/home/AllInterviewPage";
import InterviewFormPage from "@/pages/home/InterviewFormPage";
import InterviewDetailsPage from "@/pages/home/InterviewDetailsPage";
import UpdateInterviewPage from "@/pages/home/UpdateInterviewPage";

// ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// RedirectAuthenticatedUser
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function AppRouter() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>
          <Loader />
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-job"
          element={
            <ProtectedRoute>
              <JobFormPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-jobs"
          element={
            <ProtectedRoute>
              <AllJobsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job/:id"
          element={
            <ProtectedRoute>
              <JobDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-job/:id"
          element={
            <ProtectedRoute>
              <UpdateJobPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-interview/:jobId"
          element={
            <ProtectedRoute>
              <InterviewFormPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-interviews"
          element={
            <ProtectedRoute>
              <AllInterviewPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview/:id"
          element={
            <ProtectedRoute>
              <InterviewDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-interview/:jobId"
          element={
            <ProtectedRoute>
              <UpdateInterviewPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
