import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RouteMap from '../components/RouteMap.jsx';
import BudgetDashboard from '../components/BudgetDashboard.jsx';
import AutomationPanel from '../components/AutomationPanel.jsx';

export default function ItineraryPage({ savedPlan }) {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(savedPlan);
  const [email, setEmail] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailResult, setEmailResult] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('timeline');

  useEffect(() => {
    if (!plan) {
      const stored = window.localStorage.getItem('planResponse');
      if (stored) setPlan(JSON.parse(stored));
      else navigate('/plan');
    }
  }, [plan, navigate]);

  const summary = useMemo(() => plan?.summary, [plan]);

  async function downloadPdf() {
    setPdfLoading(true);
    try {
      const res = await axios.post('/api/pdf', { plan }, { responseType: 'blob' });

      if (res.data.type && res.data.type !== 'application/pdf') {
        const text = await res.data.text();
        const err = JSON.parse(text);
        alert(err.error || 'PDF oluşturulamadı.');
        return;
      }

      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `voyageai-plan-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'PDF indirilemedi. Backend çalışıyor mu kontrol edin.');
    } finally {
      setPdfLoading(false);
    }
  }

  async function sharePlan() {
    const text = `Seyahat planım: ${summary?.route?.join(' → ')} — ${summary?.price}`;
    if (navigator.share) {
      await navigator.share({ title: 'VoyageAI Plan', text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('Plan özeti panoya kopyalandı!');
    }
  }

  async function triggerEmail() {
    if (!email) {
      setEmailResult('E-posta adresi girin.');
      return;
    }
    setEmailSending(true);
    try {
      const res = await axios.post('/api/email', { email, plan });
      setEmailResult(res.data.message || res.data.status);
    } catch (err) {
      setEmailResult(err.response?.data?.error || 'Gönderilemedi.');
    } finally {
      setEmailSending(false);
    }
  }

  if (!plan) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
          <p className="mt-4 text-slate-500">Plan yükleniyor...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'timeline', label: 'Gün Gün Plan' },
    { id: 'map', label: 'Harita' },
    { id: 'budget', label: 'Bütçe' },
    { id: 'automation', label: 'Otomasyon' }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-up">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="badge-brand mb-2">Plan Hazır</span>
          <h1 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">Seyahat Rotanız</h1>
          <p className="mt-2 text-slate-600">
            {summary?.route?.join(' → ')} · {summary?.duration} gün · {summary?.cityCount} şehir
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary text-sm" onClick={downloadPdf} disabled={pdfLoading}>
            {pdfLoading ? 'PDF Hazırlanıyor...' : '📄 PDF İndir'}
          </button>
          <button type="button" className="btn-secondary text-sm" onClick={sharePlan}>🔗 Paylaş</button>
          <button type="button" className="btn-ghost text-sm" onClick={() => navigate('/plan')}>✎ Düzenle</button>
          <button type="button" className="btn-ghost text-sm" onClick={() => navigate('/plan')}>+ Yeni Plan</button>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Toplam Süre', value: `${summary?.duration} gün`, icon: '📅' },
          { label: 'Bütçe Seviyesi', value: summary?.budgetLabel, icon: '💰' },
          { label: 'Tahmini Maliyet', value: summary?.price, icon: '🧾' },
          { label: 'Optimizasyon', value: 'TSP · En Yakın Komşu', icon: '🗺' }
        ].map((stat) => (
          <div key={stat.label} className="glass-card flex items-center gap-4 p-5">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className="font-bold text-navy-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {plan.meta && (
        <div className="glass-card mb-8 border-brand-200 bg-brand-50/40 p-5">
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="badge-brand">{plan.meta.season}</span>
            <span className="badge-navy">{plan.input.startDate} → {plan.input.endDate}</span>
            <span className="badge-accent">{plan.meta.calendarSource}</span>
            <span className="text-slate-600">{plan.meta.pricingNote}</span>
          </div>
        </div>
      )}

      {plan.parsedFromAI && (
        <div className="glass-card mb-8 p-5">
          <h3 className="section-title mb-3">LLM Agent Parse Sonucu</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            {plan.parsedFromAI.destinations?.map((d) => <span key={d} className="badge-brand">{d}</span>)}
            <span className="badge-navy">{plan.input.startDate} → {plan.input.endDate}</span>
            <span className="badge-accent">{plan.parsedFromAI.interests?.join(', ')}</span>
            <span className="badge-navy">Kaynak: &quot;{plan.input.naturalInput?.slice(0, 60)}...&quot;</span>
          </div>
        </div>
      )}

      {plan.alternatives?.length > 0 && (
        <div className="glass-card mb-8 p-6">
          <h3 className="section-title mb-4">Alternatif Senaryolar</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plan.alternatives.map((alt) => (
              <div key={alt.title} className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4">
                <p className="font-semibold text-amber-900">{alt.title}</p>
                <p className="mt-1 text-sm text-slate-600">{alt.description}</p>
                <p className="mt-2 text-sm font-bold text-brand-700">{alt.savingsFormatted} tasarruf</p>
                <p className="mt-1 text-xs text-slate-500">{alt.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'map' && (
        <div className="glass-card mb-8 p-6">
          <h3 className="section-title mb-4">Dinamik Rota — Leaflet Harita</h3>
          <RouteMap route={summary?.route} cityPositions={plan.cityPositions} />
        </div>
      )}

      {activeTab === 'budget' && <div className="mb-8"><BudgetDashboard budget={plan.budget} /></div>}

      {activeTab === 'automation' && (
        <div className="mb-8 space-y-4">
          <AutomationPanel automation={plan.automation} onTriggerEmail={triggerEmail} emailSending={emailSending} />
          <div className="glass-card p-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">E-posta Adresi</label>
            <div className="flex flex-wrap gap-3">
              <input type="email" className="input-field max-w-sm flex-1" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@email.com" />
              <button type="button" className="btn-primary text-sm" onClick={triggerEmail} disabled={emailSending}>Gönder</button>
            </div>
            {emailResult && <p className="mt-2 text-sm text-slate-600">{emailResult}</p>}
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="space-y-8">
          {Object.entries(plan.itinerary.trip).map(([city, cityPlan], cityIndex) => (
            <article key={city} className="glass-card overflow-hidden">
              <div className="border-b border-slate-100 bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-5 text-white">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-medium opacity-80">Durak {cityIndex + 1}</span>
                    <h2 className="font-display text-2xl font-bold">{city}</h2>
                    <p className="text-sm opacity-90">{cityPlan.info.country}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p>{cityPlan.info.accommodation.name} · {cityPlan.info.accommodation.priceFormatted}</p>
                    <p className="opacity-80">{cityPlan.info.flight.airline} · {cityPlan.info.flight.priceFormatted || `${cityPlan.info.flight.price} €`}</p>
                    <p className="opacity-70 text-xs">{cityPlan.info.checkIn} → {cityPlan.info.checkOut}</p>
                  </div>
                </div>
              </div>

              <div className="relative px-6 py-6">
                <div className="absolute left-9 top-6 bottom-6 w-0.5 timeline-line hidden sm:block" />
                <div className="space-y-6">
                  {cityPlan.days.map((day, dayIndex) => (
                    <div key={day.label} className="relative sm:pl-12">
                      <div className="absolute left-0 top-1 hidden h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white sm:flex">
                        {dayIndex + 1}
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <strong className="text-brand-800">{day.label} · {day.dayName}</strong>
                            {day.evening?.dateConfirmed && (
                              <span className="ml-2 badge-brand text-[10px]">Takvimde doğrulandı</span>
                            )}
                          </div>
                          <div className="text-right text-sm">
                            <span className="text-slate-600">{day.date}</span>
                            <span className="ml-2 text-slate-400">🌤 {day.weather}</span>
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-lg bg-white p-3 shadow-sm">
                            <p className="text-xs font-semibold text-slate-400">Yemek Planı</p>
                            <p className="text-sm">🍳 {day.breakfast.name} <span className="text-brand-600">{day.breakfast.priceFormatted}</span></p>
                            <p className="text-sm">🥗 {day.lunch.name} <span className="text-brand-600">{day.lunch.priceFormatted}</span></p>
                            <p className="text-sm">🍷 {day.dinner?.name} <span className="text-brand-600">{day.dinner?.priceFormatted}</span></p>
                          </div>
                          <div className="rounded-lg bg-white p-3 shadow-sm">
                            <p className="text-xs font-semibold text-slate-400">Gezi & Etkinlik</p>
                            <p className="text-sm">📍 {day.visit.name} <span className="text-brand-600">{day.visit.priceFormatted}</span></p>
                            <p className="text-xs text-slate-400">{day.visit.category?.join(' · ')} · ⭐ {day.visit.rating}</p>
                            <p className="text-sm mt-2 font-medium text-brand-700">
                              🎭 {day.evening.name} <span className="text-brand-600">{day.evening.priceFormatted}</span>
                            </p>
                            <p className="text-xs text-slate-500">
                              {day.evening.type} · {day.evening.time} · {day.evening.venue}
                            </p>
                          </div>
                        </div>
                        {day.dayCost && (
                          <p className="mt-3 text-right text-xs font-semibold text-slate-500">
                            Günlük tahmini: {day.dayCost.totalFormatted} / kişi
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {(activeTab === 'timeline' || activeTab === 'map') && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {activeTab === 'timeline' && (
            <div className="glass-card p-6">
              <h3 className="section-title mb-4">Rota Haritası</h3>
              <RouteMap route={summary?.route} cityPositions={plan.cityPositions} />
            </div>
          )}
          <div className={activeTab === 'timeline' ? '' : 'lg:col-span-2'}>
            <BudgetDashboard budget={plan.budget} />
          </div>
        </div>
      )}
    </div>
  );
}
