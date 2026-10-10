import { Route, Routes } from "react-router-dom";

import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import ManageClients from "./clients/ManageClients";
import AddClient from "./clients/AddClient";
import EditClient from "./clients/EditClient";
import AdminNavbar from "./AdminNavbar";
import ManageExperiences from "./experiences/ManageExperiences";

const AdminRoute = () => {
  return (
    <>
      <AdminNavbar />

      <main className="min-h-screen">
        <Routes>
          <Route index element={<AdminDashboard />} />

          {/* Clients */}
          <Route path="clients" element={<ManageClients />} />
          <Route path="clients/add" element={<AddClient />} />
          <Route path="clients/edit/:id" element={<EditClient />} />

          {/* Experiences */}
          <Route path="experiences" element={<ManageExperiences />} />
        </Routes>
      </main>
    </>
  );
};

export default AdminRoute;