import PDFDocument from 'pdfkit';

function pdfSafe(text) {
  return String(text ?? '')
    .replace(/→/g, '->')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'I')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 'S')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'G')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'U')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'O')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C')
    .replace(/⭐/g, '*')
    .replace(/[^\x00-\x7F]/g, '');
}

export function generatePlanPdf(plan) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(20).text('VoyageAI - Seyahat Plani', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor('#666').text(`Olusturulma: ${new Date(plan.createdAt || Date.now()).toLocaleString('tr-TR')}`, { align: 'center' });
      doc.moveDown();
      doc.fillColor('#000');

      doc.fontSize(12).text(`Rota: ${pdfSafe(plan.summary?.route?.join(' -> '))}`);
      doc.text(`Sure: ${plan.summary?.duration || '-'} gun`);
      doc.text(`Tahmini Maliyet: ${pdfSafe(plan.summary?.price)}`);
      doc.text(`Butce Seviyesi: ${pdfSafe(plan.summary?.budgetLabel)}`);
      doc.moveDown();

      if (plan.budget?.breakdownFormatted) {
        doc.fontSize(13).text('Butce Dagilimi', { underline: true });
        doc.fontSize(10);
        doc.text(`Ulasim: ${pdfSafe(plan.budget.breakdownFormatted.flights)}`);
        doc.text(`Konaklama: ${pdfSafe(plan.budget.breakdownFormatted.accommodation)}`);
        doc.text(`Yeme-Icme: ${pdfSafe(plan.budget.breakdownFormatted.food)}`);
        doc.text(`Aktiviteler: ${pdfSafe(plan.budget.breakdownFormatted.activities)}`);
        doc.moveDown();
      }

      if (plan.itinerary?.trip) {
        Object.entries(plan.itinerary.trip).forEach(([city, cityPlan]) => {
          doc.fontSize(14).text(pdfSafe(city), { underline: true });
          doc.fontSize(10).text(
            `${pdfSafe(cityPlan.info.accommodation.name)} | ${pdfSafe(cityPlan.info.flight.airline)} | ${pdfSafe(cityPlan.info.flight.duration)}`
          );
          doc.moveDown(0.3);

          cityPlan.days.forEach((day) => {
            doc.fontSize(11).text(`${pdfSafe(day.label)} (${day.date})`);
            doc.fontSize(9).fillColor('#333');
            doc.text(`  Kahvalti: ${pdfSafe(day.breakfast.name)}`);
            doc.text(`  Ogle: ${pdfSafe(day.lunch.name)}`);
            doc.text(`  Aksam Yemegi: ${pdfSafe(day.dinner?.name || '-')}`);
            doc.text(`  Gezi: ${pdfSafe(day.visit.name)} (${pdfSafe(day.visit.category?.join(', '))})`);
            doc.text(
              `  Etkinlik: ${pdfSafe(day.evening.name)} - ${pdfSafe(day.evening.type)} @ ${pdfSafe(day.evening.time)} (${pdfSafe(day.evening.venue)})`
            );
            doc.fillColor('#000');
            doc.moveDown(0.2);
          });
          doc.moveDown(0.5);
        });
      }

      doc.fontSize(8).fillColor('#999').text('VoyageAI - AI Destekli Seyahat Planlama Asistani', { align: 'center' });
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
