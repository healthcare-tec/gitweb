import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PainPoints from '../components/PainPoints';
import Differentials from '../components/Differentials';
import About from '../components/About';
import ContactCTA from '../components/ContactCTA';
import ContactForm from '../components/ContactForm';

const HospitalsPage = () => {
  return (
    <>
      <Hero />
      <PainPoints />
      <Services />
      <Differentials />
      <About />
      <ContactCTA />
      <ContactForm />
    </>
  );
};

export default HospitalsPage;

