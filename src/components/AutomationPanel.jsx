export default function AutomationPanel({ automation, onTriggerEmail, emailSending }) {
  if (!automation) return null;

  const workflows = [
    {
      id: 'pdf',
      title: 'PDF İtinerary Üretimi',
      desc: 'n8n workflow — plan oluşturulunca otomatik PDF',
      status: automation.pdfReady ? 'Hazır' : 'Bekliyor',
      ok: automation.pdfReady,
      icon: '📄'
    },
    {
      id: 'email',
      title: 'E-posta Gönderimi',
      desc: 'Nodemailer + n8n — plan kullanıcıya iletilir',
      status: automation.emailStatus === 'sent' ? 'Gönderildi' : automation.emailStatus === 'skipped' ? 'SMTP yok (demo)' : 'Kuyrukta',
      ok: automation.emailStatus !== 'failed',
      icon: '✉'
    },
    {
      id: 'price',
      title: 'Uçuş Fiyat Takibi',
      desc: 'Periyodik Amadeus API sorgusu — fiyat düşerse bildirim',
      status: automation.priceWatch === 'active' ? 'Aktif izleme' : 'Pasif',
      ok: automation.priceWatch === 'active',
      icon: '📉'
    },
    {
      id: 'reminder',
      title: 'Seyahat Hatırlatıcıları',
      desc: 'Tarih yaklaşınca hava durumu & belge uyarısı',
      status: automation.reminderScheduled ? 'Planlandı' : 'Bekliyor',
      ok: automation.reminderScheduled,
      icon: '🔔'
    }
  ];

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="section-title">n8n Otomasyon Workflow&apos;ları</h3>
          <p className="mt-1 text-sm text-slate-500">Plan oluşturulduğunda tetiklenen otomasyonlar</p>
        </div>
        <span className="badge-accent">n8n · Webhook Ready</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className={`flex gap-3 rounded-xl border p-4 ${
              wf.ok ? 'border-brand-200 bg-brand-50/50' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <span className="text-2xl">{wf.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-navy-900">{wf.title}</p>
                <span className={`badge ${wf.ok ? 'badge-brand' : 'badge-navy'}`}>{wf.status}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{wf.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
        {automation.daysUntilTrip != null && (
          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-navy-900">Seyahate {automation.daysUntilTrip} gün kaldı</p>
            <p className="mt-1 text-slate-500">Hava durumu önizleme: {automation.weatherPreview}</p>
          </div>
        )}
        {automation.travelDocs?.length > 0 && (
          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-navy-900">Gerekli belgeler</p>
            <ul className="mt-1 list-inside list-disc text-slate-500">
              {automation.travelDocs.map((doc) => <li key={doc}>{doc}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
        <button type="button" className="btn-secondary text-sm" onClick={onTriggerEmail} disabled={emailSending}>
          {emailSending ? 'Gönderiliyor...' : 'E-posta Workflow Tetikle'}
        </button>
        <p className="self-center text-xs text-slate-400">
          SMTP yapılandırılmadığında mock modda çalışır — sunumda workflow mimarisini gösterin.
        </p>
      </div>
    </div>
  );
}
