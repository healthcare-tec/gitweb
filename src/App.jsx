import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { 
  Menu, 
  X, 
  CheckCircle2, 
  TrendingUp, 
  Shield, 
  Users, 
  ClipboardCheck, 
  BarChart3, 
  FileText, 
  Award,
  Clock,
  Target,
  Zap,
  Globe,
  Phone,
  Mail,
  MapPin,
  Download,
  ArrowRight,
  ChevronDown
} from 'lucide-react'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(null)

  const services = [
    {
      id: 1,
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Gestão de Projetos Hospitalares",
      description: "Do estudo de viabilidade ao comissionamento e entrega final, garantindo projetos no prazo e orçamento.",
      details: {
        scope: "Planejamento, coordenação, gestão de fornecedores, riscos e cronograma completo.",
        deliverables: ["Project Charter e EAP (WBS)", "Matriz de riscos e logs de decisão", "Relatórios executivos semanais", "Checklist de prontidão para start-up clínico"],
        kpis: ["Dias de atraso evitados", "Percentual de aditivos de contrato", "Taxa de retrabalho no comissionamento"]
      }
    },
    {
      id: 2,
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Redesenho de Processos e Fluxos",
      description: "Mapeamento de fluxos (CME, CC, UTI, Diagnóstico), análise de gargalos e otimização operacional.",
      details: {
        scope: "Análise de gargalos, revisão de layout, padronização operacional e aumento de produtividade.",
        deliverables: ["Modelo de capacidade Antes/Depois", "Painel de tempo de ciclo e produtividade", "Plano de estabilização 30-60-90 dias", "Kit de procedimentos operacionais padrão (SOP)"],
        kpis: ["Redução do tempo de turnover de sala", "Diminuição do tempo médio de permanência (LOS)", "Redução de erros de reprocessamento"]
      }
    },
    {
      id: 3,
      icon: <Award className="w-8 h-8" />,
      title: "Preparação para Acreditação",
      description: "Diagnóstico completo de conformidade, planos de ação e suporte durante o ciclo de acreditação (ONA, QMentum, JCI).",
      details: {
        scope: "Diagnóstico de gaps, preparação para auditorias simuladas e suporte durante todo o ciclo de acreditação.",
        deliverables: ["Mapa de gaps (RAG Map)", "Matriz de evidências", "Relatório de auditoria simulada", "Painel War Room para acompanhamento"],
        kpis: ["Percentual de gaps fechados no prazo", "Número de não conformidades por auditoria", "Taxa de aprovação na acreditação"]
      }
    },
    {
      id: 4,
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Planejamento Financeiro e de Risco",
      description: "Modelagem de cenários CAPEX/OPEX, análise de ciclo de vida de equipamentos e playbooks de compras.",
      details: {
        scope: "Modelagem de investimentos, análise de ciclo de vida e elaboração de playbooks de compras e substituição tecnológica.",
        deliverables: ["Modelo CAPEX/OPEX", "Mapa de risco (GUT)", "Scorecards de fornecedores", "Planilhas de TCO e payback"],
        kpis: ["Custos evitados", "Tempo de retorno do investimento (ROI)", "Conformidade com SLAs de fornecedores"]
      }
    }
  ]

  const packages = [
    {
      name: "Assessment Sprint",
      duration: "2-3 semanas",
      description: "Diagnóstico rápido com mapeamento de gaps, plano de ação priorizado e briefing executivo.",
      features: ["Diagnóstico inicial", "Mapa de gaps", "Plano de ação priorizado", "Briefing executivo"]
    },
    {
      name: "Implementation",
      duration: "8-16 semanas",
      description: "Acompanhamento estruturado (cadência PMO), integração de fornecedores, dashboards e treinamentos.",
      features: ["Cadência PMO", "Integração de fornecedores", "Dashboards executivos", "Treinamentos", "Documentação completa"]
    },
    {
      name: "Managed Program",
      duration: "Trimestral ou anual",
      description: "Gestão compartilhada contínua, melhoria permanente e programa 'Acreditação Sempre Pronta'.",
      features: ["Gestão contínua", "Melhoria permanente", "Suporte dedicado", "Programa de conformidade", "Relatórios mensais"]
    }
  ]

  const leadMagnets = [
    {
      title: "Roteiro de Acreditação ONA",
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
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">Healthcare.tec</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">Início</button>
              <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors">Serviços</button>
              <button onClick={() => scrollToSection('resources')} className="text-foreground hover:text-primary transition-colors">Recursos</button>
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">Sobre</button>
              <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">Contato</button>
              <Button onClick={() => scrollToSection('contact')}>Agendar Diagnóstico</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">Início</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">Serviços</button>
              <button onClick={() => scrollToSection('resources')} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">Recursos</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">Sobre</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-foreground hover:text-primary transition-colors py-2">Contato</button>
              <Button onClick={() => scrollToSection('contact')} className="w-full">Agendar Diagnóstico</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Da preparação para a acreditação à confiança operacional
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Lideramos projetos, fluxos e riscos hospitalares para que sua equipe entregue cuidado seguro — no prazo, no orçamento e em conformidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection('contact')} className="text-lg px-8">
                Agendar Diagnóstico de 20 min
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('services')} className="text-lg px-8">
                Conheça nossos serviços
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">60+</div>
              <div className="text-sm text-muted-foreground">Projetos Supervisionados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                <Globe className="w-10 h-10 mx-auto text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">Atuação Internacional</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                <Award className="w-10 h-10 mx-auto text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">Avaliador ONA Certificado</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Problemas que Resolvemos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transformamos desafios complexos em sistemas confiáveis e auditáveis
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Obras Atrasadas ou Paralisadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Projetos que não saem do papel ou enfrentam atrasos constantes, comprometendo investimentos e planejamento estratégico.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Incerteza na Acreditação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Dificuldade em mapear gaps de conformidade e preparar evidências para auditorias de acreditação (ONA, JCI, QMentum).</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Gargalos Operacionais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Fluxos de pacientes e materiais ineficientes, gerando atrasos, retrabalho e impacto na qualidade do atendimento.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Compras Fragmentadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Falta de padronização e visão estratégica nas aquisições, resultando em custos elevados e baixa eficiência.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Manutenção Reativa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Gestão de equipamentos baseada em "apagar incêndios", sem planejamento preventivo ou preditivo adequado.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Desequilíbrio CAPEX/OPEX</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Dificuldade em equilibrar investimentos de capital com custos operacionais, comprometendo a sustentabilidade financeira.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluções especializadas para cada desafio hospitalar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              >
                <CardHeader>
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                
                {activeService === service.id && (
                  <CardContent className="border-t border-border pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Escopo:</h4>
                        <p className="text-muted-foreground">{service.details.scope}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Entregáveis:</h4>
                        <ul className="space-y-2">
                          {service.details.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Indicadores (KPIs):</h4>
                        <ul className="space-y-2">
                          {service.details.kpis.map((kpi, idx) => (
                            <li key={idx} className="flex items-start">
                              <BarChart3 className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{kpi}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full" onClick={() => scrollToSection('contact')}>
                        Solicitar Proposta
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Packages */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Estrutura de Pacotes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription className="text-primary font-semibold">{pkg.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{pkg.description}</p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Resultados Mensuráveis</h2>
            <p className="text-xl opacity-90">Transformamos eficiência em lucro mensurável</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-lg opacity-90">Redução de atrasos em projetos</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">92%</div>
              <div className="text-lg opacity-90">Taxa de aprovação em acreditações</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">30%</div>
              <div className="text-lg opacity-90">Redução média de custos operacionais</div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Recursos Gratuitos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Materiais práticos para gestores hospitalares
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadMagnets.map((magnet, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-primary mb-4">
                    {magnet.icon}
                  </div>
                  <CardTitle className="text-xl">{magnet.title}</CardTitle>
                  <CardDescription>{magnet.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 w-4 h-4" />
                    Baixar Material
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Sobre a Healthcare.tec</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Somos uma consultoria especializada em operações hospitalares e gerenciamento de projetos, com foco em transformar desafios complexos em sistemas confiáveis e auditáveis.
                </p>
                <p>
                  Com mais de 60 projetos supervisionados nos últimos 5 anos, nossa experiência abrange desde a preparação para acreditação até a otimização de fluxos operacionais e gestão financeira de ativos hospitalares.
                </p>
                <p>
                  Nossa abordagem combina vivência prática em operações hospitalares com metodologias reconhecidas internacionalmente, garantindo resultados mensuráveis e sustentáveis para nossos clientes.
                </p>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Credenciais e Experiência</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Award className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Avaliador ONA Certificado</div>
                        <div className="text-sm text-muted-foreground">Experiência interna nos processos de acreditação</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Users className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">MBA em Gerenciamento de Projetos</div>
                        <div className="text-sm text-muted-foreground">Metodologias PMI aplicadas ao setor de saúde</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Globe className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Atuação Internacional</div>
                        <div className="text-sm text-muted-foreground">Experiência em Peru, Alemanha, Malásia e outros países</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Target className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Certificação Change Management 3.0</div>
                        <div className="text-sm text-muted-foreground">Gestão de mudanças organizacionais</div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Entre em Contato</h2>
            <p className="text-xl text-muted-foreground">
              Agende um diagnóstico de 20 minutos e descubra como podemos ajudar
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Cargo/Função</Label>
                    <Input id="role" placeholder="Ex: Diretor Técnico" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="hospital-size">Tamanho do Hospital</Label>
                    <Select>
                      <SelectTrigger id="hospital-size">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeno (até 100 leitos)</SelectItem>
                        <SelectItem value="medium">Médio (100-300 leitos)</SelectItem>
                        <SelectItem value="large">Grande (300-500 leitos)</SelectItem>
                        <SelectItem value="xlarge">Muito Grande (500+ leitos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Serviço de Interesse</Label>
                    <Select>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="projects">Gestão de Projetos</SelectItem>
                        <SelectItem value="processes">Redesenho de Processos</SelectItem>
                        <SelectItem value="accreditation">Preparação para Acreditação</SelectItem>
                        <SelectItem value="financial">Planejamento Financeiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Principais Dores e Desafios</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Descreva brevemente os principais desafios que seu hospital enfrenta..."
                    rows={5}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="nda" />
                  <label
                    htmlFor="nda"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Concordo em manter confidenciais as informações enviadas (NDA)
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Enviar Solicitação
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">Ou entre em contato diretamente:</p>
                  <Button size="lg" variant="outline" className="w-full md:w-auto">
                    <Phone className="mr-2 w-5 h-5" />
                    WhatsApp: Contato Rápido
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Healthcare.tec</h3>
              <p className="text-gray-400 text-sm">
                Consultoria em Operações Hospitalares e Gerenciamento de Projetos
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">Gestão de Projetos</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Redesenho de Processos</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Preparação para Acreditação</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Planejamento Financeiro</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#resources" className="hover:text-white transition-colors">Roteiro de Acreditação ONA</a></li>
                <li><a href="#resources" className="hover:text-white transition-colors">Mapa de Risco (GUT)</a></li>
                <li><a href="#resources" className="hover:text-white transition-colors">Guia de Gerenciamento</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Código de Conduta</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Healthcare.tec. Todos os direitos reservados.</p>
            <p className="mt-2">Reduzimos atrasos, retrabalhos e riscos de não conformidade transformando projetos e processos hospitalares em sistemas confiáveis e auditáveis.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

