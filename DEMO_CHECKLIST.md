# Demo Checklist

## 1. Çalıştırma
- Terminalde proje klasörüne gir:
  ```bash
  cd C:\Users\msi\Desktop\bitirme-travel
  ```
- Bağımlılıkları yükle:
  ```bash
  npm install
  ```
- Geliştirme sunucusunu başlat:
  ```bash
  npm run dev
  ```
- Tarayıcıya Vite tarafından gösterilen adresi yaz (genellikle `http://localhost:5173/` veya `http://localhost:5175/`).

## 2. Sunumda gösterilecek noktalar
1. **Ana sayfa açılır** ve React uygulaması yüklenir.
2. **Doğal dil planlama** kutusuna bir istek yaz:
   - Örn: `Mayıs'ta 5 günlük, 15.000 TL bütçeyle İtalya turu istiyorum. Tarih ve gastronomi ağırlıklı olsun.`
3. **Şehir, tarih, yolcu, bütçe, konaklama, ulaşım ve ilgi alanları** girilebilir.
4. **Plan Oluştur ve Rotayı Gör** butonuna basın.
5. **Itinerary sayfası** açılır ve:
   - rota özeti
   - toplam süre
   - tahmini bütçe
   - her şehir için otel ve uçuş bilgisi
   - günlük yemek ve gezi önerileri
   - alternatif program yapısını gösterin.

## 3. Projede uygulanan özellikler
- React + Vite tabanlı modern frontend.
- Express backend API katmanı (`server.js`).
- `src/pages/PlanPage.jsx` ve `src/pages/ItineraryPage.jsx` ile kullanıcı akışı.
- **Doğal dil tanıma** desteği (`backend/parser.js`).
- **Rota optimizasyonu** (en yakın komşu yaklaşımı, `backend/helpers.js`).
- **Bütçe seviye eşlemesi** ve seçeneklere göre otel/ulaşım seçimi.
- **Mock backend verisi** ile uçuş, otel ve mekan önerileri.
- **Akıllı destinasyon filtresi**; desteklenmeyen şehirler otomatik olarak elenir.
- **Tam full-stack mimari**: frontend React, backend Express, API proxy, JSON veri akışı.
- **E-posta gönderimi** altyapısı hazır (`nodemailer`), SMTP bilgisi eklenirse aktif olur.

## 4. Notlar
- Actif uygulama artık React SPA'dır; eski `plan.html` / `itinerary.html` dosyaları `legacy/` klasörüne taşındı.
- Eski statik sayfalar proje içinde karışıklık oluşturmasın diye yedeklendi.
- Backend şu anda mock veriler kullanıyor; gerçek API entegrasyonuna uygun yapı hazır.
- Sunum sırasında göstermek için en güvenli adres: açılan Vite URL'si.
