import ApiStatusCard from '../components/ApiStatusCard';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Your quest board will live here. For now, verify the stack is wired up.
        </p>
      </div>

      <ApiStatusCard />

      <section className="rounded-2xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-500">
        Quests, XP, levels, streaks and the shop will appear here in future steps.
      </section>
    </div>
  );
}
