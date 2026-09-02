const API_PREFIX = "/api/fluid";
const STORAGE_KEY = "healthcare-fluid-process-map-v1";
const TRIAGE_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

const elements = {};
let processMap = null;
let projectDraft = {};
let selectedNodeId = null;
let selectedEdgeId = null;
let connectionMode = false;
let connectionSource = null;
let saveTimer = null;
let mapIsValid = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function numberValue(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function showStatus(message, kind = "loading") {
  elements.status.hidden = false;
  elements.status.className = `status ${kind}`;
  elements.status.innerHTML = message;
  elements.status.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideStatus() {
  elements.status.hidden = true;
}

function accessRequired(error) {
  return error?.code === "ACCESS_REQUIRED" || error?.message === "AUTH_REQUIRED";
}

async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");
  let response;
  try {
    response = await fetch(API_PREFIX + path, {
      ...options,
      headers,
      credentials: "include",
    });
  } catch (cause) {
    const error = new Error("AUTH_REQUIRED");
    error.code = "ACCESS_REQUIRED";
    error.cause = cause;
    throw error;
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html") || response.url.includes("/cdn-cgi/access/")) {
    const error = new Error("AUTH_REQUIRED");
    error.code = "ACCESS_REQUIRED";
    throw error;
  }

  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();
  if (!response.ok) {
    const detail = payload?.detail || payload?.error || "A solicitação à API não foi concluída.";
    const error = new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

function readDraft() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (value?.processMap?.version === "1.0") {
      processMap = value.processMap;
      projectDraft = value.project || {};
      return true;
    }
  } catch (_error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  return false;
}

function scheduleSave() {
  mapIsValid = false;
  updateChecklist();
  elements.saveState.textContent = "Salvando rascunho…";
  elements.saveState.classList.remove("saved");
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ processMap, project: projectDraft }));
    elements.saveState.textContent = "Rascunho salvo";
    elements.saveState.classList.add("saved");
  }, 350);
}

function cacheElements() {
  Object.assign(elements, {
    accessGate: $("#access-gate"), workspace: $("#workspace"), status: $("#status"),
    saveState: $("#save-state"), mapName: $("#map-name"), canvas: $("#process-canvas"),
    nodeLayer: $("#node-layer"), edgeLines: $("#edge-lines"), edgeList: $("#edge-list"),
    connectionHint: $("#connection-hint"), inspectorEmpty: $("#inspector-empty"),
    nodeForm: $("#node-form"), edgeForm: $("#edge-form"), processFields: $("#process-fields"),
    demandGrid: $("#demand-grid"), triageMix: $("#triage-mix"), dailyDemand: $("#daily-demand"),
    triageTotal: $("#triage-total"), projectForm: $("#project-form"),
    resultPanel: $("#result-panel"), resultTitle: $("#result-title"),
    resultBadge: $("#result-badge"), resultSummary: $("#result-summary"), resultJson: $("#result-json"),
  });
}

function nodeById(nodeId) {
  return processMap.nodes.find((node) => node.id === nodeId);
}

function edgeById(edgeId) {
  return processMap.edges.find((edge) => edge.id === edgeId);
}

function nodeLabel(nodeId) {
  return nodeById(nodeId)?.name || nodeId;
}

function renderAll() {
  elements.mapName.value = processMap.name;
  renderNodes();
  renderEdges();
  renderEdgeList();
  renderInspector();
  renderDemand();
  renderSettings();
  restoreProjectDraft();
  updateChecklist();
}

