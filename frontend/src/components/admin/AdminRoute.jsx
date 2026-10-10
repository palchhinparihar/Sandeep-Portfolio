import { Route, Routes } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import AdminDashboard from "./AdminDashboard";

import ManageClients from "./clients/ManageClients";
import AddClient from "./clients/AddClient";
import EditClient from "./clients/EditClient";

import ManageExperiences from "./experiences/ManageExperiences";
import AddExperience from "./experiences/AddExperience";

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
          <Route path="experiences/add" element={<AddExperience />} />
          <Route path="experiences/edit/:id" element={<AddExperience />} />
        </Routes>
      </main>
    </>
  );
};

export default AdminRoute;