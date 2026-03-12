import {
  Building2,
  MapPin,
  ArrowUpRight,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import ConfirmDelete from "../../../components/shared/ConfirmDelete";
import ResearchButton from "./ai/ResearchButton";
import ResearchModal from "./ai/ResearchModal";

function AllJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanyData, setSelectedCompanyData] = useState(null);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`, {
        withCredentials: true,
      });
      setAllJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
      alert("Failed to delete the job application.");
    }
  };

  const getAllJobs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/all-jobs`,
        { withCredentials: true },
      );
      setAllJobs(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAIResult = (data) => {
    setSelectedCompanyData(data); // Triggers the Modal
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col gap-1">
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
          All Jobs
        </h2>
        <p className="text-sm text-gray-500 font-medium">
          Manage your job search journey
        </p>
      </div>

      {/* Render Modal if data exists */}
      {selectedCompanyData && (
        <ResearchModal
          data={selectedCompanyData}
          onClose={() => setSelectedCompanyData(null)}
        />
      )}

      {loading ? (
        <div className="bg-white/30 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-20 text-center shadow-2xl">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-600 font-bold text-sm tracking-widest uppercase">
            Fetching Data
          </p>
        </div>
      ) : allJobs.length > 0 ? (
        <div className="flex flex-col gap-3">
          {allJobs.map((job) => (
            <div
              key={job._id}
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/30 backdrop-blur-2xl border border-white/60 rounded-[2rem] shadow-xl hover:shadow-2xl hover:bg-white/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-50 to-white border border-indigo-100 flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform shrink-0">
                  <Building2 size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 text-lg tracking-tight leading-tight">
                    {job.companyName}
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin size={14} className="text-indigo-400" />
                      <span className="text-xs font-semibold italic">
                        {job.location}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-md">
                      {job.jobRole}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-white/10">
                <ResearchButton
                  companyName={job.companyName}
                  onDataReceived={handleAIResult}
                />
                <button
                  onClick={() => navigate(`/job/${job._id}`)}
                  className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-[11px] font-black uppercase tracking-wider shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
                >
                  View <ArrowUpRight size={14} />
                </button>
                <ConfirmDelete onConfirm={() => handleDelete(job._id)}>
                  <button className="cursor-pointer p-2.5 rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                </ConfirmDelete>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/30 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-2xl py-12 md:py-20 flex flex-col items-center justify-center gap-4 text-center border-dashed">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-300 mb-2">
            <Building2 size={40} strokeWidth={1.5} />
          </div>

          <div className="space-y-1">
            <p className="text-gray-400 font-medium text-sm italic">
              Your job list is currently empty.
            </p>
            <p className="text-gray-800 font-bold text-lg">
              Ready to start your next chapter?
            </p>
          </div>

          <Link
            to="/add-job"
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95 group"
          >
            <PlusCircle
              size={18}
              className="group-hover:rotate-90 transition-transform duration-500"
            />
            <span>Add Your First Job</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default AllJobs;
