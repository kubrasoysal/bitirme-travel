export default function BudgetDashboard({ budget }) {
  if (!budget) return null;

  const categories = [
    { key: 'flights', label: 'Uçuş & Ulaşım', color: 'bg-brand-500', icon: '✈' },
    { key: 'accommodation', label: 'Konaklama', color: 'bg-brand-700', icon: '🏨' },
    { key: 'food', label: 'Yeme-İçme', color: 'bg-accent-500', icon: '🍽' },
    { key: 'activities', label: 'Aktiviteler', color: 'bg-amber-600', icon: '🎭' }
  ];

  const totalSpent = budget.total || 0;
  const planned = budget.plannedBudget || totalSpent;
  const percentUsed = planned ? Math.min(100, Math.round((totalSpent / planned) * 100)) : 0;
  const isOver = totalSpent > planned;

  return (
    <div className="glass-card p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="section-title">Bütçe Yönetimi</h3>
          <p className="mt-1 text-sm text-slate-500">Planlanan vs. tahmini harcama dağılımı</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-navy-900">{budget.totalFormatted}</p>
          <p className={`text-sm font-medium ${isOver ? 'text-red-600' : 'text-brand-600'}`}>
            Planlanan: {budget.plannedFormatted} · %{percentUsed} kullanım
          </p>
        </div>
      </div>

      <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${isOver ? 'bg-red-500' : 'bg-gradient-to-r from-brand-500 to-brand-600'}`}
          style={{ width: `${percentUsed}%` }}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => {
          const amount = budget.breakdown[cat.key] || 0;
          const pct = totalSpent ? Math.round((amount / totalSpent) * 100) : 0;
          return (
            <div key={cat.key} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm font-medium text-slate-600">{cat.label}</span>
              </div>
              <p className="text-lg font-bold text-navy-900">{budget.breakdownFormatted[cat.key]}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-slate-200">
                  <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-slate-400">%{pct}</span>
              </div>
            </div>
          );
        })}
      </div>

      {budget.remaining !== undefined && (
        <div className={`mt-4 rounded-xl p-4 text-sm ${isOver ? 'bg-red-50 text-red-800' : 'bg-brand-50 text-brand-800'}`}>
          {isOver
            ? `⚠ Planlanan bütçeyi ${budget.overBudgetFormatted} aşıyor. Alternatif senaryolara bakın.`
            : `✓ Bütçe dahilinde — ${budget.remainingFormatted} tasarruf alanı var.`}
        </div>
      )}
    </div>
  );
}
