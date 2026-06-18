import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PlanPage from './pages/PlanPage.jsx';
import ItineraryPage from './pages/ItineraryPage.jsx';
import ArchivePage from './pages/ArchivePage.jsx';
import './styles.css';

function App() {
  const [savedPlan, setSavedPlan] = useState(null);

  useEffect(() => {
    try {
      const payload = window.localStorage.getItem('planResponse');
      if (payload) setSavedPlan(JSON.parse(payload));
    } catch (error) {
      console.warn('LocalStorage yükleme hatası', error);
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/plan" replace />} />
          <Route path="/plan" element={<PlanPage onPlanCreated={setSavedPlan} />} />
          <Route path="/itinerary" element={<ItineraryPage savedPlan={savedPlan} />} />
          <Route path="/archive" element={<ArchivePage onSelectPlan={setSavedPlan} />} />
          <Route path="*" element={<Navigate to="/plan" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
