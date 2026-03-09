import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Building2,
  MapPin,
  Briefcase,
  IndianRupee,
  Calendar,
  ClipboardList,
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    jobRole: "",
    jobPackage: "",
    driveDate: "",
    status: "Applied",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // 1. Fetch existing job data to pre-fill the form
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`,
          { withCredentials: true },
        );
        const data = response.data;

        // Format date to YYYY-MM-DD for the HTML5 date input
        const formattedDate = data.driveDate
          ? new Date(data.driveDate).toISOString().split("T")[0]
          : "";

        setFormData({
          companyName: data.companyName || "",
          location: data.location || "",
          jobRole: data.jobRole || "",
          jobPackage: data.jobPackage || "",
          driveDate: formattedDate,
          status: data.status || "Applied",
          notes: data.notes || "",
        });
      } catch (err) {
        setError("Failed to load job details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Handle the PUT request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`,
        formData,
        { withCredentials: true },
      );
      // Redirect back to details page on success
      navigate(`/job/${id}`);
    } catch (err) {
      setError("Failed to update job. Please try again.");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const inputClasses =
    "w-full pl-11 pr-4 py-3 bg-white/50 border border-white/60 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-400 transition-all font-semibold text-gray-700 placeholder-gray-400 shadow-sm";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-rose-50 to-indigo-50 p-6 md:p-12 flex flex-col items-center">
      {/* Navigation Header */}
      <div className="w-full max-w-3xl mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-all"
        >
          <ArrowLeft size={20} /> Cancel Edit
        </button>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight italic">
          Update Entry
        </h2>
      </div>

      <div className="w-full max-w-3xl bg-white/30 backdrop-blur-2xl border border-white/60 p-8 md:p-12 rounded-[3rem] shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Company
              </label>
              <div className="relative">
                <Building2
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/60"
                  size={18}
                />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Location
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/60"
                  size={18}
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Role
              </label>
              <div className="relative">
                <Briefcase
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/60"
                  size={18}
                />
                <input
                  type="text"
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Package */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Package
              </label>
              <div className="relative">
                <IndianRupee
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/60"
                  size={18}
                />
                <input
                  type="text"
                  name="jobPackage"
                  value={formData.jobPackage}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Drive Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/60"
                  size={18}
                />
                <input
                  type="date"
                  name="driveDate"
                  value={formData.driveDate}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Status
              </label>
              <div className="relative">
                <ClipboardList
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/60"
                  size={18}
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`${inputClasses} appearance-none`}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
              Notes
            </label>
            <textarea
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-white/50 border border-white/60 rounded-3xl outline-none focus:ring-2 focus:ring-indigo-400 transition-all font-semibold text-gray-700 shadow-sm"
            ></textarea>
          </div>

          {error && (
            <p className="text-rose-500 text-sm font-bold text-center">
              {error}
            </p>
          )}

          {/* Update Button */}
          <button
            type="submit"
            disabled={updating}
            className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black shadow-xl shadow-indigo-100 hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            {updating ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {updating ? "Saving Changes..." : "Update Job Record"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
