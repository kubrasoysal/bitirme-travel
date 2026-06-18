import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import WizardProgress from '../components/WizardProgress.jsx';
import { getDefaultTripDates, getTodayISO, isPastDate } from '../utils/dates.js';

const defaultDates = getDefaultTripDates(6);

const defaultCities = ['Roma', 'Milano', 'Viyana'];
const defaultInterests = ['Tarih', 'Gastronomi'];
const interestOptions = ['Tarih', 'Sanat', 'Gastronomi', 'Alışveriş', 'Doğa', 'Etkinlik'];

function normalizeDestinations(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((city) => city.charAt(0).toUpperCase() + city.slice(1).toLowerCase());
}

function getBudgetLabel(value) {
  return value === '1' ? 'Ekonomik' : value === '3' ? 'Premium' : 'Standart';
}

function getBudgetAmount(value) {
  return value === '1' ? '6.000 TL' : value === '3' ? '25.000 TL' : '15.000 TL';
}

export default function PlanPage({ onPlanCreated }) {
  const [step, setStep] = useState(1);
  const [naturalInput, setNaturalInput] = useState(
    "Temmuz'da 6 günlük, 15.000 TL bütçeyle İtalya-Avusturya rotası istiyorum. Etkinlik ve gastronomi ağırlıklı olsun."
  );
  const [destinations, setDestinations] = useState(defaultCities.join(', '));
  const [startDate, setStartDate] = useState(defaultDates.startDate);
  const [endDate, setEndDate] = useState(defaultDates.endDate);
  const [travelers, setTravelers] = useState(2);
  const [budgetLevel, setBudgetLevel] = useState('2');
  const [accommodationType, setAccommodationType] = useState('mid-hotel');
  const [transportType, setTransportType] = useState('train');
  const [interests, setInterests] = useState(defaultInterests);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parsedPreview, setParsedPreview] = useState(null);

  const destinationList = useMemo(() => normalizeDestinations(destinations), [destinations]);

  useEffect(() => {
    window.localStorage.setItem(
      'lastPlanInput',
      JSON.stringify({ destinations: destinationList, startDate, endDate, travelers, budgetLevel, accommodationType, transportType, interests, naturalInput })
    );
  }, [destinationList, startDate, endDate, travelers, budgetLevel, accommodationType, transportType, interests, naturalInput]);

  async function previewParse() {
    try {
      const res = await axios.post('/api/parse', { naturalInput });
      setParsedPreview(res.data.parsed);
      if (res.data.parsed.startDate) setStartDate(res.data.parsed.startDate);
      if (res.data.parsed.endDate) setEndDate(res.data.parsed.endDate);
      if (res.data.parsed.destinations?.length) setDestinations(res.data.parsed.destinations.join(', '));
      if (res.data.parsed.interests?.length) setInterests(res.data.parsed.interests);
      if (res.data.parsed.budgetLevel) setBudgetLevel(String(res.data.parsed.budgetLevel));
    } catch {
      setParsedPreview(null);
    }
  }

  const minDate = getTodayISO();

  function validateStep(current) {
    if (current === 1 && !naturalInput.trim()) return 'Doğal dil isteği girin.';
    if (current === 2) {
      if (!destinationList.length) return 'En az bir destinasyon girin.';
      if (!startDate || !endDate) return 'Tarih aralığı seçin.';
      if (isPastDate(startDate)) return 'Geçmiş tarih seçilemez. Bugün veya ileri bir tarih girin.';
      if (endDate < startDate) return 'Bitiş tarihi başlangıçtan önce olamaz.';
    }
    return '';
  }

  function nextStep() {
    const msg = validateStep(step);
    if (msg) {
      setError(msg);
      return;
    }
    setError('');
    if (step === 1) previewParse();
    setStep((s) => Math.min(5, s + 1));
  }

  function prevStep() {
    setError('');
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/plan', {
        naturalInput,
        destinations: destinationList,
        startDate,
        endDate,
        travelers,
        budgetLevel,
        accommodationType,
        transportType,
        interests,
        manualOverride: false
      });

      const plan = response.data;
      window.localStorage.setItem('planResponse', JSON.stringify(plan));

      const archive = JSON.parse(window.localStorage.getItem('planArchive') || '[]');
      archive.unshift({ id: Date.now(), title: plan.summary.route.join(' → '), date: plan.createdAt, plan });
      window.localStorage.setItem('planArchive', JSON.stringify(archive.slice(0, 20)));

      onPlanCreated(plan);
      window.location.href = '/itinerary';
    } catch (fetchError) {
      setError(fetchError.response?.data?.error || fetchError.message || 'Plan oluşturulamadı.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function toggleInterest(value) {
    setInterests((current) =>
      current.includes(value) ? current.filter((i) => i !== value) : [...current, value]
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-up">
      <div className="mb-8 text-center sm:text-left">
        <span className="badge-brand mb-3">LLM Agent · Doğal Dil Planlama</span>
        <h1 className="font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
          Seyahat Planlama Sihirbazı
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Adım adım tercihlerinizi girin veya serbest metin ile AI agent&apos;ın parametreleri çıkarmasını sağlayın.
        </p>
      </div>

      <WizardProgress currentStep={step} />

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <section className="glass-card p-6 sm:p-8">
            <h2 className="section-title mb-1">1. Doğal Dil Seyahat İsteği</h2>
            <p className="mb-5 text-sm text-slate-500">
              GPT Agent bu metni parse ederek destinasyon, tarih, bütçe ve ilgi alanı parametrelerini çıkarır.
            </p>
            <textarea
              className="input-field min-h-[140px] resize-y"
              value={naturalInput}
              onChange={(e) => setNaturalInput(e.target.value)}
              placeholder={'Örn: Mayısta 5 günlük, 15.000 TL bütçeyle İtalya turu istiyorum, tarih ve kültür ağırlıklı olsun.'}
            />
            {parsedPreview && (
              <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/60 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-700">AI Parse Önizleme</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {parsedPreview.destinations?.map((d) => (
                    <span key={d} className="badge-brand">{d}</span>
                  ))}
                  <span className="badge-navy">{parsedPreview.startDate} → {parsedPreview.endDate}</span>
                  <span className="badge-accent">Bütçe: {getBudgetLabel(String(parsedPreview.budgetLevel))}</span>
                  {parsedPreview.interests?.map((i) => (
                    <span key={i} className="badge-navy">{i}</span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {step === 2 && (
          <section className="glass-card p-6 sm:p-8">
            <h2 className="section-title mb-5">2. Destinasyon & Tarih</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Hedef Şehirler</label>
                <input className="input-field" value={destinations} onChange={(e) => setDestinations(e.target.value)} placeholder="Roma, Milano, Viyana" />
            <p className="mt-1.5 text-xs text-slate-400">Geçmiş tarihler kabul edilmez · Temmuz 2026 etkinlik takvimi aktif</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Başlangıç</label>
                <input type="date" className="input-field" min={minDate} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Bitiş</label>
                <input type="date" className="input-field" min={startDate || minDate} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Yolcu Sayısı</label>
                <input type="number" min="1" className="input-field" value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} />
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="glass-card p-6 sm:p-8">
            <h2 className="section-title mb-5">3. Bütçe Yönetimi</h2>
            <div className="rounded-xl bg-gradient-to-br from-brand-50 to-white p-6 border border-brand-100">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-600">Bütçe Seviyesi</p>
                  <p className="text-2xl font-bold text-brand-700">{getBudgetLabel(budgetLevel)}</p>
                </div>
                <p className="text-lg font-semibold text-navy-900">~{getBudgetAmount(budgetLevel)}</p>
              </div>
              <input type="range" min="1" max="3" value={budgetLevel} onChange={(e) => setBudgetLevel(e.target.value)} className="w-full accent-brand-600" />
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>Ekonomik</span>
                <span>Standart</span>
                <span>Premium</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Akıllı bütçe modülü uçuş, konaklama, yeme-içme ve aktivite kalemlerine otomatik dağıtım yapar.
            </p>
          </section>
        )}

        {step === 4 && (
          <section className="glass-card p-6 sm:p-8">
            <h2 className="section-title mb-5">4. Konaklama, Ulaşım & İlgi Alanları</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Konaklama Tipi</label>
                <select className="input-field" value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)}>
                  <option value="hostel">Hostel</option>
                  <option value="mid-hotel">Orta Seviye Otel</option>
                  <option value="luxury">Lüks Otel</option>
                  <option value="airbnb">Airbnb</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Ulaşım (Amadeus Mock)</label>
                <select className="input-field" value={transportType} onChange={(e) => setTransportType(e.target.value)}>
                  <option value="train">Tren</option>
                  <option value="plane">Uçak</option>
                  <option value="bus">Otobüs</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-3 block text-sm font-medium text-slate-700">İlgi Alanları</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        interests.includes(interest)
                          ? 'bg-brand-600 text-white shadow-md'
                          : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-300'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {step === 5 && (
          <section className="glass-card p-6 sm:p-8">
            <h2 className="section-title mb-5">5. Özet & Plan Oluştur</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Destinasyon', destinationList.join(', ')],
                ['Tarih', `${startDate} → ${endDate}`],
                ['Yolcu', `${travelers} kişi`],
                ['Bütçe', getBudgetLabel(budgetLevel)],
                ['Konaklama', accommodationType],
                ['Ulaşım', transportType],
                ['İlgi', interests.join(', ')]
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 px-4 py-3">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="font-medium text-navy-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-dashed border-brand-300 bg-brand-50/40 p-4 text-sm text-brand-800">
              Pipeline: LLM Parse → API Arama (Mock) → Rota Optimizasyonu (TSP) → Bütçe Dağıtımı → n8n Otomasyon
            </div>
          </section>
        )}

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {step > 1 && (
            <button type="button" className="btn-secondary" onClick={prevStep}>
              ← Geri
            </button>
          )}
          {step < 5 ? (
            <button type="button" className="btn-primary flex-1 sm:flex-none" onClick={nextStep}>
              Devam Et →
            </button>
          ) : (
            <button type="submit" className="btn-primary flex-1 sm:flex-none" disabled={isSubmitting}>
              {isSubmitting ? 'AI Plan Oluşturuyor...' : '✦ Plan Oluştur & Rotayı Gör'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
