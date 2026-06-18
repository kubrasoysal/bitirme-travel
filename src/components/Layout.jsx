import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/plan', label: 'Plan Oluştur', icon: '✦' },
  { path: '/itinerary', label: 'Rotam', icon: '◎' },
  { path: '/archive', label: 'Planlarım', icon: '☰' }
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/plan" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg text-white shadow-glow">
              ✈
            </div>
            <div>
              <p className="font-display text-lg font-bold tracking-tight text-navy-900 group-hover:text-brand-700 transition">
                VoyageAI
              </p>
              <p className="hidden text-xs text-slate-500 sm:block">Akıllı Seyahat Asistanı</p>
            </div>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition sm:px-4 ${
                    active
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="mr-1.5 hidden sm:inline">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <span className="badge-brand hidden lg:inline-flex">
            GPT Agent · Mock API
          </span>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-white/60 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          Bitirme Projesi · AI Destekli Seyahat Planlama · React + Express + OpenAI + Leaflet
        </div>
      </footer>
    </div>
  );
}
