import { Link } from "react-router-dom";
import { FaArrowRight, FaComments, FaUsers } from "react-icons/fa6";

const AdminDashboard = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] px-4 py-10 text-white sm:px-6 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 border-b border-blue-400/15 pb-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-400">
            Portfolio control center
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Manage your portfolio content from here.
          </p>
        </div>

        {/* Management Sections */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Clients */}
          <Link
            to="/admin/clients"
            className="group rounded-2xl border border-blue-400/20 bg-[#07111f]/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-[0_24px_80px_rgba(37,99,235,0.18)] focus:outline-none focus:ring-2 focus:ring-blue-400/40 sm:p-8"
          >
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-lg font-bold text-blue-400">
              <FaUsers aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Clients
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Add, edit, or remove client names displayed on the portfolio.
            </p>

            <span className="mt-6 inline-block text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
              Manage Clients <FaArrowRight className="ml-1 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>

          {/* Testimonials */}
          <Link
            to="/admin/testimonials"
            className="group rounded-2xl border border-blue-400/20 bg-[#07111f]/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-[0_24px_80px_rgba(37,99,235,0.18)] focus:outline-none focus:ring-2 focus:ring-blue-400/40 sm:p-8"
          >
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-lg font-bold text-blue-400">
              <FaComments aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Testimonials
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Manage client testimonials, company names, and feedback.
            </p>

            <span className="mt-6 inline-block text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
              Manage Testimonials <FaArrowRight className="ml-1 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;