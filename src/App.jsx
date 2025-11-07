import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';
import HospitalsPage from './pages/HospitalsPage';
import EmpresasPage from './pages/EmpresasPage';
import VeterinariaPage from './pages/VeterinariaPage';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        
        <Routes>
          <Route path="/" element={<HospitalsPage />} />
          <Route path="/empresas" element={<EmpresasPage />} />
          <Route path="/veterinaria" element={<VeterinariaPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

