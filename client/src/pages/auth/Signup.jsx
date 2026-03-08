import { useState } from "react";
import {
  Lock,
  Mail,
  User,
  ChevronRight,
  Globe,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { signup, isLoading, error: storeError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      await signup(name, email, password);
      navigate("/dashboard"); // Or wherever your flow leads
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        "Could not create account. Please try again.";
      setLocalError(errMsg);
    }
  };

  const displayError = localError || storeError;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="relative w-full max-w-5xl bg-white/60 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        {/* --- LEFT COLUMN --- */}
        <div className="hidden md:flex md:w-[42%] p-12 flex-col justify-between bg-white/20 border-r border-white/40">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Globe className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-slate-800 uppercase">
                NEXUS.
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold text-slate-800 leading-[1.1] tracking-tight">
                Join the <span className="text-blue-600">Evolution</span>.
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                Unlock full access to our precision tools and start scaling your
                productivity today.
              </p>

              {/* Feature List */}
              <ul className="space-y-3 pt-4">
                {[
                  "Enterprise-grade security",
                  "Real-time collaboration",
                  "Custom workflows",
                ].map((text) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 text-slate-600 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-6 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="w-full md:w-[58%] flex items-center justify-center p-8 lg:p-20">
          <div className="w-full max-w-sm">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                Create Account
              </h2>
              <p className="text-slate-500 mt-2">
                Join thousands of professionals worldwide
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (localError) setLocalError("");
                    }}
                    className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (localError) setLocalError("");
                    }}
                    className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Error Message */}
              {displayError && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 p-4 rounded-2xl animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <p className="text-sm font-semibold text-red-700">
                    {displayError}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Get Started <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Back to Login Section */}
            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-bold hover:underline underline-offset-4"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-shake { animation: shake 0.4s ease-in-out; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default Signup;
