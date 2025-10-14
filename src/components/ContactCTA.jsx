import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para transformar a gestão do seu hospital?
        </h2>
        <p className="text-lg mb-8">
          Agende um diagnóstico gratuito de 20 minutos e descubra como podemos otimizar suas operações e impulsionar seus resultados.
        </p>
        <Button size="lg" className="text-lg px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
          Agendar Diagnóstico Gratuito
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default ContactCTA;

