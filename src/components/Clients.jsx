import React from 'react';

const Clients = () => {
  return (
    <section id="clients" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Clientes</h2>
        <p className="text-lg text-gray-600 mb-12">Confiados por líderes do setor de saúde</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
          {/* Placeholder for client logos */}
          <img src="https://via.placeholder.com/150x50?text=Client+1" alt="Client 1" className="mx-auto" />
          <img src="https://via.placeholder.com/150x50?text=Client+2" alt="Client 2" className="mx-auto" />
          <img src="https://via.placeholder.com/150x50?text=Client+3" alt="Client 3" className="mx-auto" />
          <img src="https://via.placeholder.com/150x50?text=Client+4" alt="Client 4" className="mx-auto" />
          <img src="https://via.placeholder.com/150x50?text=Client+5" alt="Client 5" className="mx-auto" />
          <img src="https://via.placeholder.com/150x50?text=Client+6" alt="Client 6" className="mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Clients;

