import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  ArrowLeft,
  Search,
  ExternalLink,
  Clock,
  Inbox,
  Trash2,
  Pencil,
  Building2,
  Loader2,
  ChevronRight,
} from "lucide-react";

// Assuming these are your existing project components
import Loader from "../../components/Loader";
import ConfirmDelete from "../../components/ConfirmDelete";

const AllInterviewsPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  // 1. Fetch Interviews (Leveraging Populate from Backend)
  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/interviews/all-interview`,
        { withCredentials: true },
      );
      setInterviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  // 2. Refined Delete Logic
  const handleDelete = async (id) => {
    try {
      // Standardizing the delete call - check if your route is /interviews/:id
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/interviews/${id}`,
        { withCredentials: true },
      );

      // IMPORTANT: Update the interviews state, not jobs
      setInterviews((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(
        "Interview Delete failed:",
        error.response?.data || error.message,
      );
      alert("Failed to delete interview. Check console for details.");
    }
  };

  // 3. Search Logic (Directly accessing populated jobId)
  const filteredInterviews = interviews.filter((item) => {
    const company = item.jobId?.companyName?.toLowerCase() || "";
    const role = item.jobId?.jobRole?.toLowerCase() || "";
    const round = item.roundType?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return (
      company.includes(search) ||
      role.includes(search) ||
      round.includes(search)
    );
  });

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] from-slate-50 via-white to-blue-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 font-bold transition-all text-sm group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Dashboard
            </button>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Interview{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                Timeline
              </span>
            </h1>
          </div>

          <div className="relative group w-full lg:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by company or round..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/60 backdrop-blur-xl border border-white rounded-[1.5rem] shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium text-gray-700"
            />
          </div>
        </div>

        {/* Content Area */}
        {filteredInterviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredInterviews.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white/40 backdrop-blur-2xl border border-white/80 p-6 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col h-full border-t-4 border-t-indigo-500"
              >
                {/* Top Info */}
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={12} className="text-indigo-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        {item.jobId?.companyName || "Unknown"}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-800 leading-tight">
                      {item.roundType}
                    </h3>
                  </div>
                  <button
                    onClick={() => navigate(`/job/${item.jobId?._id}`)}
                    className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm"
                  >
                    <ExternalLink size={18} />
                  </button>
                </div>

                {/* Feedback Section */}
                <div className="grow bg-white/50 rounded-3xl p-5 border border-white/50 shadow-inner mb-6">
                  <p className="text-sm text-gray-600 font-medium italic leading-relaxed line-clamp-4">
                    {item.feedback
                      ? `"${item.feedback}"`
                      : "No specific round feedback available."}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="flex items-center justify-between pt-4 border-t border-white/40 mt-auto">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs bg-indigo-50 px-3 py-1.5 rounded-full">
                    <Calendar size={14} />
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/update-interview/${item._id}`)}
                      className="p-2.5 bg-white text-amber-500 rounded-xl border border-amber-100 hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                    >
                      <Pencil size={16} />
                    </button>

                    <ConfirmDelete
                      title="Delete Interview Round?"
                      description="Are you sure you want to remove this round from your history?"
                      onConfirm={() => handleDelete(item._id)} // Ensure item._id is correct
                    >
                      <button className="p-2.5 rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all duration-300">
                        <Trash2 size={18} />
                      </button>
                    </ConfirmDelete>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white/20 backdrop-blur-md rounded-[3.5rem] border-4 border-dashed border-white shadow-inner">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Inbox size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-400 font-black text-xl tracking-tight uppercase">
              History Empty
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Refine your search or add a new interview round.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInterviewsPage;
