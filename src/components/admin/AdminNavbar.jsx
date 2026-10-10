import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiBriefcase,
  FiUsers,
  FiMessageSquare,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: FiGrid,
    },
    {
      name: "Experiences",
      path: "/admin/experiences",
      icon: FiBriefcase,
    },
    {
      name: "Clients",
      path: "/admin/clients",
      icon: FiUsers,
    },
    {
      name: "Testimonials",
      path: "/admin/testimonials",
      icon: FiMessageSquare,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-400/15 bg-[#020813]/80 text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/admin"
          className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-blue-300"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-sm text-blue-400">
            S
          </span>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Sandeep</p>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border border-blue-400/20 bg-blue-500/10 text-blue-300"
                    : "text-slate-400 hover:bg-blue-500/10 hover:text-blue-300"
                }`
              }
            >
              <Icon size={17} />
              {name}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="hidden cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-red-400/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/40 md:flex"
          title="Logout"
        >
          <FiLogOut size={17} />
          Logout
        </button>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg p-2 text-slate-300 transition hover:bg-blue-500/10 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/40 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX size={21} /> : <FiMenu size={21} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-blue-400/15 bg-[#07111f]/95 px-4 py-3 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/admin"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "border border-blue-400/20 bg-blue-500/10 text-blue-300"
                      : "text-slate-400 hover:bg-blue-500/10 hover:text-blue-300"
                  }`
                }
              >
                <Icon size={18} />
                {name}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-300 transition hover:bg-red-400/10 focus:outline-none focus:ring-2 focus:ring-red-400/40"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;