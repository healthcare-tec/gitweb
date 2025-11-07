import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const segments = [
    { name: 'Hospitais', path: '/' },
    { name: 'Empresas', path: '/empresas' },
    { name: 'Veterinária', path: '/veterinaria' }
  ];

  const currentSegment = segments.find(s => s.path === location.pathname) || segments[0];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <img src="/logo-icon.png" alt="Healthcare.tec" className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-primary">
                Healthcare.tec
                <div className="text-xs text-muted-foreground font-normal">Engineering Health</div>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Dropdown de Segmentos */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
              >
                {currentSegment.name}
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-border rounded-md shadow-lg py-1">
                  {segments.map((segment) => (
                    <Link
                      key={segment.path}
                      to={segment.path}
                      onClick={() => setDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-accent transition-colors ${
                        location.pathname === segment.path ? 'bg-accent text-primary font-medium' : 'text-foreground'
                      }`}
                    >
                      {segment.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors">Serviços</button>
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
              {/* Segmentos no mobile */}
              <div className="border-b border-border pb-2 mb-2">
                <div className="text-xs text-muted-foreground px-3 py-1 font-semibold">SEGMENTOS</div>
                {segments.map((segment) => (
                  <Link
                    key={segment.path}
                    to={segment.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full text-left px-3 py-2 rounded-md ${
                      location.pathname === segment.path
                        ? 'bg-accent text-primary font-medium'
                        : 'text-foreground hover:bg-accent'
                    }`}
                  >
                    {segment.name}
                  </Link>
                ))}
              </div>

              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 text-foreground hover:bg-accent rounded-md">Serviços</button>
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

