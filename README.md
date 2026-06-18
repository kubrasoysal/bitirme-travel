# VoyageAI - Yapay Zeka Destekli Seyahat Asistanı

## Proje Tanımı
VoyageAI, kullanıcıların bütçe, tarih ve kişisel tercihlerini doğal dilde (serbest metin olarak) girerek uçtan uca seyahat planları oluşturabildiği, yapay zeka destekli bir akıllı seyahat asistanıdır. Sistem, kullanıcının girdiği metni NLP (Doğal Dil İşleme) tabanlı algoritmalarla analiz eder; uygun uçuş ve konaklama seçeneklerini bulur, gezilecek yerleri coğrafi yakınlıklarına (TSP) göre gün gün rotalar, bütçe dağılımını hesaplar ve sonuçları interaktif bir harita üzerinde sunar. Proje, tek bir araçtan ziyade Frontend, Backend, Veri Katmanı ve Yapay Zeka bileşenlerini içeren tam kapsamlı bir sistem entegrasyonudur.

## Kullanılan Teknolojiler
- **Frontend (Arayüz Katmanı):** React.js, Vite, Tailwind CSS, React Router, React-Leaflet (Harita Görselleştirme)
- **Backend (İş Mantığı & API):** Node.js, Express.js, PDFKit, Nodemailer
- **Veritabanı Katmanı:** In-Memory Mock Database (Geliştirme Ortamı) ve Local Storage (Kullanıcı Plan Arşivi)
- **Yapay Zeka (AI) Bileşeni:** Lokal NLP Parser Modülü (Doğal dil metinlerinden veri ayrıştırma)
- **Harici API Entegrasyonu:** (Hazırlık Aşamasında) Amadeus API / Google Places API entegrasyonlarına uygun Mock Katmanı.

## Sistem Mimarisi
Proje iki katmanlı (Client-Server) bir mimari ile tasarlanmıştır:
1. **İstemci (Client):** Kullanıcı girişlerini alır, doğal dil metnini `/api/plan` REST API ucuna gönderir. Dönen devasa JSON formatındaki planı ayrıştırıp harita (Leaflet) ve bütçe dashboard'u üzerinde görselleştirir.
2. **Sunucu (Server):** 
   - **Parser:** Gelen serbest metinden şehir, bütçe (TL bazında) ve tarihleri çıkarır.
   - **Planner:** İlgili şehre ait otel, uçuş ve restoran verilerini eşleştirir.
   - **Optimizer:** Mekanların koordinatlarını Haversine algoritmasıyla hesaplayıp günlere dağıtır.
   - **Otomasyon:** Seçilen planın PDF olarak basılmasını ve E-posta ile gönderilmesini sağlar.

## Kurulum Talimatı

### Ön Koşullar
- Bilgisayarınızda **Node.js** (v16 veya üzeri) yüklü olmalıdır.

### Adımlar
1. Proje dizinine terminal ile girin:
   ```bash
   cd bitirme-travel
   ```
2. Gerekli kütüphaneleri (bağımlılıkları) yükleyin:
   ```bash
   npm install
   ```
3. Uygulamayı (Frontend ve Backend eşzamanlı) çalıştırın:
   ```bash
   npm run dev
   ```
4. Tarayıcınızda uygulamanın arayüzüne gitmek için `http://localhost:5173` adresini açın.

## Demo Açıklaması
Sistemi test etmek için ekrandaki metin kutusuna örneğin; **"Mayıs'ta 100.000 TL bütçeyle 5 günlük Paris turu istiyorum, tarih ve gastronomi ağırlıklı olsun"** yazarak "Plan Oluştur" butonuna basabilirsiniz. 
Sistem metni otomatik algılayıp, belirlediğiniz TL bütçesine göre otel/uçuş atayacak, interaktif haritada Paris rotanızı oluşturacak ve bütçe grafiklerini çizecektir. Sonrasında ekrandaki "PDF İndir" butonuyla planınızı anında dokümana dönüştürebilirsiniz.
