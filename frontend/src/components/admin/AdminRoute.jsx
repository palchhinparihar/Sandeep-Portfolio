import { Route, Routes } from "react-router-dom";

import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import ManageClients from "./clients/ManageClients";
import AddClient from "./clients/AddClient";
import EditClient from "./clients/EditClient";

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

      <Route
        path="/clients/edit/:id"
        element={
          <ProtectedRoute>
            <EditClient />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoute;