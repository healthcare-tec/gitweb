import React from 'react';
import { Card, CardDescription, CardTitle } from './ui/card';

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Sobre a Healthcare.tec</h2>
        <p className="text-lg text-gray-600 mb-8">
          Somos uma consultoria especializada em operações hospitalares e gerenciamento de projetos, com foco em transformar desafios complexos em sistemas confiáveis e auditáveis.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Com mais de 60 projetos supervisionados nos últimos 5 anos, nossa experiência abrange desde a preparação para acreditação até a otimização de fluxos operacionais e gestão financeira de ativos hospitalares.
        </p>
        <p className="text-lg text-gray-600 mb-12">
          Nossa abordagem combina vivência prática em operações hospitalares com metodologias reconhecidas internacionalmente, garantindo resultados mensuráveis e sustentáveis para nossos clientes.
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Credenciais e Experiência</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {[ // Placeholder for credentials
            { title: "Avaliador ONA Certificado", description: "Experiência interna nos processos de acreditação" },
            { title: "MBA em Gerenciamento de Projetos", description: "Metodologias PMI aplicadas ao setor de saúde" },
            { title: "Atuação Internacional", description: "Experiência em Peru, Alemanha, Malásia e outros países" },
            { title: "Certificação Change Management 3.0", description: "Gestão de mudanças organizacionais" },
          ].map((credential, index) => (
            <Card key={index} className="p-6">
              <CardTitle className="text-xl font-semibold mb-2">{credential.title}</CardTitle>
              <CardDescription>{credential.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