function renderNodes() {
  elements.nodeLayer.innerHTML = "";
  for (const node of processMap.nodes) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `process-node ${node.type}`;
    if (selectedNodeId === node.id) card.classList.add("selected");
    if (connectionSource === node.id) card.classList.add("connect-source");
    card.dataset.nodeId = node.id;
    card.style.left = `${node.position.x}px`;
    card.style.top = `${node.position.y}px`;
    const meta = node.type === "process"
      ? `${node.configuration.capacity} recurso(s) · ${node.configuration.time_mean} min`
      : node.type === "start" ? "Início do fluxo" : "Fim do fluxo";
    card.innerHTML = `${node.type !== "start" ? '<span class="node-port input"></span>' : ""}<span class="node-type">${node.type === "process" ? escapeHtml(node.id) : node.type}</span><span class="node-name">${escapeHtml(node.name)}</span><span class="node-meta">${escapeHtml(meta)}</span>${node.type !== "end" ? '<span class="node-port output"></span>' : ""}`;
    card.addEventListener("click", () => handleNodeClick(node.id));
    card.addEventListener("pointerdown", (event) => beginDrag(event, node.id, card));
    elements.nodeLayer.appendChild(card);
  }
}

function beginDrag(event, nodeId, card) {
  if (connectionMode || event.button !== 0) return;
  const node = nodeById(nodeId);
  const startX = event.clientX;
  const startY = event.clientY;
  const originX = node.position.x;
  const originY = node.position.y;
  let moved = false;
  card.setPointerCapture?.(event.pointerId);

  const move = (moveEvent) => {
    const dx = moveEvent.clientX - startX;
    const dy = moveEvent.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    node.position.x = Math.max(10, originX + dx);
    node.position.y = Math.max(10, originY + dy);
    card.style.left = `${node.position.x}px`;
    card.style.top = `${node.position.y}px`;
    renderEdges();
  };
  const end = () => {
    card.removeEventListener("pointermove", move);
    card.removeEventListener("pointerup", end);
    card.removeEventListener("pointercancel", end);
    if (moved) scheduleSave();
  };
  card.addEventListener("pointermove", move);
  card.addEventListener("pointerup", end);
  card.addEventListener("pointercancel", end);
}

function nodeCenter(node) {
  const terminal = node.type !== "process";
  return {
    x: node.position.x + (terminal ? 70 : 95),
    y: node.position.y + (terminal ? 35 : 46),
  };
}

function renderEdges() {
  if (!processMap) return;
  elements.edgeLines.innerHTML = "";
  for (const edge of processMap.edges) {
    const source = nodeById(edge.source);
    const target = nodeById(edge.target);
    if (!source || !target) continue;
    const a = nodeCenter(source);
    const b = nodeCenter(target);
    const direction = b.x >= a.x ? 1 : -1;
    const sourceWidth = source.type === "process" ? 95 : 70;
    const targetWidth = target.type === "process" ? 95 : 70;
    const x1 = a.x + direction * sourceWidth;
    const x2 = b.x - direction * targetWidth;
    const bend = Math.max(55, Math.abs(x2 - x1) * .42);
    const pathData = `M ${x1} ${a.y} C ${x1 + direction * bend} ${a.y}, ${x2 - direction * bend} ${b.y}, ${x2} ${b.y}`;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("class", `edge-path${selectedEdgeId === edge.id ? " selected" : ""}`);
    path.style.pointerEvents = "stroke";
    path.addEventListener("click", () => selectEdge(edge.id));
    elements.edgeLines.appendChild(path);
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String((x1 + x2) / 2));
    label.setAttribute("y", String((a.y + b.y) / 2 - 8));
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("class", "edge-label");
    label.textContent = `${Math.round(edge.probability * 1000) / 10}%`;
    elements.edgeLines.appendChild(label);
  }
}

function renderEdgeList() {
  if (!processMap.edges.length) {
    elements.edgeList.innerHTML = '<span class="field-help">Nenhuma conexão configurada.</span>';
    return;
  }
  elements.edgeList.innerHTML = processMap.edges.map((edge) =>
    `<button type="button" class="edge-chip${selectedEdgeId === edge.id ? " active" : ""}" data-edge-id="${escapeHtml(edge.id)}">${escapeHtml(nodeLabel(edge.source))} → ${escapeHtml(nodeLabel(edge.target))}<span>${Math.round(edge.probability * 1000) / 10}%</span></button>`
  ).join("");
  $$(".edge-chip").forEach((chip) => chip.addEventListener("click", () => selectEdge(chip.dataset.edgeId)));
}

