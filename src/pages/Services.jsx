export default function Services() {
  const services = [
    {
      title: "Project Leadership (E2E)",
      desc: "Do charter ao handover: governança, fornecedores e comissionamento sob controle.",
    },
    {
      title: "Redesenho de Fluxos & Throughput",
      desc: "Mapeamento, gargalos e ganhos sustentáveis em CME/CC/UTI/Imagem.",
    },
    {
      title: "Acreditação (ONA/QMentum/JCI)",
      desc: "Gap assessment, binders de evidências e mock audits com plano de ação.",
    },
    {
      title: "Risco & Planejamento CAPEX/OPEX",
      desc: "Modelagem de TCO, roadmap de tecnologia e scorecards de compras.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 px-8 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Serviços</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((s, i) => (
          <div key={i} className="border rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">{s.title}</h3>
            <p className="text-gray-600 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
