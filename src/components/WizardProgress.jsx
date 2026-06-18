const STEPS = [
  { id: 1, title: 'AI İstek', subtitle: 'Doğal dil' },
  { id: 2, title: 'Destinasyon', subtitle: 'Şehir & tarih' },
  { id: 3, title: 'Bütçe', subtitle: 'Maliyet planı' },
  { id: 4, title: 'Tercihler', subtitle: 'Konaklama & ilgi' },
  { id: 5, title: 'Özet', subtitle: 'Plan oluştur' }
];

export default function WizardProgress({ currentStep }) {
  return (
    <div className="mb-8">
      <div className="hidden sm:flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const done = currentStep > step.id;
          const active = currentStep === step.id;
          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition ${
                    done
                      ? 'bg-brand-600 text-white'
                      : active
                        ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {done ? '✓' : step.id}
                </div>
                <p className={`mt-2 text-xs font-semibold ${active ? 'text-brand-700' : 'text-slate-500'}`}>
                  {step.title}
                </p>
                <p className="text-[10px] text-slate-400">{step.subtitle}</p>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 rounded ${done ? 'bg-brand-500' : 'bg-slate-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="sm:hidden glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-brand-700">
            Adım {currentStep}/{STEPS.length}
          </span>
          <span className="text-sm text-slate-600">{STEPS[currentStep - 1]?.title}</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-300"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export { STEPS };
