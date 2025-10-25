import React from 'react';
import { AlertTriangle, Clock, TrendingDown, FileX, Users, DollarSign } from 'lucide-react';

const PainPoints = () => {
  const painPoints = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Atrasos e Estouro de Prazos",
      description: "Projetos hospitalares que se arrastam por meses além do previsto, comprometendo a abertura de novos serviços e gerando custos extras."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Orçamentos Descontrolados",
      description: "Custos que fogem do planejado, sem visibilidade clara de onde os recursos estão sendo consumidos e sem controle financeiro adequado."
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Não Conformidades e Riscos",
      description: "Processos operacionais que não atendem aos requisitos de acreditação, expondo a instituição a riscos sanitários e jurídicos."
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Ineficiência Operacional",
      description: "Fluxos desorganizados que geram gargalos, retrabalho e desperdício de recursos, impactando diretamente a qualidade do atendimento."
    },
    {
      icon: <FileX className="w-8 h-8" />,
      title: "Falta de Documentação",
      description: "Ausência de processos documentados e padronizados, dificultando auditorias, treinamentos e a manutenção da qualidade."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Equipes Sobrecarregadas",
      description: "Profissionais de saúde dedicando tempo excessivo a tarefas administrativas e operacionais mal estruturadas."
    }
  ];

  return (
    <section id="pain-points" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Desafios que Comprometem a Excelência Hospitalar
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sabemos que gestores hospitalares enfrentam diariamente problemas complexos que impactam a qualidade do atendimento, a segurança dos pacientes e a sustentabilidade financeira da instituição.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {painPoints.map((pain, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-destructive">
                  {pain.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{pain.title}</h3>
                  <p className="text-muted-foreground">{pain.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-semibold text-foreground">
            Esses desafios não precisam ser permanentes. Nossa expertise transforma essas dores em oportunidades de melhoria.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;

