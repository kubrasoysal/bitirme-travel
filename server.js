import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { generatePlanPdf } from './backend/pdf.js';
import { generatePlan, getSupportedCities, sendPlanEmail, fetchHotelOptions, fetchPlaceOptions, estimateFlight, parseNaturalInput } from './backend/service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 4000;
const distPath = path.join(__dirname, 'dist');

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

app.get('/api/cities', async (req, res) => {
  try {
    const cities = await getSupportedCities();
    res.json({ cities });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Şehir listesi alınamadı.' });
  }
});

app.post('/api/parse', (req, res) => {
  try {
    const { naturalInput } = req.body;
    if (!naturalInput) {
      return res.status(400).json({ error: 'Metin gereklidir.' });
    }
    const parsed = parseNaturalInput(naturalInput);
    res.json({ parsed });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Parse edilemedi.' });
  }
});

app.post('/api/plan', async (req, res) => {
  try {
    const plan = await generatePlan(req.body);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Plan oluşturulamadı.' });
  }
});

app.post('/api/pdf', async (req, res) => {
  try {
    const { plan } = req.body;
    if (!plan) {
      return res.status(400).json({ error: 'Plan gereklidir.' });
    }

    const buffer = await generatePlanPdf(plan);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="voyageai-seyahat-plani.pdf"');
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (error) {
    console.error('PDF hatasi:', error);
    res.status(500).json({ error: error.message || 'PDF olusturulamadi.' });
  }
});

app.get('/api/search/hotels', async (req, res) => {
  try {
    const hotelOptions = await fetchHotelOptions(req.query);
    res.json({ hotels: hotelOptions });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Oteller alınamadı.' });
  }
});

app.get('/api/search/places', async (req, res) => {
  try {
    const placeOptions = await fetchPlaceOptions(req.query);
    res.json({ places: placeOptions });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Mekanlar alınamadı.' });
  }
});

app.get('/api/quote/flight', async (req, res) => {
  try {
    const quote = await estimateFlight(req.query);
    res.json({ flight: quote });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Uçuş teklifi alınamadı.' });
  }
});

app.post('/api/email', async (req, res) => {
  try {
    const { email, plan } = req.body;
    if (!email || !plan) {
      return res.status(400).json({ error: 'E-posta adresi ve plan gereklidir.' });
    }
    const result = await sendPlanEmail(plan, email);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message || 'E-posta gönderilemedi.' });
  }
});

app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API bulunamadı.' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Backend çalışıyor: http://localhost:${port}`);
});
