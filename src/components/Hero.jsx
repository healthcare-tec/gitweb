import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import images from '../lib/utils/images';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[600px] flex items-center" style={{
      backgroundImage: `url(${images.accreditation})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-green-500/90"></div>
      
      {/* Conteúdo */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-white text-sm font-semibold mb-6">
            ENGINEERING HEALTH
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Eficiência também salva vidas
          </h1>
          <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto">
            Da ideação e planejamento à excelência operacional e acreditação — transformamos projetos e processos hospitalares em sistemas confiáveis que entregam cuidado seguro, no prazo e em conformidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => scrollToSection('contact')} className="text-lg px-8">
              Agendar Diagnóstico de 20 min
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('services')} className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              Conheça nossos serviços
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

