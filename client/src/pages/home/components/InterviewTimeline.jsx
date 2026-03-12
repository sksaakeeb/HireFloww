import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  Link as LinkIcon,
  MessageSquare,
  Loader2,
  Trash2,
} from "lucide-react";
import axios from "axios";

import ConfirmDelete from "../../../components/shared/ConfirmDelete";

const InterviewTimeline = () => {
  const { id } = useParams(); // Job ID
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/interviews/${id}`,
        { withCredentials: true },
      );
      setInterviews(
        Array.isArray(response.data) ? response.data : [response.data],
      );
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (interviewId) => {
    setDeletingId(interviewId);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/interviews/${interviewId}`,
        { withCredentials: true },
      );

      setInterviews((prev) => prev.filter((item) => item._id !== interviewId));
    } catch (error) {
      console.error(
        "Interview Delete failed:",
        error.response?.data || error.message,
      );
      alert("Failed to delete interview. Check console for details.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center">
        <Loader2 className="animate-spin mx-auto text-indigo-500" size={32} />
      </div>
    );

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/40 p-8 rounded-[3rem] shadow-xl">
      <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
        Interview Rounds{" "}
        <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-lg">
          {interviews.length}
        </span>
      </h2>

      {interviews.length > 0 ? (
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-indigo-200 before:to-transparent">
          {interviews.map((item) => (
            <div
              key={item._id}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center z-10 w-10 h-10 rounded-full border-4 border-white bg-indigo-500 text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform group-hover:scale-110">
                <Calendar size={16} />
              </div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-[2rem] bg-white/60 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-indigo-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <time className="text-xs font-black text-indigo-600 uppercase tracking-widest">
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </time>
                  <span className="px-3 py-1 bg-indigo-50 rounded-full text-[10px] font-black text-indigo-600 border border-indigo-100 uppercase tracking-tighter">
                    {item.roundType}
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-5 font-medium italic">
                  "{item.feedback || "No feedback recorded for this round."}"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-100/50">
                  <div className="flex flex-wrap gap-2">
                    {item.assignment && (
                      <a
                        href={item.assignment}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-100 bg-emerald-50 px-3 py-2 rounded-xl transition-all"
                      >
                        <LinkIcon size={12} /> Task
                      </a>
                    )}

                    {/* <button
                      onClick={() => navigate(`/interview/${item._id}`)}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 bg-white border border-indigo-100 px-3 py-2 rounded-xl transition-all"
                    >
                      <Eye size={12} /> Details
                    </button> */}
                  </div>

                  <ConfirmDelete
                    title="Delete Interview Round?"
                    description="This action cannot be undone."
                    onConfirm={() => handleDelete(item._id)}
                  >
                    <button
                      disabled={deletingId === item._id}
                      className="cursor-pointer p-2.5 rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center min-w-11"
                    >
                      {deletingId === item._id ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </ConfirmDelete>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/10 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <MessageSquare className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-gray-400 font-bold italic">
            Your interview journey hasn't started yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewTimeline;