function handleNodeClick(nodeId) {
  if (!connectionMode) {
    selectNode(nodeId);
    return;
  }
  const node = nodeById(nodeId);
  if (!connectionSource) {
    if (node.type === "end") {
      showStatus("A etapa de saída não pode ser a origem de uma conexão.", "error");
      return;
    }
    connectionSource = nodeId;
    renderNodes();
    elements.connectionHint.firstChild.textContent = `Origem: ${node.name}. Agora selecione o destino. `;
    return;
  }
  if (nodeId === connectionSource) {
    showStatus("Selecione uma etapa de destino diferente da origem.", "error");
    return;
  }
  if (node.type === "start") {
    showStatus("A entrada START não pode receber conexões.", "error");
    return;
  }
  if (processMap.edges.some((edge) => edge.source === connectionSource && edge.target === nodeId)) {
    showStatus("Esse caminho já existe.", "error");
    return;
  }
  const source = connectionSource;
  processMap.edges.push({
    id: uniqueEdgeId(source, nodeId),
    source,
    target: nodeId,
    probability: 1,
    triage_probabilities: {},
  });
  rebalanceOutgoing(source);
  stopConnecting();
  selectedEdgeId = processMap.edges.at(-1).id;
  selectedNodeId = null;
  renderAll();
  scheduleSave();
}

function uniqueEdgeId(source, target) {
  const base = `${source}_${target}`;
  let candidate = base;
  let suffix = 2;
  while (processMap.edges.some((edge) => edge.id === candidate)) candidate = `${base}_${suffix++}`;
  return candidate;
}

function rebalanceOutgoing(source) {
  const outgoing = processMap.edges.filter((edge) => edge.source === source);
  if (!outgoing.length) return;
  const probability = 1 / outgoing.length;
  outgoing.forEach((edge) => {
    edge.probability = probability;
    edge.triage_probabilities = {};
  });
}

function selectNode(nodeId) {
  selectedNodeId = nodeId;
  selectedEdgeId = null;
  renderNodes();
  renderEdges();
  renderEdgeList();
  renderInspector();
}

function selectEdge(edgeId) {
  selectedEdgeId = edgeId;
  selectedNodeId = null;
  renderNodes();
  renderEdges();
  renderEdgeList();
  renderInspector();
}

function renderInspector() {
  elements.inspectorEmpty.hidden = Boolean(selectedNodeId || selectedEdgeId);
  elements.nodeForm.hidden = !selectedNodeId;
  elements.edgeForm.hidden = !selectedEdgeId;
  if (selectedNodeId) populateNodeForm(nodeById(selectedNodeId));
  if (selectedEdgeId) populateEdgeForm(edgeById(selectedEdgeId));
}

function populateNodeForm(node) {
  $("#node-form-title").textContent = node.name;
  $("#node-id").value = node.id;
  $("#node-id").disabled = node.type !== "process";
  $("#node-name").value = node.name;
  $("#node-description").value = node.description || "";
  elements.processFields.hidden = node.type !== "process";
  $("#delete-node").hidden = node.type !== "process";
  if (node.type !== "process") return;
  const config = node.configuration;
  $("#node-capacity").value = config.capacity;
  $("#node-queue-policy").value = config.queue_policy;
  $("#node-closed-action").value = config.action_if_closed;
  $("#node-distribution").value = config.distribution;
  $("#node-time-mean").value = config.time_mean;
  $("#node-time-min").value = config.time_min;
  $("#node-time-mode").value = config.time_mode;
  $("#node-time-max").value = config.time_max;
  $("#node-queue-sla").value = config.queue_sla_min;
  $("#node-queue-sla-pct").value = config.queue_sla_pct * 100;
  $("#node-abandon-pct").value = config.queue_abandon_pct * 100;
  $("#node-service-sla").value = config.service_sla_min;
  $("#node-service-sla-pct").value = config.service_sla_pct * 100;
}

