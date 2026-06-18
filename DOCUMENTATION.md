# AI Destekli Akıllı Seyahat Planlama ve Rezervasyon Asistanı

Bu doküman, uygulamanın amacı, bileşenleri, çalıştırma/kurulum adımları, backend API'leri, demo akışı ve bilinen sınırlamaları içerir. Proje, öğretim üyesinin istediği gereksinimleri karşılayacak şekilde tasarlanmıştır.

## 1. Proje Özeti

- Proje adı: VoyageAI (Bitirme Projesi)
- Amaç: Kullanıcının doğal dil girdisinden (örn. "Mayısta 5 günlük, 15.000 TL bütçeyle İtalya turu") uçtan uca seyahat planı üretmek; uçuş/oteller için öneri sunmak, rota optimizasyonu yapmak, bütçe dağılımı oluşturmak ve PDF/e-posta otomasyonlarını tetiklemek.
- Temel karakteristikler: LLM tabanlı doğal dil parsing, mock/real API entegrasyonu, TSP-benzeri rota optimizasyonu, Leaflet tabanlı harita, PDF üretimi, e-posta (nodemailer) ve n8n için webhook destekleri.

## 2. Bileşenler & Kod Eşlemesi

- Frontend (React + Vite)
  - `src/main.jsx` — Uygulama giriş noktası
  - `src/App.jsx` — Router ve temel layout wrapper
  - `src/pages/PlanPage.jsx` — Planlama sihirbazı (girdi, doğrulama, /api/plan çağrısı)
  - `src/pages/ItineraryPage.jsx` — Oluşturulan planın timeline, harita, bütçe ve otomasyon görünümleri
  - `src/pages/ArchivePage.jsx` — Kayıtlı planların listesi ve geri yükleme
  - `src/components/RouteMap.jsx` — Leaflet harita bileşeni
  - `src/components/BudgetDashboard.jsx` — Bütçe görselleştirme
  - `src/components/AutomationPanel.jsx` — PDF/E-posta/Workflow durum kartları

- Backend (Node.js + Express)
  - `server.js` — Express sunucusu, statik dosya servisi ve API routing
  - `backend/service.js` — Plan üretme pipeline'ı: parse, rota optimizasyonu, fiyat tahmini, plan objesi oluşturma
  - `backend/parser.js` — Serbest metin -> parametre (destinations, dates, budget, interests) ayrıştırıcı
  - `backend/planner.js` — Mock uçuş/otel/aktivite arama ve günlük program üretimi (TSP helper çağrıları)
  - `backend/pdf.js` — `pdfkit` ile PDF oluşturma fonksiyonu
  - `backend/calendar.js`, `backend/dates.js` — tarih/etkinlik/hava verisi yardımcıları (mock)
  - `backend/mock_data.js` — Şehir/oteller/etkinlik örnek verisi

## 3. Özellikler (Kısa)

- Doğal dil planlama: Kullanıcı serbest metinle istek girer; `parser.js` ayrıştırır.
- Mock uçuş/otel/yer arama: Gerçek API anahtarınız yoksa mock data çalışır.
- Rota optimizasyonu: `helpers.optimizeRoute` ile basit yakınlık tabanlı rota oluşturma (yakın komşu heuristiği).
- Bütçe yönetimi: Toplam bütçeyi kategorilere ayırma ve alternatif senaryolar üretme.
- Otomasyon: PDF oluşturma (`/api/pdf`), e-posta (nodemailer) ve n8n webhook entegrasyon noktaları.

## 4. Çalıştırma / Kurulum

1. Proje kökünde terminal açın:

```bash
npm install
```

2. Geliştirme sunucusunu çalıştırın (hem frontend hem backend):

```bash
npm run dev
```

- Frontend: Vite varsayılan olarak `http://localhost:5173` üzerinde çalışır (port meşgulse sonraki portlara taşınır, örn. 5174, 5175...)
- Backend: `server.js` içinde `PORT` yoksa `4000` üzerinde çalışır.

3. Sadece backend çalıştırmak için:

```bash
node server.js
```

4. Prod benzeri önizleme (Vite preview):

```bash
npm run build
npm run preview
```

## 5. Ortam Değişkenleri (env)

