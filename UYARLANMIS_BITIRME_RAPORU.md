# BİTİRME PROJESİ RAPORU
## AI Destekli Akıllı Seyahat Planlama ve Rezervasyon Asistanı

---

## ÖZET
Bu çalışma, kullanıcıların seyahat planlama sürecini hızlandırmak ve kişiselleştirilmiş bir seyahat deneyimi sunmak amacıyla geliştirilen web tabanlı bir "AI Destekli Akıllı Seyahat Planlama ve Rezervasyon Asistanı" sistemini kapsamaktadır. Projenin temel amacı; kullanıcıların bütçe, tarih ve ilgi alanı gibi parametrelerini doğal dil ile (serbest metin olarak) girerek uçtan uca optimize edilmiş bir seyahat rotası, uçuş ve otel önerileri elde edebilmesidir. Sistem, harici API entegrasyonları ve LLM (Büyük Dil Modeli) destekli karar mekanizmalarıyla, geleneksel manuel seyahat planlama iş akışlarını otomatize eden bütünleşik bir mimari sunmaktadır.

Uygulamanın arka uç mimarisi Node.js tabanlı bir web servis altyapısı üzerine inşa edilmiş, veri kalıcılığı ve kullanıcı yönetimi için PostgreSQL (veya Firebase) kullanılması hedeflenmiştir. Kullanıcıdan gelen doğal dil istekleri OpenAI API aracılığıyla anlamlandırılarak destinasyon, bütçe ve zaman parametrelerine dönüştürülmektedir. Uçuş ve konaklama verileri Amadeus/Booking API (ve mock veri katmanı) üzerinden sağlanırken, destinasyon içi turistik noktalar ve restoranlar Google Places API ile çekilmekte, Leaflet.js tabanlı haritalar üzerinden görselleştirilmektedir.

Sistemde n8n kullanılarak otomasyon workflow'ları kurgulanmış olup, oluşturulan seyahat planlarının PDF formatında e-posta ile iletilmesi ve uçuş fiyatlarındaki değişikliklerin takibi gibi asenkron işlemler gerçekleştirilmektedir. Arayüz tasarımı React/Next.js ve Tailwind CSS kullanılarak, adım adım ilerleyen dinamik bir planlama sihirbazı (wizard) formatında sunulmaktadır.

---

## 1. BÖLÜM: GİRİŞ

### 1.1. PROBLEMİN TANIMI
Geleneksel seyahat planlama süreci; uçuş arama, otel karşılaştırma, bütçe ayarlama ve gidilecek lokasyondaki günlük aktiviteleri organize etme gibi çok aşamalı, zaman alıcı ve farklı platformlar arasında sürekli geçiş yapmayı gerektiren karmaşık bir süreçtir. Kullanıcılar, kısıtlı bir bütçe ve zaman diliminde en optimal rotayı oluşturmak için manuel olarak büyük bir veri yığınını analiz etmek zorunda kalmaktadır. 

### 1.2. SEYAHAT PLANLAMA SÜRECİNDE KARŞILAŞILAN ZORLUKLAR
Seyahat planlama sürecinde karşılaşılan temel zorluklar şu şekilde özetlenebilir:
* Uçuş, konaklama ve aktivite verilerinin farklı platformlarda dağınık hâlde bulunması,
* Belirli bir bütçeyi tüm kategorilere (ulaşım, otel, yemek, eğlence) optimize ederek dağıtmanın zorluğu,
* Turistik noktaların coğrafi yakınlıklarına göre zaman açısından verimli bir şekilde (TSP benzeri) günlere bölünmesinin manuel olarak karmaşık olması,
* Planların dinamik değişikliklere (örneğin uçuş fiyatı artışı) hızlı adapte edilememesi.

### 1.3. PROJENİN AMACI VE ÖNEMİ
Bu projenin amacı; kullanıcıdan alınan basit bir serbest metin girdisinden yola çıkarak, uçtan uca seyahat rotası, uçuş, otel ve günlük aktivite planını otomatik olarak çıkaran, bütçeyi optimize eden yapay zeka destekli bir asistan geliştirmektir. Projenin önemi, manuel işlem yükünü ortadan kaldırması, akıllı bütçe yönetimi sunması ve otomasyon araçlarıyla kullanıcıyı proaktif olarak bilgilendirmesinden (fiyat düşüşü, hava durumu vb.) kaynaklanmaktadır.

### 1.4. PROJENİN KAPSAMI VE HEDEFLERİ
Bu proje kapsamında aşağıdaki bileşenler geliştirilmiştir/geliştirilecektir:
* **LLM Agent ile Doğal Dil Seyahat Planlama:** Kullanıcının serbest metin isteklerini çözümleme.
* **Uçuş ve Otel Arama API Entegrasyonu:** Amadeus/Booking API üzerinden mock/gerçek verilerle fiyat ve imkan karşılaştırması.
* **Dinamik Rota Optimizasyonu:** Google Places ve Leaflet.js ile harita üzerinde gün bazlı rota oluşturma.
* **Bütçe Yönetimi ve Maliyet Optimizasyonu:** Bütçe dağılımı ve alternatif senaryolar sunma.
* **n8n Otomasyon Workflow'ları:** Seyahat planını PDF olarak e-posta atma ve fiyat takibi bildirimleri.
* **React Web Arayüzü:** Adım adım ilerleyen, duyarlı (responsive) bir kullanıcı arayüzü tasarımı.