function populateEdgeForm(edge) {
  $("#edge-route").textContent = `${nodeLabel(edge.source)} → ${nodeLabel(edge.target)}`;
  $("#edge-probability").value = Math.round(edge.probability * 10000) / 100;
  const fields = $("#edge-triage-fields");
  fields.innerHTML = "";
  for (let triage = 1; triage <= 5; triage += 1) {
    const label = document.createElement("label");
    label.textContent = `T${triage}`;
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "100";
    input.step = "0.1";
    input.placeholder = String(Math.round(edge.probability * 1000) / 10);
    if (Object.hasOwn(edge.triage_probabilities, String(triage))) {
      input.value = edge.triage_probabilities[String(triage)] * 100;
    }
    input.addEventListener("change", () => {
      if (input.value === "") delete edge.triage_probabilities[String(triage)];
      else edge.triage_probabilities[String(triage)] = Math.min(1, Math.max(0, numberValue(input.value) / 100));
      scheduleSave();
    });
    label.appendChild(input);
    fields.appendChild(label);
  }
}

function nextStageId() {
  let index = 1;
  while (processMap.nodes.some((node) => node.id === `ETAPA_${index}`)) index += 1;
  return `ETAPA_${index}`;
}

function addStage() {
  const id = nextStageId();
  const processCount = processMap.nodes.filter((node) => node.type === "process").length;
  processMap.nodes.push({
    id,
    type: "process",
    name: `Etapa ${processCount + 1}`,
    description: "",
    position: { x: 290 + (processCount % 3) * 230, y: 110 + Math.floor(processCount / 3) * 150 },
    configuration: {
      capacity: 1, distribution: "constant", time_mean: 10, time_min: 5, time_mode: 10, time_max: 15,
      queue_policy: "NORMAL", action_if_closed: "WAIT", queue_sla_min: 60, queue_sla_pct: .9,
      queue_abandon_pct: 0, service_sla_min: 20, service_sla_pct: .95, hourly_capacity: null,
    },
  });
  selectNode(id);
  scheduleSave();
}

function deleteSelectedNode() {
  const node = nodeById(selectedNodeId);
  if (!node || node.type !== "process") return;
  if (!window.confirm(`Excluir “${node.name}” e todas as suas conexões?`)) return;
  processMap.nodes = processMap.nodes.filter((item) => item.id !== node.id);
  processMap.edges = processMap.edges.filter((edge) => edge.source !== node.id && edge.target !== node.id);
  selectedNodeId = null;
  renderAll();
  scheduleSave();
}

function deleteSelectedEdge() {
  const edge = edgeById(selectedEdgeId);
  if (!edge) return;
  processMap.edges = processMap.edges.filter((item) => item.id !== edge.id);
  rebalanceOutgoing(edge.source);
  selectedEdgeId = null;
  renderAll();
  scheduleSave();
}

function startConnecting() {
  connectionMode = true;
  connectionSource = null;
  elements.connectionHint.hidden = false;
  $("#connect-stages").classList.add("active");
  renderNodes();
}

function stopConnecting() {
  connectionMode = false;
  connectionSource = null;
  elements.connectionHint.hidden = true;
  $("#connect-stages").classList.remove("active");
  renderNodes();
}

function autoLayout() {
  const ordered = [
    ...processMap.nodes.filter((node) => node.type === "start"),
    ...processMap.nodes.filter((node) => node.type === "process"),
    ...processMap.nodes.filter((node) => node.type === "end"),
  ];
  ordered.forEach((node, index) => {
    node.position.x = 45 + (index % 4) * 230;
    node.position.y = 90 + Math.floor(index / 4) * 160;
  });
  renderNodes();
  renderEdges();
  scheduleSave();
}

function renderDemand() {
  elements.demandGrid.innerHTML = "";
  processMap.demand.sort((a, b) => a.hour - b.hour);
  for (const row of processMap.demand) {
    const wrapper = document.createElement("label");
    wrapper.className = "demand-hour";
    wrapper.innerHTML = `<span>${String(row.hour).padStart(2, "0")}:00–${String((row.hour + 1) % 24).padStart(2, "0")}:00</span>`;
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "0.1";
    input.value = row.arrivals;
    input.setAttribute("aria-label", `Chegadas às ${row.hour} horas`);
    input.addEventListener("input", () => {
      row.arrivals = Math.max(0, numberValue(input.value));
      updateDemandSummary();
      scheduleSave();
    });
    wrapper.appendChild(input);
    elements.demandGrid.appendChild(wrapper);
  }
  renderTriageMix();
  updateDemandSummary();
}

function renderTriageMix() {
  const mix = processMap.demand[0]?.triage_mix || [0, 1, 0, 0, 0];
  elements.triageMix.innerHTML = "";
  mix.forEach((probability, index) => {
    const row = document.createElement("div");
    row.className = "triage-row";
    row.innerHTML = `<span class="triage-label"><span class="triage-dot" style="--triage-color:${TRIAGE_COLORS[index]}"></span>Triagem ${index + 1}</span>`;
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "100";
    input.step = "0.1";
    input.value = Math.round(probability * 1000) / 10;
    input.addEventListener("input", () => {
      const value = Math.min(100, Math.max(0, numberValue(input.value))) / 100;
      processMap.demand.forEach((demandRow) => { demandRow.triage_mix[index] = value; });
      updateDemandSummary();
      scheduleSave();
    });
    row.appendChild(input);
    elements.triageMix.appendChild(row);
  });
}

function updateDemandSummary() {
  const total = processMap.demand.reduce((sum, row) => sum + numberValue(row.arrivals), 0);
  elements.dailyDemand.textContent = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(total);
  const triageTotal = (processMap.demand[0]?.triage_mix || []).reduce((sum, value) => sum + numberValue(value), 0);
  elements.triageTotal.textContent = `${Math.round(triageTotal * 1000) / 10}%`;
  elements.triageTotal.parentElement.classList.toggle("invalid", Math.abs(triageTotal - 1) > .0001);
  updateChecklist();
}

function renderSettings() {
  $("#setting-duration").value = processMap.settings.sim_duration_minutes;
  $("#setting-extra-time").value = processMap.settings.extra_service_time;
  $("#setting-replications").value = processMap.settings.replications;
  $("#setting-seed").value = processMap.settings.random_seed;
}

function restoreProjectDraft() {
  for (const [name, value] of Object.entries(projectDraft)) {
    const field = elements.projectForm.elements[name];
    if (field) field.value = value;
  }
}

function syncProjectDraft() {
  const data = new FormData(elements.projectForm);
  projectDraft = Object.fromEntries(data.entries());
  scheduleSave();
}

function updateChecklist() {
  if (!processMap) return;
  setCheck("#check-map", mapIsValid);
  const demandValid = processMap.demand.some((row) => row.arrivals > 0)
    && Math.abs((processMap.demand[0]?.triage_mix || []).reduce((a, b) => a + b, 0) - 1) < 1e-6;
  setCheck("#check-demand", demandValid);
  const projectValid = Boolean(elements.projectForm?.elements?.reference?.value.trim()
    && elements.projectForm?.elements?.scope?.value.trim()
    && elements.projectForm?.elements?.responsibleName?.value.trim());
  setCheck("#check-project", projectValid);
}

function setCheck(selector, valid) {
  const element = $(selector);
  if (!element) return;
  element.textContent = valid ? "✓" : "○";
  element.classList.toggle("ok", valid);
}

function readableIssues(errors) {
  if (!errors?.length) return "";
  const labels = {
    missing_route: "Há uma etapa sem caminho de saída.", unreachable_node: "Há uma etapa que não pode ser alcançada desde a entrada.",
    dead_end: "Há uma etapa sem caminho até a saída.", invalid_probability_sum: "As probabilidades de saída de uma etapa precisam totalizar 100%.",
    invalid_triangular_distribution: "Revise mínimo, mais provável e máximo da distribuição triangular.",
    invalid_normal_distribution: "Revise mínimo, média e máximo da distribuição normal.",
  };
  return `<ul>${errors.slice(0, 10).map((error) => `<li>${escapeHtml(labels[error.code] || error.message)} <small>${escapeHtml(error.path || "")}</small></li>`).join("")}</ul>`;
}

async function validateMap({ quiet = false } = {}) {
  if (!quiet) showStatus("Validando etapas, conexões, probabilidades e demanda…", "loading");
  try {
    const result = await apiRequest("/process-maps/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(processMap),
    });
    mapIsValid = Boolean(result.valid);
    updateChecklist();
    if (!quiet) {
      if (result.valid) showStatus(`Mapa válido. ${processMap.nodes.length} etapas e ${processMap.edges.length} conexões prontas para simular.`, "success");
      else showStatus(`<strong>O mapa precisa de ajustes:</strong>${readableIssues(result.errors)}`, "error");
    }
    return result;
  } catch (error) {
    if (accessRequired(error)) showAccessGate();
    else showStatus(`Não foi possível validar o mapa: ${escapeHtml(error.message)}`, "error");
    throw error;
  }
}

function projectPayload() {
  const data = new FormData(elements.projectForm);
  return {
    reference: String(data.get("reference") || "").trim(),
    service_type: "flow_simulation",
    title: String(data.get("title") || "").trim() || null,
    scope: String(data.get("scope") || "").trim(),
    responsible: {
      name: String(data.get("responsibleName") || "").trim(),
      email: String(data.get("responsibleEmail") || "").trim() || null,
    },
    requester: { organization: String(data.get("organization") || "").trim() || null },
    metadata: { input_method: "visual_process_map", process_map_version: processMap.version },
  };
}

async function runSimulation() {
  const button = $("#run-simulation");
  syncProjectDraft();
  if (!elements.projectForm.reportValidity()) {
    updateChecklist();
    return;
  }
  button.disabled = true;
  elements.resultPanel.hidden = false;
  elements.resultBadge.className = "result-badge running";
  elements.resultBadge.textContent = "Validando";
  elements.resultTitle.textContent = "Preparando simulação";
  try {
    const validation = await validateMap({ quiet: true });
    if (!validation.valid) {
      showStatus(`<strong>Corrija o mapa antes de executar:</strong>${readableIssues(validation.errors)}`, "error");
      switchTab("map");
      return;
    }
    showStatus("Criando o projeto e registrando o mapa…", "loading");
    const project = await apiRequest("/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectPayload()),
    });
    elements.resultBadge.textContent = "Na fila";
    const evaluation = await apiRequest(`/projects/${encodeURIComponent(project.id)}/evaluations`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Idempotency-Key": `visual-${project.id}-${Date.now()}` },
      body: JSON.stringify({ process_map: processMap }),
    });
    elements.resultTitle.textContent = "Simulação em andamento";
    elements.resultBadge.textContent = "Executando";
    showStatus("O motor está simulando o processo. Esta etapa pode levar alguns instantes…", "loading");
    const detail = await followEvaluation(evaluation.evaluation_id);
    if (detail.status === "failed") throw new Error(detail.error_message || "A simulação falhou.");
    renderResult(detail);
    showStatus("Simulação concluída e resultado armazenado com sucesso.", "success");
  } catch (error) {
    if (accessRequired(error)) {
      showAccessGate();
      return;
    }
    elements.resultBadge.className = "result-badge failed";
    elements.resultBadge.textContent = "Falhou";
    elements.resultTitle.textContent = "Não foi possível concluir";
    showStatus(`Falha na simulação: ${escapeHtml(error.message)}`, "error");
  } finally {
    button.disabled = false;
  }
}

