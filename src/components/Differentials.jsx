import React from 'react';
import { Card, CardDescription, CardTitle } from './ui/card';
import { CheckCircle2 } from 'lucide-react';

const Differentials = () => {
  return (
    <section id="differentials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Diferenciais</h2>
        <p className="text-lg text-gray-600 mb-12">O que nos torna a escolha certa para sua instituição</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[ // Placeholder for differential cards
            {
              title: "Experiência Comprovada",
              description: "Mais de 15 anos de atuação e 60+ projetos supervisionados em hospitais de diversos portes.",
              icon: <CheckCircle2 className="w-8 h-8 text-primary" />
            },
            {
              title: "Metodologia Adaptada",
              description: "Combinamos as melhores práticas do PMI com a realidade e as necessidades do setor de saúde.",
              icon: <CheckCircle2 className="w-8 h-8 text-primary" />
            },
            {
              title: "Foco em Resultados",
              description: "Nossa abordagem é orientada a KPIs e entregas mensuráveis, garantindo o retorno do seu investimento.",
              icon: <CheckCircle2 className="w-8 h-8 text-primary" />
            },
            {
              title: "Rede de Especialistas",
              description: "Uma rede colaborativa de parceiros especializados em engenharia, gestão, acreditação e finanças para resolver problemas complexos.",
              icon: <CheckCircle2 className="w-8 h-8 text-primary" />
            },
            {
              title: "Tecnologia e Inovação",
              description: "Utilizamos ferramentas e abordagens modernas para otimizar processos e garantir a eficiência.",
              icon: <CheckCircle2 className="w-8 h-8 text-primary" />
            },
            {
              title: "Parceria Estratégica",
              description: "Vamos além da consultoria, atuando como parceiros estratégicos para o sucesso de longo prazo da sua instituição.",
              icon: <CheckCircle2 className="w-8 h-8 text-primary" />
            },
          ].map((differential, index) => (
            <Card key={index} className="p-6 text-left flex flex-col items-center">
              <div className="mb-4">{differential.icon}</div>
              <CardTitle className="text-xl font-semibold mb-2 text-center">{differential.title}</CardTitle>
              <CardDescription className="text-center">{differential.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;

