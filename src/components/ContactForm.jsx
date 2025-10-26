import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hospital: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Usando Web3Forms - serviço gratuito e open source
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "f1821e05-9c1c-4737-ae59-6bf1e8802946", // Você precisa criar uma conta gratuita em https://web3forms.com
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          hospital: formData.hospital,
          service: formData.service,
          message: formData.message,
          subject: 'Novo contato do site Healthcare.tec'
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          hospital: '',
          service: '',
          message: ''
        });
        alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
      } else {
        setSubmitStatus('error');
        alert('Erro ao enviar formulário. Por favor, tente novamente ou entre em contato diretamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setSubmitStatus('error');
      alert('Erro ao enviar formulário. Por favor, tente novamente ou entre em contato diretamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '5512996202525';
    const message = encodeURIComponent('Olá! Gostaria de agendar um diagnóstico gratuito.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-lg text-muted-foreground">
            Preencha o formulário abaixo ou entre em contato diretamente conosco
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <Label htmlFor="hospital">Hospital/Instituição</Label>
                <Input
                  id="hospital"
                  name="hospital"
                  type="text"
                  value={formData.hospital}
                  onChange={handleChange}
                  placeholder="Nome da instituição"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="service">Serviço de Interesse</Label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Selecione um serviço</option>
                <option value="gestao-projetos">Gestão de Projetos Hospitalares</option>
                <option value="redesenho-processos">Redesenho de Processos e Fluxos</option>
                <option value="acreditacao">Preparação para Acreditação</option>
                <option value="planejamento-financeiro">Planejamento Financeiro e de Risco</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Conte-nos mais sobre suas necessidades..."
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4">Ou entre em contato diretamente:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:cadastro@outlook.com" className="flex items-center gap-2 text-primary hover:underline">
                <Mail className="w-5 h-5" />
                <span>cadastro@outlook.com</span>
              </a>
              <button 
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 text-primary hover:underline cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp: Contato Rápido</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

