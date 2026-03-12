import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Camera,
  Save,
  Loader2,
  CheckCircle,
  Edit3,
  X,
  LogOut,
  Trash2,
} from "lucide-react";
import axios from "axios";

import ConfirmDelete from "@/components/shared/ConfirmDelete";

export default function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profileImage: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
        { withCredentials: true },
      );
      setFormData(res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
      window.location.href = "/signup";
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("profilePic", file);

    setUpdating(true);
    setStatus(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/images/upload`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setFormData((prev) => ({ ...prev, profileImage: res.data.profileImage }));
      setStatus({ type: "success", msg: "Photo updated successfully!" });
    } catch (error) {
      setStatus({ type: "error", msg: "Failed to upload image." });
    } finally {
      setUpdating(false);
    }
  };

  const handleImageDelete = async () => {
    setUpdating(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/images/delete`, {
        withCredentials: true,
      });
      setFormData((prev) => ({ ...prev, profileImage: "" }));
      setStatus({ type: "success", msg: "Photo removed successfully!" });
    } catch (error) {
      setStatus({ type: "error", msg: "Failed to remove photo." });
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setStatus(null);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/update-profile`,
        { fullName: formData.fullName },
        { withCredentials: true },
      );
      setFormData(res.data);
      setStatus({ type: "success", msg: "Name updated successfully!" });
      setTimeout(() => setIsEditing(false), 1000);
    } catch (error) {
      setStatus({ type: "error", msg: "Update failed." });
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-indigo-50 via-white to-purple-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-800 tracking-tight">
              Account Settings
            </h1>
            <p className="text-gray-500 font-medium">
              Manage your identity and preferences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* 1. LOGOUT WITH CONFIRMATION */}
            <ConfirmDelete
              onConfirm={handleLogout}
              title="Logout from HireFloww?"
              description="Are you sure you want to end your session? You'll need to sign back in to access your vlogs."
            >
              <button className="flex items-center gap-2 px-5 py-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl font-bold hover:bg-rose-500 hover:text-white transition-all shadow-sm group">
                <LogOut
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Logout
              </button>
            </ConfirmDelete>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
              >
                <Edit3 size={18} /> Update Profile
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setStatus(null);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-500 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm"
              >
                <X size={18} /> Cancel
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Avatar Card */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row items-center gap-8 transition-all">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-linear-to-tr from-indigo-100 to-purple-100 flex items-center justify-center">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-black text-indigo-400">
                    {formData.fullName?.charAt(0) || "U"}
                  </span>
                )}
              </div>

              {/* IMAGE CONTROLS */}
              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 p-2.5 bg-indigo-600 text-white rounded-full shadow-lg border-2 border-white hover:bg-indigo-700 transition-all animate-in zoom-in"
                  >
                    <Camera size={18} />
                  </button>

                  {/* 2. IMAGE DELETE WITH CONFIRMATION */}
                  {formData.profileImage && (
                    <ConfirmDelete
                      onConfirm={handleImageDelete}
                      title="Remove Profile Photo"
                      description="This action cannot be undone. You will revert to a default avatar."
                    >
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 p-2 bg-rose-500 text-white rounded-full shadow-lg border-2 border-white hover:bg-rose-600 transition-all animate-in zoom-in"
                      >
                        <Trash2 size={14} />
                      </button>
                    </ConfirmDelete>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </>
              )}
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                {formData.fullName || "User Name"}
              </h2>
              <p className="text-gray-500 font-medium">{formData.email}</p>
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                <CheckCircle size={12} /> Verified Member
              </div>
            </div>
          </div>

          {/* Form Fields Section */}
          {isEditing && (
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
                      size={18}
                    />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 bg-white border border-indigo-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-400 transition-all font-bold text-gray-700 shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full pl-12 pr-4 py-3 bg-gray-100/50 border border-white/60 rounded-2xl cursor-not-allowed font-bold text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {status && (
                <div
                  className={`p-4 rounded-2xl text-center text-sm font-bold shadow-inner animate-in zoom-in-95 ${
                    status.type === "success"
                      ? "bg-green-100/50 text-green-700 border border-green-200"
                      : "bg-red-100/50 text-red-700 border border-red-200"
                  }`}
                >
                  {status.msg}
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={updating}
                  className="w-full md:w-auto px-10 py-4 bg-gray-800 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {updating ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Save size={20} />
                  )}
                  {updating ? "Processing..." : "Save Name"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
