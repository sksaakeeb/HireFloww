import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  MessageSquare,
  BookOpen,
  Layers,
  Loader2,
  ChevronLeft,
} from "lucide-react";

const InterviewFormPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Initial value must be one of your Job Model enum values
    roundType: "Tech",
    date: "",
    feedback: "",
    assignment: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/interviews/create-interview/${jobId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setMessage({
        type: "success",
        text: "Interview saved & Job status updated!",
      });
      setTimeout(() => navigate(`/job/${jobId}`));
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Check if all required fields are filled.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-white/40 border border-white/60 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:bg-white/80 outline-none transition-all text-gray-800 placeholder-gray-400 backdrop-blur-sm shadow-sm";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-100 via-teal-50 to-cyan-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="p-8 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 p-2 hover:bg-white/50 rounded-full transition-all"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
              Add Interview
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Add interview details for this Job.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Round Type - STRICTLY MATCHING JOB ENUM */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-600 ml-1 flex items-center gap-2">
                <Layers size={14} />* Interview Phase
              </label>
              <select
                name="roundType"
                value={formData.roundType}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                {/* These values are case-sensitive to your Job Model enum */}
                <option value="HR">HR Round</option>
                <option value="Tech">Technical Round</option>
                <option value="Final">Final Round</option>
                <option value="Offer">Offer Stage</option>
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-600 ml-1 flex items-center gap-2">
                <Calendar size={14} />* Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>

          {/* Feedback */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-600 ml-1 flex items-center gap-2">
              <MessageSquare size={14} /> Questions & Feedback
            </label>
            <textarea
              name="feedback"
              rows="3"
              placeholder="What questions did they ask? How did it go?"
              value={formData.feedback}
              onChange={handleChange}
              className={inputClasses}
            ></textarea>
          </div>

          {/* Assignment */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-600 ml-1 flex items-center gap-2">
              <BookOpen size={14} /> Assignment Link
            </label>
            <input
              type="text"
              name="assignment"
              placeholder="GitHub repo or assignment link"
              value={formData.assignment}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {message.text && (
            <div
              className={`p-4 rounded-2xl text-center text-sm font-bold ${
                message.type === "success"
                  ? "bg-emerald-100/50 text-emerald-700"
                  : "bg-red-100/50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-300"
                : "bg-linear-to-r from-emerald-500 to-teal-600 hover:shadow-emerald-500/40"
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Save Interview Details"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewFormPage;
