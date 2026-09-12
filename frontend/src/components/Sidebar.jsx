import React from "react";

function GridIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="0" y="0" width="5.5" height="5.5" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="7.5" y="0" width="5.5" height="5.5" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="0" y="7.5" width="5.5" height="5.5" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="0.5" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="3.5" y1="4" x2="7.5" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="3.5" y1="6.5" x2="8.5" y2="6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="3.5" y1="9" x2="6.5" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function BarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="0" y="6" width="3" height="7" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="3" width="3" height="10" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="10" y="0" width="3" height="13" rx="1" fill="currentColor" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M1 2.5L4.5 1l4 2 3.5-1.5v9L8.5 12l-4-2-3.5 1.5V2.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <line x1="4.5" y1="1" x2="4.5" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="8.5" y1="3" x2="8.5" y2="12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <polyline
        points="0,10 4,6 7,8 13,2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="9,2 13,2 13,6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M1 12c0-3 2.5-5 5.5-5s5.5 2 5.5 5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M6.5 1v1.5M6.5 10.5V12M1 6.5h1.5M10.5 6.5H12M2.6 2.6l1 1M9.4 9.4l1 1M2.6 10.4l1-1M9.4 3.6l1-1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

const navItems = [
  { id: "dashboard", label: "Dashboard", Icon: GridIcon, page: "landing" },
  { id: "upload", label: "Resume analysis", Icon: DocIcon, page: "upload" },
  { id: "skills", label: "Skill gaps", Icon: BarIcon, page: "skills" },
  { id: "roadmap", label: "Career roadmap", Icon: MapIcon, page: "roadmap" },
  { id: "progress", label: "Progress", Icon: TrendIcon, page: "landing" },
];

const accountItems = [
  { id: "profile", label: "Profile & target role", Icon: PersonIcon },
  { id: "settings", label: "Settings", Icon: GearIcon },
];

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="w-44 flex-shrink-0 border-r border-gray-200 flex flex-col h-full bg-white">

      {/* Logo */}
      <div className="px-4 py-4 flex items-center gap-2">
        <div className="w-5 h-5 bg-red-600 rounded-sm flex-shrink-0" />

        <span className="text-sm font-semibold text-gray-900 leading-none">
          CareerPath AI
        </span>
      </div>

      {/* Main navigation */}
      <div className="px-2 mt-1">

        <p className="px-2 text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
          Main
        </p>

        {navItems.map(({ id, label, Icon, page }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              onClick={() => onNavigate(page)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left mb-0.5 transition-colors ${
                isActive
                  ? "bg-red-50 text-red-600 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Account navigation */}
      <div className="px-2 mt-4">

        <p className="px-2 text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
          Account
        </p>

        {accountItems.map(({ id, label, Icon }) => (
          <button
            key={id}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left mb-0.5 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Bottom section */}
      <div className="mt-auto border-t border-gray-100">

        <div className="p-3">

          {/* Target role */}
          <div className="bg-gray-50 rounded-lg p-2.5 mb-3">

            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
              Target Role
            </p>

            <p className="text-xs font-semibold text-gray-900">
              AI Engineer
            </p>

            <p className="text-[10px] text-gray-400 mt-2 mb-1">
              Readiness
            </p>

            <div className="flex items-center gap-1.5">

              <div className="flex-1 bg-gray-200 rounded-full h-1">
                <div
                  className="bg-red-600 h-1 rounded-full"
                  style={{ width: "68%" }}
                />
              </div>

              <span className="text-[10px] font-medium text-gray-700">
                68%
              </span>

            </div>
          </div>

          {/* User */}
          <div className="flex items-center gap-2">

            <div className="w-6 h-6 rounded-full bg-gray-700 text-white text-[9px] flex items-center justify-center font-bold flex-shrink-0">
              DM
            </div>

            <div className="min-w-0">

              <p className="text-xs font-medium text-gray-900 leading-none">
                Made by Durga Mishra
              </p>

              <p className="text-[10px] text-gray-400 mt-0.5">
                BCA · 2026
              </p>

            </div>
          </div>

        </div>
      </div>

    </aside>
  );
}