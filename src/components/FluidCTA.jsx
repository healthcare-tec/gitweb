import React from 'react';
import { ArrowRight, BarChart3, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';

const FluidCTA = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="fluid" className="py-16 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              <BarChart3 className="w-4 h-4" />
              Fluid · análise de fluxos hospitalares
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold">
              Simule cenários antes de tomar decisões operacionais
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              O Fluid transforma dados de demanda, capacidade e rotas em
              indicadores de filas, atendimento, throughput e SLA para apoiar
              decisões mais seguras.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-cyan-400 text-slate-950 hover:bg-cyan-300"
              >
                Solicitar acesso
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <span className="inline-flex items-center justify-center gap-2 px-4 text-sm text-slate-300">
                <ShieldCheck className="w-5 h-5 text-cyan-300" />
                Área protegida e por convite
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-200">
              O que a área Fluid oferecerá
            </p>
            <ul className="mt-5 space-y-4 text-slate-200">
              <li>Criação de projetos de análise por organização</li>
              <li>Validação do modelo antes da execução</li>
              <li>Acompanhamento de avaliações assíncronas</li>
              <li>Resultados e indicadores estruturados</li>
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm text-slate-400">
              O acesso será liberado após autenticação. Nenhum token da API é
              enviado ao navegador.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FluidCTA;
