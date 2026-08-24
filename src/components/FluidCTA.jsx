import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Loader2,
  LogIn,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { fluidApi } from '../lib/fluidApi';
import FluidSimulationPanel from './FluidSimulationPanel';
import { Button } from './ui/button';

const FluidCTA = () => {
  const [accessState, setAccessState] = useState('idle');
  const [serviceTypes, setServiceTypes] = useState([]);
  const [simulationOpen, setSimulationOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const checkFluidAccess = async () => {
    setAccessState('loading');
    setErrorMessage('');

    try {
      const payload = await fluidApi.listServiceTypes();
      const items = Array.isArray(payload?.items) ? payload.items : [];
      setServiceTypes(items);
      setSimulationOpen(false);
      setAccessState(items.length ? 'ready' : 'empty');
    } catch (error) {
      if (error?.code === 'ACCESS_REQUIRED') {
        setAccessState('auth');
      } else {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Não foi possível consultar o Fluid.'
        );
        setAccessState('error');
      }
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
                onClick={checkFluidAccess}
                disabled={accessState === 'loading'}
                className="bg-cyan-400 text-slate-950 hover:bg-cyan-300"
              >
                {accessState === 'loading' ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Verificando acesso...
                  </>
                ) : (
                  <>
                    Verificar acesso
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
              <span className="inline-flex items-center justify-center gap-2 px-4 text-sm text-slate-300">
                <ShieldCheck className="w-5 h-5 text-cyan-300" />
                Área protegida e por convite
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-200">
              Acesso ao Fluid
            </p>

            {accessState === 'idle' && (
              <div className="mt-5 space-y-4">
                <p className="text-slate-200">
                  Consulte o ambiente protegido para verificar se sua conta
                  possui acesso aos serviços de simulação.
                </p>
                <p className="text-sm text-slate-400">
                  A autenticação acontece pelo Cloudflare Access e o token da
                  API permanece exclusivamente no Worker.
                </p>
              </div>
            )}

            {accessState === 'loading' && (
              <p className="mt-5 text-slate-300" role="status" aria-live="polite">
                Conectando ao endpoint protegido...
              </p>
            )}

            {accessState === 'auth' && (
              <div className="mt-5 space-y-4">
                <p className="text-slate-200">
                  Sua sessão ainda não está autenticada no Cloudflare Access.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-slate-950 hover:bg-slate-200"
                >
                  <a href="/api/fluid/service-types">
                    <LogIn className="mr-2 w-5 h-5" />
                    Entrar com Cloudflare Access
                  </a>
                </Button>
                <p className="text-sm text-slate-400">
                  Depois do login, volte a esta página e clique em “Verificar
                  acesso” novamente.
                </p>
              </div>
            )}

            {accessState === 'ready' && (
              <div className="mt-5 space-y-4" role="status" aria-live="polite">
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">Acesso confirmado</span>
                </div>
                <ul className="space-y-3 text-slate-200">
                  {serviceTypes.map((service) => (
                    <li
                      key={service.id}
                      className="rounded-lg border border-white/10 bg-slate-900/60 p-3"
                    >
                      <p className="font-medium">{service.id}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        Contrato {service.contract_version} · adaptador{' '}
                        {service.adapter_version}
                      </p>
                    </li>
                  ))}
                </ul>
                {serviceTypes.some((service) => service.id === 'flow_simulation') && (
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => setSimulationOpen(true)}
                    className="w-full bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                  >
                    Abrir Flow Simulation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
                {simulationOpen && (
                  <FluidSimulationPanel
                    onClose={() => setSimulationOpen(false)}
                  />
                )}
              </div>
            )}

            {accessState === 'empty' && (
              <div className="mt-5 space-y-3 text-slate-200" role="status">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  Sessão autenticada, mas nenhum serviço foi publicado ainda.
                </p>
              </div>
            )}

            {accessState === 'error' && (
              <div className="mt-5 space-y-4" role="alert">
                <p className="flex items-start gap-2 text-rose-200">
                  <XCircle className="mt-0.5 w-5 h-5 shrink-0" />
                  {errorMessage}
                </p>
                <Button
                  variant="outline"
                  onClick={checkFluidAccess}
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <RefreshCw className="mr-2 w-4 h-4" />
                  Tentar novamente
                </Button>
              </div>
            )}

            <div className="mt-6 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={scrollToContact}
                className="text-sm text-cyan-200 underline-offset-4 hover:underline"
              >
                Ainda não possui convite? Solicite acesso.
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FluidCTA;
