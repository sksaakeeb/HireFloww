import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Ghost, Search } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-6">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="relative max-w-2xl w-full text-center space-y-8">
        {/* The 404 Visual */}
        <div className="relative">
          <h1 className="text-[12rem] md:text-[16rem] font-black text-white/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 shadow-2xl animate-bounce duration-[3000ms]">
              <Ghost
                size={80}
                className="text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-blue-300 tracking-tight">
            Whoops! This path is a{" "}
            <span className="text-indigo-400 underline decoration-indigo-500/30">
              dead end.
            </span>
          </h2>
          <p className="text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a
            different pipeline. Let's get you back to your applications.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95"
          >
            <ArrowLeft size={16} /> Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 hover:-translate-y-1 transition-all active:scale-95"
          >
            <Home size={16} /> Dashboard Home
          </button>
        </div>

        {/* Branding Subtext */}
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] pt-12">
          HireFloww System Error • 404
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
