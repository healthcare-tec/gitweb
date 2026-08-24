import { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  Play,
  RotateCcw,
  X,
} from 'lucide-react';
import { fluidApi } from '../lib/fluidApi';
import { Button } from './ui/button';

const fieldClassName =
  'mt-2 flex h-10 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300';

const textAreaClassName =
  'mt-2 flex min-h-24 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300';

const initialForm = {
  reference: `HC-${new Date().getFullYear()}-FLOW`,
  title: 'Simulação inicial de fluxo',
  scope: 'Avaliar filas, capacidade e desempenho do fluxo hospitalar.',
  responsibleName: '',
  responsibleEmail: '',
  organization: '',
  replications: '1',
  randomSeed: '1',
  duration: '1440',
};

const wait = (milliseconds) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });

const getErrorMessage = (error) =>
  error instanceof Error
    ? error.message
    : 'Não foi possível concluir a operação no Fluid.';

const FluidSimulationPanel = ({ onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [model, setModel] = useState(null);
  const [modelState, setModelState] = useState('loading');
  const [modelErrors, setModelErrors] = useState([]);
  const [runState, setRunState] = useState('idle');
  const [runError, setRunError] = useState('');
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    let active = true;

    const loadModel = async () => {
      try {
        const response = await fluidApi.getDefaultModel();
        const defaultModel = response?.model;

        if (!defaultModel) {
          throw new Error('O modelo padrão do Flow Simulation não foi encontrado.');
        }

        const validation = await fluidApi.validateModel({ model: defaultModel });
        if (!active) return;

        setModel(defaultModel);
        setModelErrors(Array.isArray(validation?.errors) ? validation.errors : []);
        setModelState(validation?.valid ? 'ready' : 'invalid');
      } catch (error) {
        if (!active) return;
        setRunError(getErrorMessage(error));
        setModelState('error');
      }
    };

    loadModel();

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const pollEvaluation = async (evaluationId) => {
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const detail = await fluidApi.getEvaluation(evaluationId);
      setEvaluation(detail);

      if (detail.status === 'completed') {
        setRunState('completed');
        return;
      }

      if (detail.status === 'failed') {
        throw new Error(detail.error_message || 'A avaliação falhou no serviço Fluid.');
      }

      await wait(2000);
    }

    throw new Error('A avaliação excedeu o tempo de acompanhamento da página.');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRunError('');
    setEvaluation(null);
    setRunState('submitting');

    try {
      if (modelState !== 'ready' || !model) {
        throw new Error('O modelo padrão ainda não está validado.');
      }

      const project = await fluidApi.createProject({
        reference: form.reference.trim(),
        service_type: 'flow_simulation',
        title: form.title.trim() || null,
        scope: form.scope.trim(),
        responsible: {
          name: form.responsibleName.trim(),
          email: form.responsibleEmail.trim() || null,
        },
        requester: {
          organization: form.organization.trim() || null,
        },
      });

      const idempotencyKey = `site-${project.id}-${Date.now()}`;
      const created = await fluidApi.createEvaluation(
        project.id,
        {
          input: model,
          overrides: {
            replications: Number(form.replications),
            random_seed: Number(form.randomSeed),
            sim_duration_minutes: Number(form.duration),
          },
        },
        idempotencyKey
      );

      setRunState('tracking');
      await pollEvaluation(created.evaluation_id);
    } catch (error) {
      setRunError(getErrorMessage(error));
      setRunState('error');
    }
  };

  const resetRun = () => {
    setEvaluation(null);
    setRunError('');
    setRunState('idle');
  };

  const summary = evaluation?.result?.summary;
  const metrics = evaluation?.result?.metrics;

  return (
    <div className="mt-6 border-t border-white/10 pt-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-200">
            Flow Simulation
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Crie um projeto, valide o modelo padrão e acompanhe uma avaliação
            assíncrona do fluxo hospitalar.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Fechar Flow Simulation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {modelState === 'loading' && (
        <p className="mt-5 flex items-center gap-2 text-sm text-slate-300" role="status">
          <Loader2 className="h-4 w-4 animate-spin" />
          Carregando e validando o modelo padrão...
        </p>
      )}

      {modelState === 'invalid' && (
        <div className="mt-5 rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
          <p className="flex items-center gap-2 font-semibold">
            <AlertCircle className="h-4 w-4" />
            O modelo padrão precisa de correção antes da execução.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {modelErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {modelState === 'error' && (
        <div className="mt-5 rounded-lg border border-rose-300/30 bg-rose-300/10 p-4 text-sm text-rose-100" role="alert">
          {runError}
        </div>
      )}

      {modelState === 'ready' && runState !== 'completed' && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-200">
              Referência *
              <input
                className={fieldClassName}
                name="reference"
                required
                maxLength={120}
                value={form.reference}
                onChange={handleChange}
              />
            </label>
            <label className="text-sm text-slate-200">
              Organização
              <input
                className={fieldClassName}
                name="organization"
                value={form.organization}
                onChange={handleChange}
                placeholder="Hospital ou instituição"
              />
            </label>
          </div>

          <label className="block text-sm text-slate-200">
            Título
            <input
              className={fieldClassName}
              name="title"
              maxLength={240}
              value={form.title}
              onChange={handleChange}
            />
          </label>

          <label className="block text-sm text-slate-200">
            Escopo *
            <textarea
              className={textAreaClassName}
              name="scope"
              required
              value={form.scope}
              onChange={handleChange}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-200">
              Responsável *
              <input
                className={fieldClassName}
                name="responsibleName"
                required
                value={form.responsibleName}
                onChange={handleChange}
                placeholder="Nome completo"
              />
            </label>
            <label className="text-sm text-slate-200">
              E-mail do responsável
              <input
                className={fieldClassName}
                name="responsibleEmail"
                type="email"
                value={form.responsibleEmail}
                onChange={handleChange}
                placeholder="responsavel@hospital.org"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="text-sm text-slate-200">
              Replicações
              <input
                className={fieldClassName}
                name="replications"
                type="number"
                min="1"
                max="100"
                value={form.replications}
                onChange={handleChange}
              />
            </label>
            <label className="text-sm text-slate-200">
              Semente
              <input
                className={fieldClassName}
                name="randomSeed"
                type="number"
                value={form.randomSeed}
                onChange={handleChange}
              />
            </label>
            <label className="text-sm text-slate-200">
              Duração (min)
              <input
                className={fieldClassName}
                name="duration"
                type="number"
                min="1"
                max="10080"
                value={form.duration}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              size="lg"
              disabled={runState === 'submitting' || runState === 'tracking'}
              className="bg-cyan-400 text-slate-950 hover:bg-cyan-300"
            >
              {runState === 'submitting' ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Criando avaliação...
                </>
              ) : runState === 'tracking' ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Acompanhando execução...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Executar simulação
                </>
              )}
            </Button>
            <span className="text-xs text-slate-400">
              Modelo padrão validado · contrato 1.0
            </span>
          </div>
        </form>
      )}

      {runState === 'tracking' && (
        <p className="mt-5 flex items-center gap-2 text-sm text-slate-300" role="status" aria-live="polite">
          <Clock3 className="h-4 w-4" />
          A avaliação está sendo executada. Esta página atualizará o status.
        </p>
      )}

      {runState === 'error' && (
        <div className="mt-5 rounded-lg border border-rose-300/30 bg-rose-300/10 p-4" role="alert">
          <p className="text-sm text-rose-100">{runError}</p>
          <Button
            type="button"
            variant="outline"
            onClick={resetRun}
            className="mt-3 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Nova simulação
          </Button>
        </div>
      )}

      {runState === 'completed' && (
        <div className="mt-5 space-y-4" role="status" aria-live="polite">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">Simulação concluída</span>
          </div>
          <p className="text-sm text-slate-300">
            Avaliação <span className="font-mono">{evaluation?.id}</span> concluída para o projeto{' '}
            <span className="font-mono">{evaluation?.project_id}</span>.
          </p>
          <div className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
            <p className="text-sm font-semibold text-cyan-200">Resumo</p>
            <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap text-xs text-slate-200">
              {JSON.stringify(summary, null, 2)}
            </pre>
          </div>
          <details className="rounded-lg border border-white/10 bg-slate-900/50 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-200">
              Ver métricas estruturadas
            </summary>
            <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap text-xs text-slate-300">
              {JSON.stringify(metrics, null, 2)}
            </pre>
          </details>
          <Button
            type="button"
            variant="outline"
            onClick={resetRun}
            className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Executar outra simulação
          </Button>
        </div>
      )}
    </div>
  );
};

export default FluidSimulationPanel;
