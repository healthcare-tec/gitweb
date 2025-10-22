import { useState } from 'react';
import './index.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Differentials from './components/Differentials';
import About from './components/About';
import ContactCTA from './components/ContactCTA';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
// import { Button } from './components/ui/button';
// import { FileText, Shield, ClipboardCheck, ArrowRight } from 'lucide-react';
// import { Input } from './components/ui/input';
// import { Label } from './components/ui/label';
// import { Textarea } from './components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
// import { Checkbox } from './components/ui/checkbox';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // leadMagnets e handleSubmit comentados para depuração
  /*
  const leadMagnets = [
    {
      title: "Roteiro de Acreditação<br/>ONA",
      description: "Resumo dos capítulos e critérios oficiais do manual, adaptado para uso prático.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Mapa de Risco (GUT) - Modelo + Tutorial",
      description: "Como priorizar riscos e construir planos de mitigação eficazes.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Guia de Gerenciamento de Projetos Hospitalares",
      description: "Baseado no PMI - áreas de conhecimento, etapas e erros comuns.",
      icon: <ClipboardCheck className="w-6 h-6" />
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
  };
  */

  return (
    <div className="min-h-screen bg-background">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero />
      <Services />
      <Differentials />
      <About />
      <ContactForm />
      <ContactCTA />
      <Footer />


    </div>
  );
}

export default App;

