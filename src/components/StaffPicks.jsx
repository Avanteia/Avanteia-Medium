import { useState } from "react";

const StaffPicks = () => {
  const topics = [
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Blockchain Development",
    "Digital Marketing",
    "Artificial Intelligence",
    "Solidity",
  ];

  return (
    <aside className="w-full lg:w-20/15 p-4 bg-white rounded-lg shadow-md lg:sticky lg:top-20 space-y-6">
      {/* Who to Follow */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-4">Who to Follow</h3>
        <div className="flex items-start gap-4">
          <img 
            src="https://miro.medium.com/v2/da:true/resize:fill:176:176/0*F7etBqVyFA4YmuzZ" 
            alt="Avanteia Logo" 
            className="w-12 h-12 rounded-full" 
          />
          <div className="flex-1">
            <h4 className="text-gray-900 font-semibold">Avanteia Private Limited</h4>
            <p className="text-sm text-gray-500">2 Followers</p>
            <p className="text-xs text-gray-500 leading-tight">
              🏆 ISO Certified | Elevating Digital Excellence<br />
              🔒 Cybersecurity | Blockchain | Web Dev 🎓<br />
              Offering Accredited Online Courses & Certifications
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                Follow
              </button>
              <button className="p-2 border rounded-full hover:bg-gray-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Topics */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-4">Recommended Topics</h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-300 transition"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t pt-4 text-xs text-gray-500">
        <p className="space-x-2">
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">Status</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Careers</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </p>
      </div>
    </aside>
  );
};

export default StaffPicks;
