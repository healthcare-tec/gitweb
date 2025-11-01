import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Healthcare.tec</h3>
          <p className="text-gray-400">Engineering Health</p>
          <p className="text-gray-400 mt-4">Transformando operações hospitalares através de excelência em gestão de projetos e processos.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Serviços</h3>
          <ul className="space-y-2">
            <li><a href="#services" className="text-gray-400 hover:text-white">Gestão de Projetos</a></li>
            <li><a href="#services" className="text-gray-400 hover:text-white">Redesenho de Processos</a></li>
            <li><a href="#services" className="text-gray-400 hover:text-white">Acreditação</a></li>
            <li><a href="#services" className="text-gray-400 hover:text-white">Planejamento Financeiro</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Empresa</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="text-gray-400 hover:text-white">Sobre</a></li>
            <li><a href="#resources" className="text-gray-400 hover:text-white">Recursos</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Política de Privacidade</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Termos de Uso</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Código de Conduta</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contato</h3>
          <p className="text-gray-400 flex items-center"><Mail className="w-5 h-5 mr-2" /> <a href="mailto:contato@healthcare.tec.br" className="text-gray-400 hover:text-white">contato@healthcare.tec.br</a></p>
          <p className="text-gray-400 flex items-center mt-2"><Phone className="w-5 h-5 mr-2" /> WhatsApp: Contato Rápido</p>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        <p>&copy; 2025 Healthcare.tec. Todos os direitos reservados.</p>
        <p>Engineering Health — Eficiência também salva vidas.</p>
      </div>
    </footer>
  );
};

export default Footer;

