import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

import axios from "axios";

export default function Header() {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
        { withCredentials: true },
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full px-3 py-3 md:px-6 md:py-4">
      {/* Glassmorphic Container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-2 md:py-3 bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg">
        {/* Logo Section */}
        <div className="cursor-pointer flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-tr from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center shadow-md shrink-0">
            <span className="text-white font-black text-sm">H</span>
          </div>
          <p className="hidden sm:block text-xl font-black bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">
            HireFloww
          </p>
        </div>

        {/* Action Button - Responsive Text */}
        <Link
          to="/add-job"
          className="inline-flex items-center gap-2 
                     px-3 py-2 md:px-5 md:py-2.5
                     bg-transparent border border-white/40 
                     backdrop-blur-sm
                     text-gray-600 rounded-xl
                     text-[10px] md:text-[11px] font-black uppercase tracking-[0.12em]
                     hover:bg-white/20 hover:border-indigo-400 hover:text-indigo-600
                     transition-all duration-300 active:scale-95 group mx-2"
        >
          <PlusCircle
            size={18}
            className="md:size-4 group-hover:rotate-90 transition-transform duration-500"
          />
          <span className="hidden md:inline">Add Job</span>
          <span className="md:hidden">Add</span>{" "}
          {/* Shorter text for tablet, icon only for tiny */}
        </Link>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden lg:block text-right leading-tight">
            <p className="text-sm font-bold text-gray-800">
              {data?.fullName || "User"}
            </p>
            <p className="text-[10px] font-medium text-yellow-600 uppercase tracking-wider">
              {data?.email ? "Pro Member" : "Guest"}
            </p>
          </div>

          {/* User Logo Button */}
          <Link
            to="/profile"
            className="relative group block focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-linear-to-r from-indigo-100 to-purple-100 flex items-center justify-center shadow-sm overflow-hidden transition-transform group-hover:scale-105">
              {data?.profileImage ? (
                <img
                  src={data.profileImage}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-indigo-600 font-bold text-sm md:text-lg">
                  {data?.fullName?.charAt(0) || "U"}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
