import { Briefcase, Users, CheckCircle, XCircle, Activity } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Loader from "@/components/shared/Loader";

const DashboardStats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalInterviews: 0,
    offers: 0,
    rejected: 0,
    active: 0,
  });

  const navigate = useNavigate();

  const cards = [
    {
      label: "Total Jobs",
      value: stats.totalJobs,
      icon: <Briefcase size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      path: "/all-jobs",
    },
    {
      label: "Interviews",
      value: stats.totalInterviews,
      icon: <Users size={20} />,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
      path: "/all-interviews",
    },
    {
      label: "Active",
      value: stats.active,
      icon: <Activity size={20} />,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
      path: "/active",
    },
    {
      label: "Offers",
      value: stats.offers,
      icon: <CheckCircle size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      path: "/all-interviews",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: <XCircle size={20} />,
      color: "text-rose-600",
      bg: "bg-rose-500/10",
      path: "/all-interviews",
    },
  ];

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/dashboard/stats`,
        {
          withCredentials: true,
        },
      );

      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-6 m-6">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => navigate(card.path)}
          className="cursor-pointer relative overflow-hidden bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group"
        >
          {/* Subtle Background Glow */}
          <div
            className={`absolute -right-2 -top-2 w-16 h-16 rounded-full blur-2xl opacity-20 ${card.bg}`}
          ></div>

          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${card.bg} ${card.color}`}>
              {card.icon}
            </div>
          </div>

          <div>
            <h3 className="text-gray-600 text-xs font-bold uppercase tracking-wide">
              {card.label}
            </h3>
            <p className="text-2xl font-black text-gray-800 mt-1">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
