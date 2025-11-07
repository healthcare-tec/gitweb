import React from 'react';
import HeroVeterinaria from '../components/veterinaria/HeroVeterinaria';
import ServicesVeterinaria from '../components/veterinaria/ServicesVeterinaria';
import Differentials from '../components/Differentials';
import About from '../components/About';
import ContactCTA from '../components/ContactCTA';
import ContactForm from '../components/ContactForm';

const VeterinariaPage = () => {
  return (
    <>
      <HeroVeterinaria />
      <ServicesVeterinaria />
      <Differentials />
      <About />
      <ContactCTA />
      <ContactForm />
    </>
  );
};

export default VeterinariaPage;

