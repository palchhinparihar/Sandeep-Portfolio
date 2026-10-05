import { Route, Routes } from "react-router-dom";

import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import ManageClients from "./clients/ManageClients";
import AddClient from "./clients/AddClient";

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

      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <ManageClients />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clients/add"
        element={
          <ProtectedRoute>
            <AddClient />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoute;