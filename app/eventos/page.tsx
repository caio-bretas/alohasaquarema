import { EventCard } from "./_components/evennt-card";


// Simulação de Fetch do Banco de Dados
const getEventos = async () => {
  return [
    {
      id: 1,
      title: 'Nosso Nome e Pagode',
      description: 'Noite de samba com as melhores atrações locais para curtir com amigos.',
      data: '20 Jun',
      horas: '20:00',
      image: '/benner.png',
      location: 'Saquarema, RJ',
    },
    {
      id: 2,
      title: 'Surf Festival Saquarema',
      description: 'O melhor do surf mundial na capital nacional do esporte.',
      data: '25 Jun',
      horas: '08:00',
      image: '/surf.jpg',
      location: 'Praia de Itaúna, RJ',
    }
  ]
}

export default async function EventosPage() {
  const eventos = await getEventos();

  return (
    <div className="min-h-screen bg-zinc-50 pb-32">
      <header className="w-full max-w-7xl mx-auto pt-16 px-6 mb-10 text-center sm:text-left">
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em]">Agenda Cultural</span>
        <h1 className="text-4xl font-black tracking-tighter text-zinc-900 mt-2 uppercase">Eventos</h1>
        <p className="text-zinc-400 text-sm mt-2 font-medium">O que está acontecendo agora em Saquarema</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map(evento => (
          <EventCard key={evento.id} item={evento} />
        ))}
      </main>
    </div>
  )
}