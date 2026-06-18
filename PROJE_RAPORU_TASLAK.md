# Bitirme Projesi Raporu: AI Destekli Akıllı Seyahat Planlama ve Rezervasyon Asistanı

## 1. Proje Özeti
Bu proje, kullanıcının bütçesine, tercihlerine ve seyahat tarihlerine göre uçtan uca seyahat planı oluşturan, uçuş ve otel önerileri sunan ve dinamik rota optimizasyonu sağlayan yapay zeka destekli akıllı bir seyahat asistanı platformudur. Projemiz, kullanıcılardan doğal dille aldığı girdileri analiz ederek kapsamlı, optimize edilmiş ve kişiselleştirilmiş seyahat deneyimleri sunmayı hedeflemektedir.

## 2. Proje Bileşenleri ve Gerçekleştirim Detayları

### 2.1. LLM Agent ile Doğal Dil Seyahat Planlama
Kullanıcılar platforma serbest metin formatında (Örn: "Mayıs'ta 5 günlük, 15.000 TL bütçeyle İtalya turu istiyorum, tarih ve kültür ağırlıklı olsun") isteklerini iletir. 
* **Gerçekleştirim:** Node.js backend üzerinde `openai` kütüphanesi entegre edilmiştir. Kullanıcının girdiği metin, OpenAI API'sine (GPT modelleri) iletilir. LLM agent bu metni analiz (parse) ederek destinasyon, tarih, bütçe ve ilgi alanı gibi yapılandırılmış parametreleri çıkarır ve planlama sürecini başlatır.

### 2.2. Uçuş ve Otel Arama API Entegrasyonu
Kullanıcının destinasyon ve bütçe ayarlarına göre en uygun uçuş ve konaklama seçenekleri belirlenir.
* **Gerçekleştirim:** Gerçek zamanlı arama işlemleri için **Amadeus API** (veya Skyscanner/Booking.com) entegrasyonu hedeflenmektedir. Geliştirme sürecinin kesintiye uğramaması ve API kotası aşılmaması için öncelikle bir **Mock Data Katmanı** tasarlanmıştır. Bu sayede fiyat karşılaştırması, yıldız/puan filtreleme gibi fonksiyonlar API anahtarı olmadan da simüle edilip test edilebilmektedir.

### 2.3. Dinamik Rota Optimizasyonu ve Gün Gün Plan Oluşturma
Seçilen destinasyondaki restoranlar, turistik alanlar ve aktiviteler gün bazlı olarak planlanır.
* **Gerçekleştirim:** Turistik noktalar **Google Places API** üzerinden çekilir (veya Foursquare API alternatifi kullanılacaktır). LLM agent, coğrafi yakınlık ve zaman kısıtlarını değerlendirerek basit bir Traveling Salesperson Problem (TSP) benzeri optimizasyon ile gün gün rotaları oluşturur. Frontend tarafında ise bu lokasyonlar `leaflet` ve `react-leaflet` kütüphaneleri kullanılarak harita üzerinde etkileşimli bir şekilde görselleştirilmektedir.

### 2.4. Bütçe Yönetimi ve Maliyet Optimizasyonu
Kullanıcının tanımladığı toplam bütçe; uçuş, konaklama, yeme-içme ve aktivite gibi kategorilere mantıksal bir şekilde dağıtılır.
* **Gerçekleştirim:** Bütçe aşımı durumlarında LLM destekli "Alternatif Senaryolar" sunulur (Örn: "Daha uygun bir otel seçerek bütçenizi bu müzeye ayırabilirsiniz"). Kullanıcı arayüzünde harcama takip dashboard'u ile gerçek vs. planlanan bütçe karşılaştırması görsel grafiklerle desteklenir.

### 2.5. n8n Otomasyon Workflow'ları & Bildirimler
Seyahat planı tamamlandığında ve sonrasında kullanıcı bilgilendirme süreçleri otomatikleştirilir.
* **Gerçekleştirim:** Seyahat planı tamamlandığında Node.js üzerinde `pdfkit` kullanılarak PDF tipinde seyahat programı (itinerary) oluşturulur ve `nodemailer` kullanılarak kullanıcıya e-posta atılır. Uçuş fiyatlarının takibi, fiyat düşüş bildirimleri ve yaklaşan seyahat için hava durumu / belge hazırlığı hatırlatmaları **n8n** otomasyon araçları ile yönetilecek şekilde kurgulanmaktadır.

### 2.6. React Web Arayüzü ve Responsive Mobil Görünüm
Kullanıcının sistemle etkileşime girdiği modern, dinamik ve responsive arayüz tasarımı.
* **Gerçekleştirim:** Proje arayüzü **React.js** ve **Vite** ile geliştirilmiştir. Stil yönetimi için **Tailwind CSS** kullanılarak hem masaüstü hem de mobil cihazlarda kusursuz çalışan adım adım planlama sihirbazı (wizard) oluşturulmuştur. Harita entegrasyonu (Leaflet) ve interaktif timeline görünümleri eklenmiştir.

## 3. Kullanılan Teknoloji Yığını (Tech Stack)
* **Frontend:** React.js, Vite, Tailwind CSS, React-Leaflet, Axios, React Router DOM
* **Backend:** Node.js, Express.js
* **Yapay Zeka & Harita:** OpenAI API (GPT), Leaflet.js, Google Places API (veya Foursquare)
* **API & Entegrasyonlar:** Amadeus / Booking API (Mock veri katmanı dahil), n8n (otomasyon)
* **Araçlar & Kütüphaneler:** Nodemailer (E-posta), PDFKit (PDF export)
* **Veritabanı:** PostgreSQL (veya Firebase) entegrasyonu yapılarak kullanıcı profilleri ve geçmiş seyahat planları arşivlenecektir.

---
**Not:** Bu rapor, danışman hocanın talep ettiği tüm gereksinimleri (LLM, API entegrasyonları, Rota Optimizasyonu, Otomasyon ve React arayüzü) içerecek şekilde projenin güncel `package.json` yapısına uygun olarak hazırlanmıştır. Gerekli kısımları kendi proje durumunuza göre özelleştirebilirsiniz.
