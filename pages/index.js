import React, { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [page, setPage] = useState('home');
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 font-sans">
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">AI</div>
          <div>
            <h1 className="text-xl font-extrabold leading-tight">DiagnozAI</h1>
            <p className="text-xs text-gray-500">Schnelle KI-Ersteinschätzung — weltweit skalierbar</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <NavButton active={page === 'home'} onClick={() => setPage('home')}>Home</NavButton>
          <NavButton active={page === 'features'} onClick={() => setPage('features')}>Features</NavButton>
          <NavButton active={page === 'pricing'} onClick={() => setPage('pricing')}>Pricing</NavButton>
          <NavButton active={page === 'about'} onClick={() => setPage('about')}>About</NavButton>
          <NavButton active={page === 'chat'} onClick={() => setPage('chat')}>Chat</NavButton>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        {page === 'home' && <HomeContent onStart={() => setPage('chat')} />}
        {page === 'features' && <Features />}
        {page === 'pricing' && <Pricing />}
        {page === 'about' && <About />}
        {page === 'chat' && <ChatPage />}
      </main>
      <footer className="border-t mt-12 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-500">
          <div>© {new Date().getFullYear()} DiagnozAI — Built to scale</div>
          <div>Privacy · Terms · Status</div>
        </div>
      </footer>
    </div>
  )
}

function NavButton({ children, active, onClick }) {
  return (
    <button onClick={onClick} className={`px-3 py-2 rounded-md text-sm ${active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
      {children}
    </button>
  );
}

function HomeContent({ onStart }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-4xl font-extrabold">Schnelle, zuverlässige Ersteinschätzung mit KI</h2>
        <p className="mt-4 text-lg text-gray-600">DiagnozAI analysiert Symptome, verbindet Wearables und bietet klare Handlungsempfehlungen — in Sekunden.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={onStart} className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow">Jetzt Chatten</button>
          <a className="px-5 py-3 rounded-lg border border-gray-200 text-sm" href="#features">Mehr erfahren</a>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow">
        <h3 className="font-semibold">Beispiel-Flow</h3>
        <ol className="mt-4 space-y-3 text-gray-600">
          <li>1. Nutzer beschreibt Symptome oder übermittelt Wearable-Daten.</li>
          <li>2. KI analysiert und liefert Ersteinschätzung.</li>
          <li>3. Empfehlung: Arzt, Termin oder Selbsthilfe.</li>
        </ol>
      </div>
    </section>
  )
}

function Features() {
  const items = [
    { title: 'Sofortdiagnose', desc: 'Symptomanalyse in Sekunden.' },
    { title: 'API für Partner', desc: 'Einfach integrierbare REST-API.' },
    { title: 'Wearable-Integration', desc: 'Apple Health, Fitbit & Co.' },
    { title: 'Bildanalyse', desc: 'Haut & Wunden per Foto.' },
  ];
  return (
    <section>
      <h2 className="text-3xl font-bold">Features</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(i => (
          <div key={i.title} className="bg-white p-6 rounded-xl shadow">
            <h4 className="font-semibold">{i.title}</h4>
            <p className="mt-2 text-gray-600">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    { name: 'Free', price: '0€/mo', perks: ['Begrenzte Fragen'] },
    { name: 'Pro', price: '9.99€/mo', perks: ['Unbegrenzte Fragen', 'Wearable Sync'] },
    { name: 'Enterprise', price: 'Custom', perks: ['API-Licence', 'SLA'] },
  ];
  return (
    <section>
      <h2 className="text-3xl font-bold">Preise</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(p => (
          <div key={p.name} className="bg-white p-6 rounded-xl shadow flex flex-col">
            <div className="text-sm text-gray-500">{p.name}</div>
            <div className="text-2xl font-bold mt-2">{p.price}</div>
            <ul className="mt-4 space-y-1 text-gray-600 flex-1">
              {p.perks.map(x => <li key={x}>• {x}</li>)}
            </ul>
            <div className="mt-4">
              <button className="w-full py-2 rounded-md bg-blue-600 text-white">Choose</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section>
      <h2 className="text-3xl font-bold">Über uns</h2>
      <p className="mt-4 text-gray-600">Wir bauen eine skalierbare Diagnoseplattform.</p>
    </section>
  )
}

function ChatPage() {
  const [messages, setMessages] = React.useState([{ id: 1, role: 'system', content: 'Du bist DiagnozAI — gib kurze, präzise Ersteinschätzungen.' }]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const bottomRef = useRef(null);
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages.concat([userMsg]).map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      const assistant = data.assistant || data;
      const assistantMsg = { id: Date.now()+1, role: 'assistant', content: assistant.content || assistant.text || JSON.stringify(assistant) };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now()+2, role: 'assistant', content: 'Fehler: ' + (err.message || 'Server error') }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Chat mit DiagnozAI</h2>
      <p className="text-sm text-gray-500 mt-1">Beschreibe kurz deine Symptome — die KI gibt eine Ersteinschätzung.</p>
      <div className="mt-6 bg-white rounded-2xl shadow p-4">
        <div className="space-y-3 max-h-[60vh] overflow-auto p-2">
          {messages.filter(m => m.role !== 'system').map(m => <MessageBubble key={m.id} role={m.role} content={m.content} />)}
          <div ref={bottomRef} />
        </div>
        <div className="mt-4 flex gap-3 items-center">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Beschreibe Symptome, z. B. 'starke Kopfschmerzen + Fieber'" className="flex-1 border rounded-lg px-4 py-2" />
          <button onClick={handleSend} disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 text-white">{loading ? 'Lädt…' : 'Senden'}</button>
        </div>
        <div className="mt-3 text-xs text-gray-400">Hinweis: Diese KI ersetzt nicht die ärztliche Untersuchung.</div>
      </div>
    </section>
  )
}

function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} px-4 py-3 rounded-xl max-w-[80%]`}>{content}</div>
    </div>
  )
}
