import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  ArrowLeft,
  Search,
  Briefcase,
  Link as LinkIcon,
  Clock,
  Inbox,
  Trash2,
  Pencil,
  Building2,
} from "lucide-react";
import Loader from "../../components/Loader";
import ConfirmDelete from "../../components/ConfirmDelete";

const AllInterviewsPage = () => {
  // 1. Two separate states
  const [interviews, setInterviews] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 2. Separate Fetch for Interviews
  const fetchInterviews = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/interviews/all-interview`,
        { withCredentials: true },
      );
      setInterviews(
        Array.isArray(res.data) ? res.data : res.data.interviews || [],
      );
    } catch (err) {
      console.error("Interview Fetch Error:", err);
    }
  };

  // 3. Separate Fetch for Jobs (to get the names)
  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/all-jobs`,
        { withCredentials: true },
      );
      setJobs(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error("Jobs Fetch Error:", err);
    }
  };

  // Initial load
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([fetchInterviews(), fetchJobs()]);
      setLoading(false);
    };
    loadAllData();
  }, []);

  // 4. Helper function to find the name in the JSX
  const getCompanyName = (jobId) => {
    const job = jobs.find((j) => j._id === jobId);
    return job ? job.companyName : "Company Removed";
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/interviews/${id}`,
        { withCredentials: true },
      );
      setInterviews((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // Search logic needs to check the helper function
  const filteredInterviews = interviews.filter((item) => {
    const companyName = getCompanyName(item.jobId).toLowerCase();
    const roundType = (item.roundType || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return companyName.includes(search) || roundType.includes(search);
  });

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-slate-50 via-emerald-50 to-indigo-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-all mb-4"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <h1 className="text-4xl font-black text-gray-800 tracking-tighter">
              Interview <span className="text-emerald-600">History</span>
            </h1>
          </div>

          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search company or round..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white/60 border border-white/80 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none w-full md:w-80 backdrop-blur-sm transition-all"
            />
          </div>
        </div>

        {filteredInterviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredInterviews.map((item) => (
              <div
                key={item._id}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border-b-4 border-b-emerald-500/20 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      {/* CALL HELPER FUNCTION HERE */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <Building2 size={14} className="text-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                          {getCompanyName(item.jobId)}
                        </span>
                      </div>

                      <h3 className="font-black text-gray-800 text-lg uppercase leading-tight">
                        {item.roundType}
                      </h3>
                      <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase mt-1">
                        <Clock size={12} />{" "}
                        {new Date(item.date).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/job-details/${item.jobId}`)}
                    className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
                  >
                    <Briefcase size={16} />
                  </button>
                </div>

                <div className="p-4 bg-white/50 rounded-2xl border border-white/40 shadow-inner mb-4 flex-grow text-sm text-gray-600 italic">
                  {item.feedback || "No feedback recorded."}
                </div>

                <div className="flex items-center justify-between gap-3 mt-2">
                  {item.assignment ? (
                    <a
                      href={item.assignment}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[10px] font-black text-emerald-700 bg-emerald-100/50 px-4 py-2 rounded-xl uppercase"
                    >
                      <LinkIcon size={12} /> Assignment
                    </a>
                  ) : (
                    <div />
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/edit-interview/${item._id}`)}
                      className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"
                    >
                      <Pencil size={16} />
                    </button>
                    <ConfirmDelete
                      title="Delete Entry?"
                      onConfirm={() => handleDelete(item._id)}
                    >
                      <button className="p-2.5 bg-rose-50 text-rose-500 rounded-xl border border-rose-100">
                        <Trash2 size={16} />
                      </button>
                    </ConfirmDelete>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/20 rounded-[3rem] border-2 border-dashed border-gray-200">
            <Inbox size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold">No interviews found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInterviewsPage;
