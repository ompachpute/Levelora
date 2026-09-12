import { motion } from 'framer-motion';
import { useHealthCheck } from '../hooks/useHealthCheck';

type PillTone = 'amber' | 'emerald' | 'rose';

const pillStyles: Record<PillTone, string> = {
  amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  rose: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
};

const dotStyles: Record<PillTone, string> = {
  amber: 'bg-amber-400 animate-pulse',
  emerald: 'bg-emerald-400',
  rose: 'bg-rose-400',
};

const statusLabel = {
  checking: 'Checking…',
  online: 'Connected',
  offline: 'Offline',
} as const;

function StatusRow({ label, value, danger = false }: { label: string; value: string; danger?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-xs uppercase tracking-wider text-slate-500">{label}</span>
      <span className={`text-right text-sm font-medium ${danger ? 'text-rose-300' : 'text-slate-200'}`}>{value}</span>
    </div>
  );
}

/** Live backend connection status driven by GET /api/health. */
export default function ApiStatusCard() {
  const { status, data, error, recheck } = useHealthCheck();
  const tone: PillTone = status === 'checking' ? 'amber' : status === 'online' ? 'emerald' : 'rose';

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">System status</h2>
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${pillStyles[tone]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[tone]}`} />
          {statusLabel[status]}
        </span>
      </div>

      <div className="mt-4 divide-y divide-slate-800/70">
        <StatusRow
          label="API"
          value={
            status === 'online'
              ? (data?.message ?? 'Life RPG API is running')
              : status === 'offline'
                ? (error ?? 'Unable to reach the API')
                : 'Requesting…'
          }
          danger={status === 'offline'}
        />
        {status === 'online' && data && (
          <>
            <StatusRow label="Environment" value={data.environment} />
            <StatusRow
              label="Database"
              value={data.database.connected ? 'PostgreSQL connected' : data.database.message}
              danger={!data.database.connected}
            />
            <StatusRow label="Uptime" value={`${data.uptimeSeconds}s`} />
          </>
        )}
      </div>

      <button
        type="button"
        onClick={recheck}
        className="mt-5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-indigo-500/50 hover:text-indigo-300"
      >
        Recheck connection
      </button>
    </motion.section>
  );
}
