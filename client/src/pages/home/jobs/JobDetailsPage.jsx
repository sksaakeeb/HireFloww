import {
  Edit3,
  ArrowLeft,
  PlusCircle,
  Calendar,
  MessageSquare,
  Link as LinkIcon,
  Eye,
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Loader from "@/components/Loader";
import InterviewTimeline from "../components/InterviewTimeline";

export default function JobDetailsPage() {
  const [job, setJob] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [jobRes, interviewRes] = await Promise.allSettled([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`, {
          withCredentials: true,
        }),

        // Points to the NEW route we just created
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/interviews/job/${id}`, {
          withCredentials: true,
        }),
      ]);

      if (jobRes.status === "fulfilled") setJob(jobRes.value.data);

      if (interviewRes.status === "fulfilled") {
        setInterviews(interviewRes.value.data);
      } else {
        setInterviews([]); // Default to empty if no interviews exist yet
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <Loader />;

  if (!job)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
        <div className="bg-white p-10 rounded-[2rem] shadow-xl text-center">
          <h2 className="text-2xl font-black text-red-500 mb-4">
            Job Not Found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-50 via-rose-50 to-indigo-50 p-6 md:p-10 flex flex-col items-center">
      <button
        onClick={() => navigate("/")}
        className="self-start mb-6 flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-all"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="w-full max-w-3xl space-y-8">
        {/* Main Job Card */}
        <div className="bg-white/30 backdrop-blur-2xl border border-white/60 p-8 md:p-12 rounded-[3rem] shadow-2xl relative">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tighter">
                {job.companyName}
              </h1>
              <p className="text-indigo-600 font-black mt-2 uppercase tracking-[0.2em] text-sm">
                {job.jobRole}
              </p>
            </div>
            <div
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                job.status === "Offer"
                  ? "bg-green-100 text-green-600 border-green-200"
                  : "bg-indigo-100 text-indigo-600 border-indigo-200"
              }`}
            >
              {job.status}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Location
              </span>
              <p className="text-lg font-bold text-gray-700">{job.location}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Drive Date
              </span>
              <p className="text-lg font-bold text-gray-700">
                {job.driveDate
                  ? new Date(job.driveDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-10 p-6 bg-white/40 rounded-[2rem] border border-white/50 shadow-inner">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
              Professional Notes
            </h3>
            <p className="text-gray-600 leading-relaxed font-medium italic">
              {job.notes || "No additional notes provided."}
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/40">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigate(`/update-job/${id}`)}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-800 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95 w-full"
              >
                <Edit3 size={18} />
                <span>Edit Details</span>
              </button>

              <Link to={`/add-interview/${id}`} className="w-full">
                <button className="flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500/10 text-emerald-600 border border-emerald-200 rounded-2xl font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-sm active:scale-95 w-full">
                  <PlusCircle size={18} />
                  <span>Add Interview</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* --- INTERVIEW TIMELINE SECTION --- */}
        <InterviewTimeline />
      </div>
    </div>
  );
}
