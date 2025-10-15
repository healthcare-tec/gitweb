export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-8">
      <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
      <p className="text-gray-600 mb-4">
        Envie sua mensagem ou fale diretamente pelo WhatsApp.
      </p>
      <a
        href="https://wa.me/5512996202525"
        className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
      >
        Falar via WhatsApp
      </a>
      <p className="text-sm text-gray-500 mt-4">contato@healthcare.tec.br</p>
    </div>
  );
}
