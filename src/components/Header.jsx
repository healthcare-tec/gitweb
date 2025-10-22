import React from 'react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <img src="/gitweb/logo-icon.png" alt="Healthcare.tec" className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-primary">
              Healthcare.tec
              <div className="text-xs text-muted-foreground font-normal">Engineering Health</div>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-foreground hover:text-primary transition-colors">Início</button>
            <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors">Serviços</button>
            <button onClick={() => scrollToSection('resources')} className="text-foreground hover:text-primary transition-colors">Recursos</button>
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">Sobre</button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">Contato</button>
          </nav>

          <div className="hidden md:block">
            <Button onClick={() => scrollToSection('contact')}>Agendar Diagnóstico</Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('hero')} className="block w-full text-left px-3 py-2 text-foreground hover:bg-accent rounded-md">Início</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 text-foreground hover:bg-accent rounded-md">Serviços</button>
              <button onClick={() => scrollToSection('resources')} className="block w-full text-left px-3 py-2 text-foreground hover:bg-accent rounded-md">Recursos</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-foreground hover:bg-accent rounded-md">Sobre</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 text-foreground hover:bg-accent rounded-md">Contato</button>
              <Button onClick={() => scrollToSection('contact')} className="w-full mt-2">Agendar Diagnóstico</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

