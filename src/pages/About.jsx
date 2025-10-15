export default function About() {
  return (
    <div className="min-h-screen bg-white px-8 py-12 text-gray-800 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Sobre a Healthcare Tec</h2>
      <p className="text-lg leading-relaxed mb-4">
        Somos uma consultoria especializada em operações e projetos hospitalares.
        Unimos engenharia clínica, gestão e acreditação para garantir previsibilidade,
        compliance e segurança assistencial.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>60+ projetos conduzidos em hospitais públicos e privados</li>
        <li>R$ 3 bilhões em negociações de equipamentos</li>
        <li>Avaliador ONA e experiência internacional</li>
      </ul>
    </div>
  );
}
