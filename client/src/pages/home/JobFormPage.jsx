import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobFormPage = () => {
  // Initial state values are now empty strings
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    jobRole: "",
    jobPackage: "",
    driveDate: "",
    status: "Applied", // Defaulting to the first option
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await axios.post("http://localhost:5000/api/jobs/create-job", formData);
      setMessage({ type: "success", text: "Job entry saved successfully!" });
      // Reset form after success
      setFormData({
        companyName: "",
        location: "",
        jobRole: "",
        jobPackage: "",
        driveDate: "",
        status: "Applied",
        notes: "",
      });

      navigate("/all-jobs");
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to submit. Check your connection.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-2.5 bg-white/40 border border-white/60 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white/80 focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400 backdrop-blur-sm shadow-sm";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-100 via-rose-100 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="p-8 pb-4 text-center">
          <div className="inline-block px-4 py-1.5 mb-3 bg-indigo-500/10 rounded-full text-indigo-600 text-xs font-bold uppercase tracking-widest">
            Career Portal
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">
            Add New Opportunity
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Company Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-600 ml-1">
                Company
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="e.g. TCS"
                value={formData.companyName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-600 ml-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Bangalore"
                value={formData.location}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            {/* Job Role */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-600 ml-1">
                Job Role
              </label>
              <input
                type="text"
                name="jobRole"
                placeholder="e.g. Developer"
                value={formData.jobRole}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            {/* Package */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-600 ml-1">
                Package
              </label>
              <input
                type="text"
                name="jobPackage"
                placeholder="Competitive / 12 LPA"
                value={formData.jobPackage}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-600 ml-1">
                Drive Date
              </label>
              <input
                // Starts as text to show the placeholder, switches to date on interaction
                type={formData.driveDate ? "date" : "text"}
                name="driveDate"
                value={formData.driveDate}
                placeholder="DD-MM-YYYY"
                onChange={handleChange}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!formData.driveDate) e.target.type = "text";
                }}
                // The placeholder-shown selector helps style the text specifically
                className={`${inputClasses} placeholder:text-gray-400 placeholder:font-semibold uppercase`}
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-600 ml-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-600 ml-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              rows="3"
              placeholder="Requirements, contact info, etc."
              value={formData.notes}
              onChange={handleChange}
              className={inputClasses}
            ></textarea>
          </div>

          {/* Success/Error Messaging */}
          {message.text && (
            <div
              className={`p-4 rounded-2xl text-center text-sm font-bold shadow-inner ${
                message.type === "success"
                  ? "bg-green-100/50 text-green-700"
                  : "bg-red-100/50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-95 ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-500 to-purple-600 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            }`}
          >
            {loading ? "Saving Data..." : "Save Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobFormPage;
