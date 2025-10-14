import React from 'react';
import { Card, CardDescription, CardTitle } from './ui/card';
import { ClipboardCheck, TrendingUp, Award, BarChart3 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Gestão de Projetos Hospitalares",
      description: "Do estudo de viabilidade ao comissionamento e entrega final, garantindo projetos no prazo e orçamento.",
      image: "/gitweb/images/project-management.jpg",
      details: {
        scope: "Planejamento, coordenação, gestão de fornecedores, riscos e cronograma completo.",
        deliverables: ["Project Charter e EAP (WBS)", "Matriz de riscos e logs de decisão", "Relatórios executivos semanais", "Checklist de prontidão para start-up clínico"],
        kpis: ["Dias de atraso evitados", "Percentual de aditivos de contrato", "Taxa de retrabalho no comissionamento"]
      }
    },
    {
      id: 2,
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Redesenho de Processos e Fluxos",
      description: "Mapeamento de fluxos (CME, CC, UTI, Diagnóstico), análise de gargalos e otimização operacional.",
      image: "/gitweb/images/modern-tech.jpg",
      details: {
        scope: "Análise de gargalos, revisão de layout, padronização operacional e aumento de produtividade.",
        deliverables: ["Modelo de capacidade Antes/Depois", "Painel de tempo de ciclo e produtividade", "Plano de estabilização 30-60-90 dias", "Kit de procedimentos operacionais padrão (SOP)"],
        kpis: ["Redução do tempo de turnover de sala", "Diminuição do tempo médio de permanência (LOS)", "Redução de erros de reprocessamento"]
      }
    },
    {
      id: 3,
      icon: <Award className="w-8 h-8" />,
      title: "Preparação para Acreditação",
      description: "Diagnóstico completo de conformidade, planos de ação e suporte durante o ciclo de acreditação (ONA, QMentum, JCI).",
      image: "/gitweb/images/accreditation-meeting.jpg",
      details: {
        scope: "Diagnóstico de gaps, preparação para auditorias simuladas e suporte durante todo o ciclo de acreditação.",
        deliverables: ["Mapa de gaps (RAG Map)", "Matriz de evidências", "Relatório de auditoria simulada", "Painel War Room para acompanhamento"],
        kpis: ["Percentual de gaps fechados no prazo", "Número de não conformidades por auditoria", "Taxa de aprovação na acreditação"]
      }
    },
    {
      id: 4,
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Planejamento Financeiro e de Risco",
      description: "Modelagem de cenários CAPEX/OPEX, análise de ciclo de vida de equipamentos e playbooks de compras.",
      image: "/gitweb/images/financial-data.jpg",
      details: {
        scope: "Modelagem de investimentos, análise de ciclo de vida e elaboração de playbooks de compras e substituição tecnológica.",
        deliverables: ["Modelo CAPEX/OPEX", "Mapa de risco (GUT)", "Scorecards de fornecedores", "Planilhas de TCO e payback"],
        kpis: ["Custos evitados", "Tempo de retorno do investimento (ROI)", "Conformidade com SLAs de fornecedores"]
      }
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
        <p className="text-lg text-gray-600 mb-12">Soluções especializadas para cada desafio hospitalar</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="p-6 text-left">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                {service.icon}
              </div>
              <CardTitle className="text-xl font-semibold mb-2">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

