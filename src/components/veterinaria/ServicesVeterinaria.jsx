import React from 'react';
import { Card, CardDescription, CardTitle } from '../ui/card';
import { ClipboardCheck, Building2, Package, Wrench } from 'lucide-react';
import images from '../../lib/utils/images';

const ServicesVeterinaria = () => {
  const services = [
    {
      id: 1,
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Planejamento e Viabilidade",
      description: "Estudo de viabilidade técnica e financeira, dimensionamento de áreas e definição de layout funcional.",
      image: images.projectManagement,
      details: {
        scope: "Análise de mercado veterinário, dimensionamento de serviços, planejamento financeiro e regulatório.",
        deliverables: ["Estudo de viabilidade completo", "Programa de necessidades", "Layout conceitual", "Orçamento preliminar"],
        kpis: ["Precisão do orçamento", "Adequação às normas veterinárias", "Otimização de espaços"]
      }
    },
    {
      id: 2,
      icon: <Building2 className="w-8 h-8" />,
      title: "Gestão de Projeto e Construção",
      description: "Coordenação completa do projeto arquitetônico, estrutural, hidráulico, elétrico e de climatização.",
      image: images.teamCollaboration,
      details: {
        scope: "Gestão de projetos complementares, coordenação de fornecedores, acompanhamento de obra e controle de qualidade.",
        deliverables: ["Cronograma detalhado", "Gestão de contratos", "Relatórios de progresso", "Controle de qualidade de obra"],
        kpis: ["Prazo de entrega", "Conformidade com projeto", "Controle de custos"]
      }
    },
    {
      id: 3,
      icon: <Package className="w-8 h-8" />,
      title: "Especificação e Aquisição de Equipamentos",
      description: "Seleção técnica de equipamentos veterinários, negociação com fornecedores e gestão de compras.",
      image: images.modernTech,
      details: {
        scope: "Especificação técnica, cotação, negociação, importação (se necessário) e recebimento de equipamentos.",
        deliverables: ["Lista técnica de equipamentos", "Comparativo de fornecedores", "Contratos negociados", "Cronograma de entregas"],
        kpis: ["Custo-benefício", "Prazo de entrega", "Conformidade técnica"]
      }
    },
    {
      id: 4,
      icon: <Wrench className="w-8 h-8" />,
      title: "Comissionamento e Start-up",
      description: "Instalação, testes, treinamento de equipe e preparação para início das operações.",
      image: images.accreditation,
      details: {
        scope: "Instalação de equipamentos, testes de funcionamento, treinamento operacional e validação final.",
        deliverables: ["Checklist de comissionamento", "Relatórios de testes", "Treinamento de equipe", "Certificado de prontidão operacional"],
        kpis: ["Taxa de aprovação nos testes", "Tempo de start-up", "Satisfação da equipe treinada"]
      }
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Serviços para Hospitais Veterinários</h2>
        <p className="text-lg text-gray-600 mb-12">Do planejamento à entrega: seu hospital veterinário pronto para operar</p>
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

export default ServicesVeterinaria;

