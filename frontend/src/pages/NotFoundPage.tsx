import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <p className="text-6xl font-extrabold text-indigo-400">404</p>
      <h1 className="mt-4 text-xl font-bold text-white">This page wandered off the map</h1>
      <p className="mt-2 text-sm text-slate-400">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-indigo-500/50 hover:text-indigo-300"
      >
        Back to home
      </Link>
    </div>
  );
}
