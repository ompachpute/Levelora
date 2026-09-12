import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard', end: false },
];

/** Responsive app shell: sticky brand header, routed content, footer. */
export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-950 text-slate-200">
      <header className="border-b border-slate-800/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-sm font-bold text-indigo-400">
              L
            </span>
            <span className="text-lg font-bold tracking-tight text-white">Levelora</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-indigo-500/15 text-indigo-300' : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800/80">
        <div className="mx-auto w-full max-w-5xl px-4 py-4 text-center text-xs text-slate-500 sm:px-6">
          Levelora — level up your real life.
        </div>
      </footer>
    </div>
  );
}
