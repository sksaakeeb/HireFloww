import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react"; // Swapped for a cleaner, more modern icon
import AllJobs from "./components/AllJobs";

function AllJobsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent">
      {/* Responsive Container - matches your AllJobs max-width */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        {/* Modern Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 px-3 py-1.5 
                     bg-white/20 backdrop-blur-md border border-white/50 
                     text-gray-600 rounded-xl shadow-sm
                     hover:bg-white/40 hover:text-indigo-600 
                     transition-all duration-300 active:scale-95"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-xs font-bold uppercase tracking-widest">
            Back
          </span>
        </button>
      </div>

      {/* Main Content */}
      <AllJobs />
    </div>
  );
}

export default AllJobsPage;
