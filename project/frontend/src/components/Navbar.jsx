export default function Navbar({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--line)] px-6 py-4 bg-[var(--paper-raised)]">
      <div>
        <h1 className="font-voice font-semibold text-xl text-[var(--ink)] m-0">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-[var(--muted)] mt-1">{subtitle}</p>
        )}
      </div>
      <div className="w-8 h-8 rounded-full bg-[var(--stamp-light)] flex items-center justify-center text-[var(--stamp)] text-xs font-medium">
        U
      </div>
    </header>
  );
}
