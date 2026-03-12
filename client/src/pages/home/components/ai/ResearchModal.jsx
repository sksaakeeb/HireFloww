import React from "react";
import { X, Globe, Cpu, MapPin, Sparkles } from "lucide-react";

import { useTypewriter } from "../../../../hooks/useTypewriter";

export default function ResearchModal({ data, onClose }) {
  if (!data) return null;

  const typedDescription = useTypewriter(data.description || "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/10 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 w-full max-w-2xl rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Simple Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 rounded-lg">
              <Sparkles size={16} className="text-indigo-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700 tracking-tight">
              Research Assistant
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Company Title */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
            {data.website && (
              <a
                href={data.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline mt-1 font-medium"
              >
                <Globe size={14} />
                {data.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>

          {/* Typewriter Description */}
          <div className="text-gray-600 leading-relaxed text-base font-normal">
            {typedDescription}
            <span className="inline-block w-1 h-4 bg-indigo-500 ml-1 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Tech Section */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <Cpu size={14} /> Technology
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {data.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Locations Section */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <MapPin size={14} /> Key Hubs
              </h4>
              <ul className="space-y-1.5">
                {data.branches?.map((branch, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-600 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    {branch}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
