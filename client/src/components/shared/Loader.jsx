import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex items-center space-x-2">
        {/* Bar 1 */}
        <div className="w-1.5 h-8 bg-blue-500 rounded-full animate-[pulse_1s_ease-in-out_infinite] [animation-delay:-0.3s]"></div>
        {/* Bar 2 */}
        <div className="w-1.5 h-8 bg-blue-500 rounded-full animate-[pulse_1s_ease-in-out_infinite] [animation-delay:-0.15s]"></div>
        {/* Bar 3 */}
        <div className="w-1.5 h-8 bg-blue-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
      </div>

      <p className="mt-6 text-sm font-semibold text-gray-400 uppercase tracking-[0.2em]">
        Loading
      </p>
    </div>
  );
};

export default Loader;