### 1.5. RAPORUN YAPISI
Bu rapor, çalışmanın literatür arka planını, kullanılan sistem mimarisini ve teknolojileri, elde edilen bulguları ve sonuçları detaylandırmaktadır.

---

## 2. BÖLÜM: LİTERATÜR TARAMASI VE İLGİLİ ÇALIŞMALAR

### 2.1. DİJİTAL SEYAHAT PLANLAMA YAKLAŞIMLARI
Günümüzde seyahat planlama genellikle OTA (Online Travel Agency) platformları üzerinden yürütülmektedir. Skyscanner, Booking gibi sistemler kullanıcılara arama kolaylığı sağlasa da planın tamamını organize edecek "bütünleşik asistan" vizyonundan uzaktır. Geleneksel sistemler sadece kullanıcının girdiği kesin tarihler ve lokasyonlar üzerinden sonuç getirirken, bağlamsal veya esnek taleplere (Örn: "Bütçeme uygun, kültür odaklı bir Avrupa şehri") yanıt verememektedir.

### 2.2. YAPAY ZEKA VE ROTA OPTİMİZASYONU
Literatürde rota optimizasyonu sıklıkla Gezgin Satıcı Problemi (TSP) algoritmaları ile çözülmektedir. Modern sistemlerde ise geleneksel algoritmaların yanı sıra LLM destekli bağlam farkındalığına sahip rotalama önem kazanmıştır.

### 2.3. LİTERATÜR DEĞERLENDİRMESİ VE ARAŞTIRMA BOŞLUĞU
Mevcut platformlar spesifik bir hizmet (sadece uçak veya sadece otel) sunmaktadır. Uçuş, otel, günlük aktivite, bütçe dağılımı ve planın bildirim otomasyonuyla birleştirildiği tek bir zeki sistem (LLM agent) kullanımı alanında önemli bir boşluk bulunmaktadır. Bu proje, tüm bu bileşenleri tek bir asistan altında toplayarak bu boşluğu doldurmayı hedeflemektedir.

---

## 3. BÖLÜM: MATERYAL VE YÖNTEM

