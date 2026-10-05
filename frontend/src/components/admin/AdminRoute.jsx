import { Route, Routes } from "react-router-dom";

import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import ManageClients from "./clients/ManageClients";
import AddClient from "./clients/AddClient";
import EditClient from "./clients/EditClient";
import AdminNavbar from "./AdminNavbar";

const AdminRoute = () => {
  return (
    <>
      <AdminNavbar />

      <main className="min-h-screen">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="clients" element={<ManageClients />} />
          <Route path="clients/add" element={<AddClient />} />
          <Route path="clients/edit/:id" element={<EditClient />} />
        </Routes>
      </main>
    </>
  );
};

export default AdminRoute;