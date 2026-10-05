import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Toastify from "./components/common/Toastify";
import Login from "./components/admin/Login";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminRoute from "./components/admin/AdminRoute";
import PublicRoute from "./components/PublicRoute";

import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <BrowserRouter>
      <Toastify />

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoute />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="*" element={<PublicRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;