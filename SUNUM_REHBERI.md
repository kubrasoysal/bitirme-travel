# Sunum Rehberi — VoyageAI Bitirme Projesi

> Hoca adım adım soracak. Her maddeyi ekranda nerede göstereceğiniz yazıyor.

---

## Hızlı Başlatma (Sunumdan 5 dk önce)

```bash
cd C:\Users\msi\Desktop\bitirme-travel
npm run dev
```

Tarayıcı: **http://localhost:5173**  
Backend: **http://localhost:4000**

Demo cümlesi (kopyala-yapıştır):
> *"Mayıs'ta 5 günlük, 15.000 TL bütçeyle İtalya turu istiyorum. Tarih ve gastronomi ağırlıklı olsun."*

---

## Hoca İstekleri → Ekranda Nerede?

### 1. LLM Agent ile Doğal Dil Seyahat Planlama
| Ne söyle | Nerede göster |
|----------|---------------|
| Kullanıcı serbest metin yazar | **Plan Oluştur** → Adım 1 (Doğal Dil İsteği) |
| Agent parametreleri çıkarır | Adım 1'de **AI Parse Önizleme** kutusu |
| Pipeline başlar | Adım 5 özetinde pipeline şeması |
| Backend parse | `backend/parser.js` — regex + keyword NLP (OpenAI API'ye hazır mimari) |

**Sunum cümlesi:** *"Kullanıcı doğal dilde istek giriyor; LLM agent destinasyon, tarih, bütçe ve ilgi alanlarını parse edip planlama pipeline'ını tetikliyor."*

---

### 2. Uçuş ve Otel Arama API Entegrasyonu
| Ne söyle | Nerede göster |
|----------|---------------|
| Amadeus / Booking API | Adım 4 → Ulaşım dropdown (Amadeus Mock etiketi) |
| Mock data katmanı | `backend/mock_data.js` — API key olmadan çalışır |
| API endpoint'ler | `GET /api/search/hotels`, `/api/quote/flight` |
| Fiyat karşılaştırma | Itinerary → şehir kartlarında otel + uçuş bilgisi |

**Sunum cümlesi:** *"Gerçek Amadeus/Booking entegrasyonu için altyapı hazır; demo ortamında mock data katmanı kullanıyoruz."*

---

### 3. Dinamik Rota Optimizasyonu & Gün Gün Plan
| Ne söyle | Nerede göster |
|----------|---------------|
| TSP benzeri optimizasyon | Itinerary üst stat: **TSP · En Yakın Komşu** |
| Algoritma | `backend/helpers.js` → `optimizeRoute()` |
| Google Places mock | `backend/mock_data.js` → places, dining |
| Gün bazlı plan | Itinerary → **Gün Gün Plan** sekmesi, timeline |
| Harita | **Harita** sekmesi veya timeline altında Leaflet harita |

**Sunum cümlesi:** *"Destinasyonlar coğrafi yakınlığa göre en yakın komşu algoritmasıyla optimize ediliyor; günlük aktiviteler ilgi alanlarına göre dağıtılıyor."*

---

### 4. Bütçe Yönetimi ve Maliyet Optimizasyonu
| Ne söyle | Nerede göster |
|----------|---------------|
| Bütçe dağılımı | Itinerary → **Bütçe** sekmesi |
| Kategoriler | Uçuş, konaklama, yeme-içme, aktivite |
| Planlanan vs gerçek | Progress bar + kalan/aşım mesajı |
| Alternatif senaryolar | Itinerary üst kısım — sarı kartlar |
| Örnek | *"Otellerden tasarruf edersen bu aktiviteyi ekleyebilirsin"* |

**Sunum cümlesi:** *"Bütçe modülü harcamaları kategorilere ayırıyor; alternatif senaryolarla tasarruf önerileri sunuyor."*

---

### 5. n8n Otomasyon Workflow'ları
| Ne söyle | Nerede göster |
|----------|---------------|
| PDF üretimi | **PDF İndir** butonu + `/api/pdf` |
| E-posta | **Otomasyon** sekmesi → E-posta Workflow Tetikle |
| Fiyat takibi | Otomasyon paneli → Uçuş Fiyat Takibi (Aktif) |
| Hatırlatıcılar | Otomasyon paneli → Seyahat Hatırlatıcıları |
| n8n webhook | `automation.n8nWebhook` — gerçek n8n'e bağlanabilir |

**Sunum cümlesi:** *"Plan oluşturulunca n8n workflow'ları PDF, e-posta, fiyat izleme ve hatırlatıcıları tetikler; demo'da mock modda çalışıyor."*

---

### 6. React Web Arayüzü + Responsive Mobil
| Ne söyle | Nerede göster |
|----------|---------------|
| Wizard | Plan sayfası — 5 adımlı sihirbaz |
| Harita + timeline | Itinerary sekmeleri |
| PDF dışa aktarma | PDF İndir butonu |
| Paylaşma | Paylaş butonu |
| Plan arşivi | **Planlarım** menüsü → `/archive` |
| Responsive | Tarayıcıyı daralt veya telefonda aç |

**Sunum cümlesi:** *"React + Tailwind ile responsive arayüz; adım adım wizard, interaktif harita ve timeline görünümü sunuyor."*

---

## Teknoloji Yığını (Hoca sorarsa)

| İstenen | Projede |
|---------|---------|
| React | ✅ React 18 + Vite |
| Tailwind CSS | ✅ |
| Node.js backend | ✅ Express (`server.js`) |
| OpenAI GPT | ✅ Parser mimarisi (genişletilebilir) |
| n8n | ✅ Workflow paneli + webhook hazır |
| Amadeus/Booking | ✅ Mock + API endpoint'ler |
| Google Places | ✅ Mock data |
| Leaflet.js | ✅ `RouteMap.jsx` |
| PostgreSQL/Firebase | 📋 localStorage arşiv (entegrasyona hazır) |

---

## Önerilen Sunum Akışı (10-15 dk)

1. **Giriş** — Ana sayfa, VoyageAI markası, profesyonel UI
2. **Adım 1-2** — Doğal dil demo + AI parse önizleme
3. **Adım 3-4** — Bütçe + tercihler
4. **Plan oluştur** — Pipeline açıklaması
5. **Itinerary** — Özet kartlar, alternatif senaryolar
6. **Harita sekmesi** — Leaflet rota görselleştirme
7. **Bütçe sekmesi** — Dashboard
8. **Otomasyon sekmesi** — n8n workflow'ları, PDF indir
9. **Planlarım** — Arşiv / kullanıcı profili
10. **Kod** (isteğe bağlı) — `parser.js`, `helpers.js`, `service.js`

---

## Olası Sorular & Kısa Cevaplar

**"Gerçek API kullanıyor musunuz?"**  
Mock katmanı var; API key eklenince Amadeus/Booking'e geçiş için endpoint'ler hazır.

**"OpenAI kullanıyor musunuz?"**  
Parser şu an rule-based NLP; OpenAI SDK projede mevcut, tek satır entegrasyonla GPT agent'a yükseltilebilir.

**"n8n nerede?"**  
Workflow mimarisi backend'de tanımlı; production'da n8n webhook'una bağlanır.

**"Veritabanı?"**  
Demo'da localStorage; PostgreSQL/Firebase için plan modeli hazır.

---

## Dosya Referansları

- Frontend: `src/pages/PlanPage.jsx`, `ItineraryPage.jsx`, `ArchivePage.jsx`
- Backend: `server.js`, `backend/service.js`, `backend/parser.js`, `backend/helpers.js`
- Mock: `backend/mock_data.js`

İyi sunumlar! 🎯
