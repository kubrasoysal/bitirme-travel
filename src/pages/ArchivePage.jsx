import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ArchivePage({ onSelectPlan }) {
  const navigate = useNavigate();
  const [archive, setArchive] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(window.localStorage.getItem('planArchive') || '[]');
      setArchive(data);
    } catch {
      setArchive([]);
    }
  }, []);

  function openPlan(entry) {
    window.localStorage.setItem('planResponse', JSON.stringify(entry.plan));
    onSelectPlan?.(entry.plan);
    navigate('/itinerary');
  }

  function removePlan(id) {
    const next = archive.filter((item) => item.id !== id);
    setArchive(next);
    window.localStorage.setItem('planArchive', JSON.stringify(next));
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-up">
      <div className="mb-8">
        <span className="badge-brand mb-2">Kullanıcı Profili</span>
        <h1 className="font-display text-3xl font-bold text-navy-900">Geçmiş Seyahat Planları</h1>
        <p className="mt-2 text-slate-600">Oluşturduğunuz planlar yerel arşivde saklanır (Firebase/PostgreSQL entegrasyonuna hazır).</p>
      </div>

      {archive.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-4xl mb-4">🗂</p>
          <p className="text-slate-600">Henüz kayıtlı plan yok.</p>
          <button type="button" className="btn-primary mt-6" onClick={() => navigate('/plan')}>
            İlk Planını Oluştur
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {archive.map((entry) => (
            <div key={entry.id} className="glass-card flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="font-semibold text-navy-900">{entry.title}</p>
                <p className="text-sm text-slate-500">
                  {new Date(entry.date).toLocaleDateString('tr-TR')} · {entry.plan.summary?.price}
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-primary text-sm" onClick={() => openPlan(entry)}>Aç</button>
                <button type="button" className="btn-ghost text-sm text-red-600" onClick={() => removePlan(entry.id)}>Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