### 3.1. SİSTEM MİMARİSİ VE GENEL TASARIM
Sistem mimarisi, istemci-sunucu (client-server) yaklaşımına dayalı olarak tasarlanmıştır. Kullanıcı arayüzü React (Vite) kullanılarak geliştirilmiş, arka uç işlemleri ise Express.js (Node.js) üzerinden yürütülmektedir. Sistem; veri kaynakları (Harici API'ler), zeka katmanı (OpenAI LLM) ve otomasyon katmanı (n8n) olmak üzere modüler bir yapıya sahiptir.

### 3.2. KULLANILAN TEKNOLOJİLER VE ARAÇLAR
* **Frontend:** React.js, Tailwind CSS, React-Leaflet
* **Backend:** Node.js, Express.js
* **Yapay Zeka:** OpenAI API (GPT Modelleri)
* **Harita ve Lokasyon:** Google Places API (veya Foursquare), Leaflet.js
* **Uçuş/Otel:** Amadeus API / Booking API (ve Mock Data katmanı)
* **Otomasyon & Bildirim:** n8n, Nodemailer, PDFKit
* **Veritabanı:** PostgreSQL / Firebase

### 3.3. VERİTABANI TASARIMI VE MODELLEME
Kullanıcıların profil bilgileri, geçmiş seyahat planları (kaydedilen rotalar) ve sistem logları PostgreSQL veya Firebase üzerinde tutulacak şekilde tasarlanmıştır. Bu yapı; `Users` (kullanıcı profilleri), `Itineraries` (oluşturulan seyahat planları) ve `Budgets` (kullanıcı bütçe takip verileri) şemalarını barındırmaktadır.

### 3.4. API ENTEGRASYONU VE VERİ OPTİMİZASYONU
Bu projede klasik içerik yönetiminden ziyade dinamik veri entegrasyonları merkezi rol oynamaktadır. ArXiv yerine seyahat verileri için Amadeus ve Google Places entegrasyonları gerçekleştirilmiştir. Hata toleransını artırmak amacıyla, harici servislerin yanıt vermediği durumlarda "Mock Data Katmanı" devreye girmekte ve sistem işleyişinin kesintiye uğraması engellenmektedir.

### 3.5. KULLANICI TANIMLAMA VE AKTİVİTE İZLEME YAKLAŞIMI
Kullanıcıların sisteme güvenli şekilde kaydolabilmesi ve oluşturdukları seyahat planlarını "Geçmiş Seyahatler" panosunda görebilmeleri için oturum yönetimi (authentication) uygulanmıştır. Kullanıcının platformdaki arama geçmişi ve favori lokasyonları veritabanında tutularak kişiselleştirilmiş öneriler sunulması sağlanmaktadır.

### 3.6. TEST VE KALİTE KONTROL SÜRECİ
Sistemin OpenAI entegrasyonunun parse yeteneği, API veri dönüşlerinin doğruluğu ve harita üzerindeki render süreleri test edilmiştir. n8n otomasyonlarının tetiklenme mekanizmaları manuel senaryolarla doğrulanmıştır.

---

## 4. BÖLÜM: UYGULAMA VE BULGULAR

### 4.1. KULLANICI YÖNETİMİ VE AKTİVİTE İZLEME YAPISI
Kullanıcı profili sayfası aracılığıyla kullanıcılar bütçe grafiklerini ve eski seyahat planlarını PDF olarak indirebilme imkanına sahip olmuştur.

### 4.2. LLM AGENT İLE DOĞAL DİL SEYAHAT PLANLAMA MODÜLÜ
Projenin en yenilikçi kısmı olan doğal dil işleme katmanı başarıyla entegre edilmiştir. "Mayıs'ta 5 günlük 15.000 TL bütçeli İtalya turu" şeklindeki metin, Node.js backend'i tarafından parse edilerek sisteme uygun JSON veri formatına dönüştürülmüş ve ilgili API aramalarını otonom olarak tetiklemiştir.

### 4.3. DİNAMİK ROTA OPTİMİZASYONU VE GÜN GÜN PLAN OLUŞTURMA
Google Places'ten dönen turistik mekan verileri, coğrafi yakınlıklarına göre filtrelenerek Leaflet.js üzerinde gün bazlı (1. Gün, 2. Gün vb.) renk kodlarıyla gösterilmiştir. Kullanıcı deneyimi, etkileşimli timeline ve harita üzerinden sağlanmıştır.

### 4.4. BÜTÇE YÖNETİMİ VE n8n OTOMASYONLARI
Bütçe dağılımı başarıyla hesaplanmış ve görsel grafiklerle kullanıcıya sunulmuştur. Ayrıca plan oluşturulduğunda n8n workflow'u tetiklenerek, Node.js üzerinde `pdfkit` ile oluşturulan Seyahat Itinerary'si `nodemailer` kullanılarak kullanıcının e-posta adresine başarıyla iletilmiştir.

### 4.5. PERFORMANS BULGULARI VE TEST SONUÇLARI
Çoklu API çağrılarının asenkron (Promise.all) yönetilmesi sayesinde yanıt süreleri optimize edilmiştir. Harici API hatalarına karşı mock veri devreye alınarak sistem kararlılığı sağlanmıştır.

---

## 5. BÖLÜM: SONUÇ VE ÖNERİLER

### 5.1. ARAŞTIRMA SONUÇLARININ DEĞERLENDİRİLMESİ
Bu proje ile karmaşık seyahat planlama süreci, LLM desteği sayesinde tek bir metin girişine indirgenmiş, rota optimizasyonu, otel-uçuş seçimi ve bütçe planlaması gibi süreçler tek bir platformda toplanmıştır. Belirlenen proje hedeflerine büyük ölçüde ulaşılmıştır.

### 5.2. KARŞILAŞILAN ZORLUKLAR VE ÇÖZÜMLER
Amadeus ve Google Places gibi farklı API'lerin hız kısıtlamaları (rate limits) ve farklı veri formatları zorluk oluşturmuştur. Bu durum, veri standardizasyonu (normalizasyon) yapılarak ve Mock Veri altyapısı kurularak aşılmıştır. OpenAI maliyetlerini düşürmek için prompt optimizasyonları yapılmıştır.

### 5.3. PROJENİN ÖZGÜN DEĞERİ VE KATKILARI
Çalışmanın özgün değeri, planlama sürecini "kullanıcı arar, bulur" mantığından "kullanıcı ne istediğini söyler, sistem optimize edip sunar" (Agentic yaklaşım) modeline taşımasıdır.

### 5.4. ETİK VE SOSYAL SORUMLULUK DEĞERLENDİRMESİ
Sistem, uçuş ve otel bilgilerini şeffaf bir şekilde sunmakta ve kullanıcı verilerinin güvenliğini standart şifreleme yöntemleri ile korumaktadır.

### 5.5. GELECEK ÇALIŞMALAR İÇİN ÖNERİLER
Gelecekte sisteme anlık hava durumu değişimlerine göre rotayı dinamik güncelleyen bir yapay zeka özelliği eklenebilir. Gerçek zamanlı bilet satın alma entegrasyonları yapılarak sistemin tamamen uçtan uca bir hizmet sağlayıcı olması sağlanabilir.

---
**KAYNAKLAR**
(Projenin akademik referansları, kullanılan API dokümantasyonları ve kütüphanelerin resmi sayfaları bu bölümde yer alacaktır. Örn: React.js Documentation, OpenAI API Reference, Amadeus Developer Portal vb.)
