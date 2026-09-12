import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Turn tasks into quests',
    description: 'Convert your to-dos into RPG quests and clear them for real rewards.',
  },
  {
    title: 'Earn XP & level up',
    description: 'A non-linear progression system that grows with you — no rigid grinds.',
  },
  {
    title: 'Streaks & attributes',
    description: 'Build daily streaks, raise character attributes and unlock themes.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <section className="flex flex-col items-center text-center">
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-indigo-300"
      >
        Life RPG · Foundation Build
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
      >
        Turn your real life into an RPG
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
        className="mt-4 max-w-xl text-base text-slate-400 sm:text-lg"
      >
        Levelora converts everyday tasks into quests — earn XP, climb levels, keep streaks alive and
        upgrade your character one real-world win at a time.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24 }}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Link
          to="/dashboard"
          className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-400"
        >
          Open Dashboard
        </Link>
        <span className="text-xs text-slate-500">Quests, XP and the shop land in upcoming sprints</span>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-16 grid w-full gap-4 sm:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.article
            key={feature.title}
            variants={item}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-left"
          >
            <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
            <span className="mt-4 inline-block rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Planned
            </span>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
