import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      {/* Glassmorphism Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-4">
            <Sparkles size={28} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Sign in to continue to HireFloww
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-500 text-xs font-bold rounded-xl text-center animate-shake">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                size={18}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="name@company.com"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                Password
              </label>
              <Link
                to="/forgot-password"
                size={12}
                className="text-[11px] font-bold text-indigo-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                size={18}
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500 font-medium">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-bold hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
