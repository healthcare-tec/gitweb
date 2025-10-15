export default function Results() {
  const results = [
    { label: "Aditivos de obra", value: "↓ 28%" },
    { label: "Turnover de sala cirúrgica", value: "↓ 22%" },
    { label: "Gaps fechados no prazo", value: "↑ 91%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-12 text-center">
      <h2 className="text-3xl font-bold mb-8">Resultados</h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {results.map((r, i) => (
          <div key={i} className="p-6 bg-white rounded-xl shadow">
            <div className="text-3xl font-bold text-blue-700 mb-2">{r.value}</div>
            <div className="text-gray-600">{r.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