- `PORT` — Backend dinleme portu (opsiyonel, default 4000)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — Nodemailer e-posta gönderimi için (demo'da yoksa e-posta atlanır)
- `N8N_WEBHOOK_URL` — n8n workflow tetikleme URL'i (opsiyonel)

Ortam değişkenlerini Windows PowerShell'de şu şekilde set edebilirsiniz:

```powershell
$env:SMTP_HOST = 'smtp.example.com'
$env:SMTP_USER = 'user'
$env:SMTP_PASS = 'pass'
node server.js
```

## 6. API Endpoints (Özet)

- GET `/api/health` — Health check. Örnek cevap: `{ "status": "ok", "version": "1.0.0" }`
- POST `/api/parse` — Serbest metin parse işlemi. Gönderim:

```json
{ "naturalInput": "Mayısta 5 günlük, 15000 TL bütçeyle İtalya turu" }
```

Response: `{ parsed: { destinations: [...], startDate: '2026-05-10', endDate: '2026-05-15', budgetLevel: 2, interests: [...] } }`

- POST `/api/plan` — Plan üretir. Gönderim (frontend otomatik gönderir):

```json
{
  "naturalInput":"...",
  "destinations": ["Roma","Milano"],
  "startDate": "2026-07-10",
  "endDate": "2026-07-16",
  "travelers": 2,
  "budgetLevel": 2,
  "accommodationType": "mid-hotel",
  "transportType": "train",
  "interests": ["Tarih","Gastronomi"]
}
```

Response: Plan objesi (JSON) — `summary`, `itinerary`, `budget`, `cityPositions`, `alternatives`, `automation` vb.

- POST `/api/pdf` — `{ plan }` göndererek PDF oluşturma (backend `pdfkit` kullanır). Response: `application/pdf` blob.
- POST `/api/email` — `{ email, plan }` ile nodemailer üzerinden mail gönderir (SMTP ayarlıysa).

## 7. Hata Ayıklama Rehberi (Common Issues)

- Port çakışması: `EADDRINUSE` hatası alırsanız, portu kullanan PID'i bulup kapatın veya `PORT` değişkenini değiştirin:

```powershell
netstat -ano | findstr :4000
taskkill /PID <pid> /F
```

- Vite bir portu kullanamıyorsa otomatik olarak sonraki portu dener (5173 → 5174 ...). Tarayıcıda açarken terminalde yazan `Local` URL'yi kullanın.
- Frontend `Request failed with status code 500`: Backend loglarını kontrol edin (terminalde node çıktısı). Backend tarafında `server.js` / `backend/service.js` içinde hata fırlıyorsa stacktrace terminalde görünür.
- PDF veya e-posta hataları: `pdfkit` veya `nodemailer` hatası geliyorsa backend logunu okuyun; eksik alan ya da `plan` objesinde beklenen anahtarlar olmayabilir.

## 8. Demo Kontrol Listesi (Sunum için)

1. `npm install` — tüm bağımlılıkları yükle.
2. `npm run dev` — frontend + backend başlat.
3. Aç: `http://localhost:<vite-port>/plan` — PlanPage dolsun.
4. Öntanımlı metin kullanarak `Plan Oluştur & Rotayı Gör` butonuna basın. Oluşan plan `Itinerary` sayfasında görünmeli.
5. `PDF İndir` ve `E-posta Workflow Tetikle` butonlarını gösterin (SMTP yoksa e-posta 'skipped' olur).
6. `Planlarım` sayfasındaki arşivden planı geri çağırın.

## 9. Bilinen Sınırlamalar ve Öneriler

- Mevcut projede dış API entegrasyonları (Amadeus, Booking, Google Places) mock veri katmanıyla çalışır; gerçek entegrasyon için API anahtarları ve ek istek sınırlaması/ödemeleri gereklidir.
- Rota optimizasyonu basit bir yakın komşu yaklaşımı kullanır. Gerçek TSP optimizasyonu için daha gelişmiş kütüphaneler (concorde, OR-Tools vb.) entegre edilebilir.
- LLM kullanımı: demo ortamı `parser.js` ile lokal anahtar kelime tabanlı ayrıştırma yapar. OpenAI/LLM entegrasyonu eklenecekse `backend/service.js` içinde parse adımı OpenAI çağrısını kullanacak şekilde genişletin.

## 10. Dosya Referansları (Hızlı Bakış)

- Frontend: `src/pages/PlanPage.jsx`, `src/pages/ItineraryPage.jsx`, `src/components/RouteMap.jsx`
- Backend: `server.js`, `backend/service.js`, `backend/parser.js`, `backend/pdf.js`, `backend/mock_data.js`
- Konfig: `vite.config.js`, `package.json`, `tailwind.config.js`

## 11. Sonraki Adımlar (Öneri)

1. Hataları çöz (özellikle backend 500 hataları) — backend terminal loglarını paylaş (stacktrace).  
2. Gerçek API anahtarlarını güvenli şekilde `.env` veya secrets manager ile ekle.  
3. CI/CD ile otomatik test + preview deploy kur (Vercel/Netlify + Heroku/Render).  

---
Dokümanı güncellememi istersen hangi format istiyorsun? (PDF, Word, veya repo'ya README.md olarak ekleme).
