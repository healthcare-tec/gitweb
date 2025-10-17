import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Differentials from './components/Differentials';
import About from './components/About';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { FileText, Shield, ClipboardCheck, ArrowRight, Mail, Phone } from 'lucide-react';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Checkbox } from './components/ui/checkbox';

import './index.css';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leadMagnets = [
    {
      title: "Roteiro de Acreditação<br/>ONA",
      description: "Resumo dos capítulos e critérios oficiais do manual, adaptado para uso prático.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Mapa de Risco (GUT) - Modelo + Tutorial",
      description: "Como priorizar riscos e construir planos de mitigação eficazes.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Guia de Gerenciamento de Projetos Hospitalares",
      description: "Baseado no PMI - áreas de conhecimento, etapas e erros comuns.",
      icon: <ClipboardCheck className="w-6 h-6" />
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero />
      {/* <Clients /> */}
      <Services />
      <Differentials />

      {/* Resultados Mensuráveis Section */}
      <section id="results" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Resultados Mensuráveis</h2>
          <p className="text-lg text-gray-600 mb-12">Transformamos eficiência em lucro mensurável</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ // Placeholder for result metrics
              { value: "64%*", description: "Melhoria na entrega de projetos no prazo" },
              { value: "85%*", description: "Taxa de aprovação em acreditações com preparação adequada" },
              { value: "15-20%*", description: "Redução de custos operacionais com otimização" },
            ].map((result, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg">
                <p className="text-5xl font-bold text-primary mb-2">{result.value}</p>
                <p className="text-lg text-gray-700">{result.description}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-8">* Dados baseados em estudos do PMI (Project Management Institute), MIT Sloan Review, Oliver Wyman, e pesquisas sobre acreditação hospitalar (NIH/PMC, estudos acadêmicos brasileiros)</p>
        </div>
      </section>

      {/* Recursos Gratuitos Section */}
      <section id="resources" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recursos Gratuitos</h2>
          <p className="text-lg text-gray-600 mb-12">Materiais práticos para gestores hospitalares</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadMagnets.map((material, index) => (
              <Card key={index} className="p-6 text-left flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                    {material.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: material.title }}></CardTitle>
                  <CardDescription className="mb-4">{material.description}</CardDescription>
                </div>
                <Button className="mt-4">Baixar Material</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <About />

      {/* Entre em Contato Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
          <p className="text-lg text-gray-600 mb-12">Agende um diagnóstico de 20 minutos e descubra como podemos ajudar</p>
          <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input id="fullName" placeholder="Seu nome completo" required />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" required />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" type="tel" placeholder="(XX) XXXXX-XXXX" required />
              </div>
              <div>
                <Label htmlFor="role">Cargo/Função</Label>
                <Input id="role" placeholder="Seu cargo ou função" required />
              </div>
              <div>
                <Label htmlFor="hospitalSize">Tamanho do Hospital</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno (até 50 leitos)</SelectItem>
                    <SelectItem value="medium">Médio (51-200 leitos)</SelectItem>
                    <SelectItem value="large">Grande (201-500 leitos)</SelectItem>
                    <SelectItem value="extraLarge">Extra Grande (500+ leitos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="interestService">Serviço de Interesse</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="projectManagement">Gestão de Projetos</SelectItem>
                    <SelectItem value="processRedesign">Redesenho de Processos</SelectItem>
                    <SelectItem value="accreditation">Acreditação</SelectItem>
                    <SelectItem value="financialPlanning">Planejamento Financeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="challenges">Principais Dores e Desafios</Label>
                <Textarea id="challenges" placeholder="Descreva brevemente os principais desafios que sua instituição enfrenta..." required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="nda" required />
                <Label htmlFor="nda" className="text-sm text-muted-foreground">
                  Autorizo a tratar meus dados conforme LGPD .
                </Label>
              </div>
              <Button type="submit" className="w-full" size="lg">Enviar Solicitação</Button>
            </form>
            <div className="mt-8 text-center text-gray-600">
              <p>Ou entre em contato diretamente:</p>
              <p className="mt-2 flex items-center justify-center"><Mail className="w-5 h-5 mr-2" /> <a href="mailto:cadastro@outlook.com" className="text-primary hover:underline">cadastro@outlook.com</a></p>
              <p className="mt-2 flex items-center justify-center"><Phone className="w-5 h-5 mr-2" /> <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp: Contato Rápido</a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;

