export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold">
        MPLADS Monitoring Dashboard
      </h1>

      <p className="mt-3 text-slate-400">
        AI-powered monitoring and anomaly detection system
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">Total Projects</p>
          <h2 className="mt-2 text-3xl font-bold">6,000</h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">Flagged Projects</p>
          <h2 className="mt-2 text-3xl font-bold">247</h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">Critical</p>
          <h2 className="mt-2 text-3xl font-bold">3</h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">High Risk</p>
          <h2 className="mt-2 text-3xl font-bold">53</h2>
        </div>
      </div>
    </main>
  );
}