async function followEvaluation(evaluationId) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const detail = await apiRequest(`/evaluations/${encodeURIComponent(evaluationId)}`);
    if (["completed", "failed", "cancelled"].includes(detail.status)) return detail;
    await new Promise((resolve) => window.setTimeout(resolve, 2000));
  }
  throw new Error("A simulação excedeu o tempo de acompanhamento.");
}

function collectMetrics(value, prefix = "", output = []) {
  if (output.length >= 8 || value == null) return output;
  if (typeof value === "number" && Number.isFinite(value)) {
    output.push([prefix.split(".").at(-1).replaceAll("_", " "), value]);
  } else if (typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      collectMetrics(child, prefix ? `${prefix}.${key}` : key, output);
      if (output.length >= 8) break;
    }
  }
  return output;
}

function renderResult(detail) {
  const result = detail.result?.summary || detail.result || {};
  elements.resultBadge.className = "result-badge";
  elements.resultBadge.textContent = "Concluída";
  elements.resultTitle.textContent = "Simulação concluída";
  const metrics = collectMetrics(result);
  elements.resultSummary.innerHTML = metrics.length
    ? metrics.map(([label, value]) => `<div class="metric-card"><span>${escapeHtml(label)}</span><strong>${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value)}</strong></div>`).join("")
    : '<div class="metric-card"><span>Status</span><strong>Resultado disponível</strong></div>';
  elements.resultJson.textContent = JSON.stringify(detail.result, null, 2);
}

