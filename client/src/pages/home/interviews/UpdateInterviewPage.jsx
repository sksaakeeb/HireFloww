import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, MessageSquare, ArrowLeft, Loader2, Save, Layout } from "lucide-react";

const UpdateInterview = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roundType: "",
    date: "",
    feedback: "",
    assignment: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // FETCH DATA TO PRE-FILL FORM
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        // NOTE: This uses your GET /:id or a specific single fetch route
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/interviews/single/${id}`, 
          { withCredentials: true }
        );
        
        const data = response.data;
        const formattedDate = data.date ? new Date(data.date).toISOString().split('T')[0] : "";

        setFormData({
          roundType: data.roundType || "",
          date: formattedDate,
          feedback: data.feedback || "",
          assignment: data.assignment || "",
        });
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInterview();
  }, [id]);

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      // FIX: Matches the new router.put("/:id")
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/interviews/${id}`,
        formData,
        { withCredentials: true }
      );
      navigate(-1); // Success! Go back
    } catch (err) {
      alert("Update failed. Check if the backend route is /:id");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-400 font-bold">
          <ArrowLeft size={18} /> Back
        </button>
        
        <h2 className="text-3xl font-black text-gray-800 mb-8">Edit Interview Round</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Round Name</label>
            <input 
              type="text" 
              value={formData.roundType} 
              onChange={(e) => setFormData({...formData, roundType: e.target.value})}
              className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700"
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Date</label>
            <input 
              type="date" 
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700"
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Feedback</label>
            <textarea 
              value={formData.feedback} 
              onChange={(e) => setFormData({...formData, feedback: e.target.value})}
              rows="4"
              className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            {updating ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {updating ? "Saving..." : "Update Round"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateInterview;