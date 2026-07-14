import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/generator", label: "Generator" },
  { to: "/history", label: "History" },
  { to: "/saved-replies", label: "Saved replies" },
];

export default function Sidebar() {
  return (
    <aside className="w-[220px] shrink-0 bg-[var(--paper-raised)] border-r border-[var(--line)] min-h-screen py-6 px-4 hidden md:block">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 rounded-full bg-[var(--wax)] flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-[#F3E4C8] fill-none stroke-[1.8]"
          >
            <path d="M3 6l9 6 9-6" />
            <rect x="3" y="5" width="18" height="14" rx="1.5" />
          </svg>
        </div>
        <span className="font-voice font-semibold text-[15px] text-[var(--ink)]">
          Reply, Drafted
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `text-sm px-3 py-2 rounded transition-colors ${
                isActive
                  ? "bg-[var(--stamp)] text-white"
                  : "text-[var(--ink-soft)] hover:bg-[var(--paper)]"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
