import { Route, Routes } from "react-router-dom";

import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoute;