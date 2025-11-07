import React from 'react';
import { Card, CardDescription, CardTitle } from '../ui/card';
import { TrendingUp, Shield, AlertTriangle, BarChart3 } from 'lucide-react';
import images from '../../lib/utils/images';

const ServicesEmpresas = () => {
  const services = [
    {
      id: 1,
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Estudos de Mercado e Viabilidade",
      description: "Levantamento das necessidades regionais e de competidores para análise de entrada no mercado brasileiro de saúde.",
      image: images.projectManagement,
      details: {
        scope: "Pesquisa de mercado, análise competitiva, identificação de oportunidades e barreiras de entrada.",
        deliverables: ["Relatório de Inteligência de Mercado", "Análise SWOT do setor", "Mapeamento de stakeholders", "Recomendações estratégicas de entrada"],
        kpis: ["Potencial de mercado identificado", "Número de oportunidades mapeadas", "Taxa de precisão das previsões"]
      }
    },
    {
      id: 2,
      icon: <Shield className="w-8 h-8" />,
      title: "Inteligência Regulatória e Estratégia de Acesso",
      description: "Mapeamento de barreiras regulatórias (Anvisa, Conitec, SUS, ONA, QMentum, JCI) e tradução de manuais técnicos.",
      image: images.accreditation,
      details: {
        scope: "Navegação regulatória, tradução técnica certificada, adequação cultural e compliance.",
        deliverables: ["Roadmap regulatório completo", "Manuais traduzidos e adaptados", "Checklist de conformidade", "Plano de relacionamento institucional"],
        kpis: ["Tempo de aprovação regulatória", "Taxa de conformidade documental", "Redução de retrabalho"]
      }
    },
    {
      id: 3,
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Risk Intelligence",
      description: "Aplicação de framework para avaliação de risco e planejamento de contingências no mercado brasileiro.",
      image: images.teamCollaboration,
      details: {
        scope: "Identificação, análise e mitigação de riscos operacionais, regulatórios, financeiros e reputacionais.",
        deliverables: ["Matriz de Riscos (GUT)", "Planos de contingência", "Protocolo de gestão de crises", "Dashboard de monitoramento"],
        kpis: ["Riscos críticos identificados", "Tempo de resposta a incidentes", "Taxa de mitigação efetiva"]
      }
    },
    {
      id: 4,
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Estudos de Demanda e Planejamento Regional",
      description: "Modelagem de oferta e demanda hospitalar com base em dados públicos e projeções regionais.",
      image: images.modernTech,
      details: {
        scope: "Análise demográfica, epidemiológica e econômica para dimensionamento de serviços de saúde.",
        deliverables: ["Modelo de oferta e demanda", "Análise de viabilidade regional", "Projeções de crescimento", "Recomendações de localização"],
        kpis: ["Precisão das projeções", "Áreas de oportunidade identificadas", "ROI projetado"]
      }
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Serviços para Empresas</h2>
        <p className="text-lg text-gray-600 mb-12">Soluções estratégicas para entrada e expansão no mercado de saúde brasileiro</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="p-0 text-left overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Imagem do serviço */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/90 text-primary">
                  {service.icon}
                </div>
              </div>
              
              {/* Conteúdo do card */}
              <div className="p-6">
                <CardTitle className="text-xl font-semibold mb-2">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesEmpresas;

