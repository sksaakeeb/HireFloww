import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  ArrowLeft,
  MessageSquare,
  Link as LinkIcon,
  Trash2,
  Pencil,
  Loader2,
  Clock,
  Plus,
  Building2,
  MapPin,
} from "lucide-react";
import ConfirmDelete from "@/components/ConfirmDelete";

const InterviewDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // FIX: Re-enable the job details call so 'jobRes' is defined
        const [intRes, jobRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/interviews/${jobId}`,
            { withCredentials: true },
          ),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`, {
            withCredentials: true,
          }),
        ]);

        setInterviews(intRes.data);
        setJob(jobRes.data);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/interviews/${id}`,
        { withCredentials: true },
      );
      setInterviews((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete round");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* --- SECTION 1: HEADER --- */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 font-bold transition-all text-sm group cursor-pointer"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />{" "}
              Back
            </button>

            <div className="flex items-center gap-4">
              <div className="p-4 bg-white rounded-[1.5rem] shadow-sm border border-indigo-50 text-indigo-600">
                <Building2 size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-800 tracking-tight">
                  {job?.companyName || "Company"}{" "}
                  <span className="text-indigo-600">Journey</span>
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium mt-1">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {job?.jobRole}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {job?.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate(`/add-interview/${jobId}`)}
            className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all active:scale-95 text-xs tracking-widest uppercase cursor-pointer"
          >
            <Plus size={18} /> Log New Round
          </button>
        </div>

        {/* --- SECTION 2: TIMELINE --- */}
        {interviews.length > 0 ? (
          <div className="relative space-y-10 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-100 before:via-indigo-300 before:to-transparent">
            {interviews.map((round, idx) => (
              <div
                key={round._id}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center z-10 w-10 h-10 rounded-full border-4 border-white bg-indigo-600 text-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform group-hover:scale-125">
                  <span className="text-[10px] font-black">{idx + 1}</span>
                </div>

                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-[3rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-4 py-1 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                      {round.roundType}
                    </span>
                    <time className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-1">
                      <Calendar size={12} />{" "}
                      {new Date(round.date).toLocaleDateString("en-GB")}
                    </time>
                  </div>

                  <div className="bg-white/60 rounded-[2rem] p-6 border border-white/50 shadow-inner mb-6">
                    <p className="text-sm text-gray-600 leading-relaxed font-medium italic">
                      {round.feedback
                        ? `"${round.feedback}"`
                        : "No specific round notes recorded."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/40">
                    {round.assignment ? (
                      <a
                        href={round.assignment}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-black text-emerald-600 flex items-center gap-1 hover:underline"
                      >
                        <LinkIcon size={12} /> View Task
                      </a>
                    ) : (
                      <span />
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/edit-interview/${round._id}`)}
                        className="p-3 bg-white text-amber-500 rounded-xl border border-amber-100 hover:bg-amber-500 hover:text-white transition-all shadow-sm cursor-pointer"
                      >
                        <Pencil size={16} />
                      </button>
                      <ConfirmDelete onConfirm={() => handleDelete(round._id)}>
                        <button className="p-3 bg-rose-50 text-rose-500 rounded-xl border border-rose-100 hover:bg-rose-500 hover:text-white transition-all shadow-sm cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </ConfirmDelete>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/20 backdrop-blur-md rounded-[4rem] border-2 border-dashed border-white">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
              No rounds recorded yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewDetails;