function switchTab(tabName) {
  $$(".journey-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  $$(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === `tab-${tabName}`));
  if (tabName === "map") window.setTimeout(renderEdges, 30);
  if (tabName === "run") updateChecklist();
}

function bindNodeForm() {
  $("#node-id").addEventListener("change", (event) => {
    const node = nodeById(selectedNodeId);
    const oldId = node.id;
    const nextId = event.target.value.trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_");
    if (!/^[A-Z][A-Z0-9_]{0,63}$/.test(nextId) || processMap.nodes.some((item) => item.id === nextId && item !== node)) {
      event.target.value = oldId;
      showStatus("Use um ID único em maiúsculas, sem espaços ou caracteres especiais.", "error");
      return;
    }
    node.id = nextId;
    processMap.edges.forEach((edge) => {
      if (edge.source === oldId) edge.source = nextId;
      if (edge.target === oldId) edge.target = nextId;
    });
    selectedNodeId = nextId;
    renderAll();
    scheduleSave();
  });
  const simple = [
    ["#node-name", "name", String], ["#node-description", "description", String],
  ];
  simple.forEach(([selector, key]) => $(selector).addEventListener("input", (event) => {
    nodeById(selectedNodeId)[key] = event.target.value;
    renderNodes(); renderEdges(); scheduleSave();
  }));
  const configBindings = [
    ["#node-capacity", "capacity", (v) => Math.max(1, Math.round(numberValue(v, 1)))],
    ["#node-queue-policy", "queue_policy", String], ["#node-closed-action", "action_if_closed", String],
    ["#node-distribution", "distribution", String], ["#node-time-mean", "time_mean", (v) => Math.max(.01, numberValue(v, .01))],
    ["#node-time-min", "time_min", (v) => Math.max(0, numberValue(v))], ["#node-time-mode", "time_mode", (v) => Math.max(0, numberValue(v))],
    ["#node-time-max", "time_max", (v) => Math.max(0, numberValue(v))], ["#node-queue-sla", "queue_sla_min", (v) => Math.max(0, numberValue(v))],
    ["#node-queue-sla-pct", "queue_sla_pct", (v) => Math.min(1, Math.max(0, numberValue(v) / 100))],
    ["#node-abandon-pct", "queue_abandon_pct", (v) => Math.min(1, Math.max(0, numberValue(v) / 100))],
    ["#node-service-sla", "service_sla_min", (v) => Math.max(0, numberValue(v))],
    ["#node-service-sla-pct", "service_sla_pct", (v) => Math.min(1, Math.max(0, numberValue(v) / 100))],
  ];
  configBindings.forEach(([selector, key, convert]) => $(selector).addEventListener("change", (event) => {
    const node = nodeById(selectedNodeId);
    if (!node?.configuration) return;
    node.configuration[key] = convert(event.target.value);
    renderNodes(); renderEdges(); scheduleSave();
  }));
  $("#delete-node").addEventListener("click", deleteSelectedNode);
}

function bindEdgeForm() {
  $("#edge-probability").addEventListener("change", (event) => {
    const edge = edgeById(selectedEdgeId);
    if (!edge) return;
    edge.probability = Math.min(1, Math.max(0, numberValue(event.target.value) / 100));
    const siblings = processMap.edges.filter((item) => item.source === edge.source && item.id !== edge.id);
    if (siblings.length) {
      const remainder = (1 - edge.probability) / siblings.length;
      siblings.forEach((item) => { item.probability = remainder; });
    }
    renderEdges(); renderEdgeList(); populateEdgeForm(edge); scheduleSave();
  });
  $("#delete-edge").addEventListener("click", deleteSelectedEdge);
}

function bindSettings() {
  const settings = [
    ["#setting-duration", "sim_duration_minutes", (v) => Math.max(1, Math.round(numberValue(v, 1440)))],
    ["#setting-extra-time", "extra_service_time", (v) => Math.max(0, Math.round(numberValue(v)))],
    ["#setting-replications", "replications", (v) => Math.max(1, Math.round(numberValue(v, 1)))],
    ["#setting-seed", "random_seed", (v) => Math.round(numberValue(v, 1))],
  ];
  settings.forEach(([selector, key, convert]) => $(selector).addEventListener("change", (event) => {
    processMap.settings[key] = convert(event.target.value);
    scheduleSave();
  }));
}

function bindEvents() {
  $$(".journey-tab").forEach((tab) => tab.addEventListener("click", () => switchTab(tab.dataset.tab)));
  elements.mapName.addEventListener("input", () => { processMap.name = elements.mapName.value; scheduleSave(); });
  $("#add-stage").addEventListener("click", addStage);
  $("#connect-stages").addEventListener("click", () => connectionMode ? stopConnecting() : startConnecting());
  $("#cancel-connect").addEventListener("click", stopConnecting);
  $("#auto-layout").addEventListener("click", autoLayout);
  $("#validate-map").addEventListener("click", () => validateMap());
  $("#fill-demand").addEventListener("click", () => {
    const value = processMap.demand[0]?.arrivals || 0;
    processMap.demand.forEach((row) => { row.arrivals = value; });
    renderDemand(); scheduleSave();
  });
  elements.projectForm.addEventListener("input", () => { syncProjectDraft(); updateChecklist(); });
  $("#run-simulation").addEventListener("click", runSimulation);
  $("#new-map").addEventListener("click", async () => {
    if (!window.confirm("Criar um novo mapa? O rascunho atual será substituído.")) return;
    const starter = await apiRequest("/process-maps/starter");
    processMap = starter.process_map;
    selectedNodeId = null; selectedEdgeId = null; projectDraft = {};
    localStorage.removeItem(STORAGE_KEY);
    elements.projectForm.reset();
    renderAll(); scheduleSave(); switchTab("map");
  });
  bindNodeForm();
  bindEdgeForm();
  bindSettings();
  window.addEventListener("resize", () => window.requestAnimationFrame(renderEdges));
}

function showAccessGate() {
  elements.workspace.hidden = true;
  elements.accessGate.hidden = false;
}

async function initialize() {
  cacheElements();
  bindEvents();
  try {
    const starter = await apiRequest("/process-maps/starter");
    if (!readDraft()) processMap = starter.process_map;
    elements.accessGate.hidden = true;
    elements.workspace.hidden = false;
    renderAll();
  } catch (error) {
    if (accessRequired(error)) showAccessGate();
    else {
      elements.workspace.hidden = false;
      showStatus(`Não foi possível iniciar o editor: ${escapeHtml(error.message)}`, "error");
    }
  }
}

document.addEventListener("DOMContentLoaded", initialize);
