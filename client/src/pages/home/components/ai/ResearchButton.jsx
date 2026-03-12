import React, { useState } from "react";
import axios from "axios";
import { Sparkles, Loader2 } from "lucide-react";

export default function ResearchButton({ companyName, onDataReceived }) {
  const [isSearching, setIsSearching] = useState(false);

  const handleResearch = async (e) => {
    e.stopPropagation(); // Stops the click from bubbling up
    if (!companyName) return;

    setIsSearching(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/companies/search/${companyName}`,
        { withCredentials: true },
      );
      if (onDataReceived) onDataReceived(res.data);
    } catch (err) {
      console.error("AI Research failed", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <button
      onClick={handleResearch}
      disabled={isSearching}
      className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-[11px] font-black uppercase tracking-wider rounded-xl hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
    >
      {isSearching ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Sparkles size={14} />
      )}
      {isSearching ? "Searching..." : "Research"}
    </button>
  );
}
