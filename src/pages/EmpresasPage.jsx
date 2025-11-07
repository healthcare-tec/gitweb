import React from 'react';
import HeroEmpresas from '../components/empresas/HeroEmpresas';
import ServicesEmpresas from '../components/empresas/ServicesEmpresas';
import Differentials from '../components/Differentials';
import About from '../components/About';
import ContactCTA from '../components/ContactCTA';
import ContactForm from '../components/ContactForm';

const EmpresasPage = () => {
  return (
    <>
      <HeroEmpresas />
      <ServicesEmpresas />
      <Differentials />
      <About />
      <ContactCTA />
      <ContactForm />
    </>
  );
};

export default EmpresasPage;

