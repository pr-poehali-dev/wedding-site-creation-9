import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO_BG = 'https://cdn.poehali.dev/projects/1970ded7-737a-48ec-97af-3d20cacbf698/bucket/7caa8ce7-085e-48b8-b090-84c47c83b143.jpg';

const NAV_ITEMS = [
  { id: 'hero', label: 'Главная' },
  { id: 'about', label: 'О нас' },
  { id: 'program', label: 'Программа' },
  { id: 'guests', label: 'Гостевая' },
];

const PROGRAM = [
  { time: '15:00', title: 'Церемония', desc: 'Торжественная регистрация брака в Дворце бракосочетания', icon: 'Heart', mapUrl: null },
  { time: '16:30', title: 'Фотосессия', desc: 'Прогулка и съёмка в живописных местах города', icon: 'Camera', mapUrl: null },
  { time: '18:00', title: 'Банкет', desc: 'Тортуга Вилла · Воронежская ул., 33к1, Уфа', icon: 'UtensilsCrossed', mapUrl: 'https://yandex.ru/maps/?text=Воронежская+улица+33к1+Уфа' },
  { time: '19:30', title: 'Первый танец', desc: 'Вальс молодожёнов и танцевальная программа', icon: 'Music', mapUrl: null },
  { time: '23:00', title: 'Завершение', desc: 'Запуск фонариков и прощание с гостями', icon: 'Sparkles', mapUrl: null },
];

const MONOGRAM = 'https://cdn.poehali.dev/projects/1970ded7-737a-48ec-97af-3d20cacbf698/bucket/6d23c700-973f-4e0e-a831-c77c43520a07.png';

export default function Index() {
  const [envelopeState, setEnvelopeState] = useState<'idle' | 'opening' | 'done'>('idle');
  const [showSite, setShowSite] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', attending: 'yes', guests: '1', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [guestList, setGuestList] = useState<{ name: string; message: string; attending: string }[]>([]);
  const [daysLeft, setDaysLeft] = useState(0);

  const handleOpenEnvelope = () => {
    if (envelopeState !== 'idle') return;
    setEnvelopeState('opening');
    setTimeout(() => {
      setEnvelopeState('done');
      setTimeout(() => setShowSite(true), 600);
    }, 1400);
  };

  useEffect(() => {
    const weddingDate = new Date('2026-08-28');
    const now = new Date();
    const diff = Math.ceil((weddingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    setDaysLeft(diff > 0 ? diff : 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(n => document.getElementById(n.id));
      const scrollY = window.scrollY + 80;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setGuestList(prev => [...prev, { name: form.name, message: form.message, attending: form.attending }]);
    setSubmitted(true);
    setForm({ name: '', phone: '', attending: 'yes', guests: '1', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
    {/* Envelope screen */}
    {!showSite && (
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center ${envelopeState === 'done' ? 'envelope-fadeout' : ''}`}
        style={{ background: 'linear-gradient(135deg, #c8b89a 0%, #e8ddd0 50%, #d4c4b0 100%)' }}
      >
        {/* Floating petals bg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['10% 15%','85% 10%','5% 70%','90% 65%','50% 5%','20% 90%'].map((pos, i) => (
            <div key={i} className="absolute text-white/30 text-4xl animate-float" style={{ top: pos.split(' ')[1], left: pos.split(' ')[0], animationDelay: `${i * 0.5}s` }}>🌸</div>
          ))}
        </div>

        <div className="relative flex flex-col items-center" style={{ perspective: '800px' }}>
          {/* Envelope body */}
          <div
            className="relative cursor-pointer select-none"
            style={{ width: 320, height: 220 }}
            onClick={handleOpenEnvelope}
          >
            {/* Envelope base */}
            <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #f5efe8 60%, #e8ddd0 100%)', border: '1.5px solid #c8a97a' }}>

              {/* Bottom triangle */}
              <div className="absolute bottom-0 left-0 right-0" style={{
                width: 0, height: 0, margin: '0 auto',
                borderLeft: '160px solid transparent',
                borderRight: '160px solid transparent',
                borderBottom: '110px solid #dfd3c3',
              }} />

              {/* Left triangle */}
              <div className="absolute left-0 top-0 bottom-0" style={{
                width: 0, height: 0,
                borderTop: '110px solid #e8e0d5',
                borderBottom: '110px solid #e8e0d5',
                borderRight: '160px solid transparent',
              }} />

              {/* Right triangle */}
              <div className="absolute right-0 top-0 bottom-0" style={{
                width: 0, height: 0,
                borderTop: '110px solid #e2d8cc',
                borderBottom: '110px solid #e2d8cc',
                borderLeft: '160px solid transparent',
              }} />

              {/* Gold border line */}
              <div className="absolute inset-3 rounded-xl pointer-events-none" style={{ border: '1px solid #c8a97a55' }} />

              {/* Monogram wax seal */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #c8a97a, #a07848)', border: '2px solid #d4b98a' }}>
                    <img src={MONOGRAM} alt="РМ" className="w-10 h-10 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Envelope lid */}
            <div
              className={`envelope-lid absolute top-0 left-0 right-0 z-20 ${envelopeState !== 'idle' ? 'open' : ''}`}
              style={{ height: '50%' }}
            >
              <div style={{
                width: 0, height: 0,
                borderLeft: '160px solid transparent',
                borderRight: '160px solid transparent',
                borderTop: '110px solid #d4c4b0',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
              }} />
            </div>

            {/* Letter rising */}
            {envelopeState === 'opening' && (
              <div className="letter-rise absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: 30 }}>
                <div className="bg-white rounded-lg shadow-xl px-6 py-4 text-center" style={{ width: 200, border: '1px solid #c8a97a55' }}>
                  <img src={MONOGRAM} alt="РМ" className="w-10 h-10 object-contain mx-auto mb-2 opacity-80" />
                  <p className="font-cormorant italic text-sm text-[hsl(var(--dark))]">Рустам & Мария</p>
                  <p className="font-montserrat text-[10px] text-[hsl(var(--muted-foreground))] mt-1">28 августа 2026</p>
                </div>
              </div>
            )}
          </div>

          {/* Invitation text */}
          <div className="mt-10 text-center">
            <p className="font-cormorant italic text-3xl text-white/90 mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              Приглашение на свадьбу
            </p>
            <p className="font-montserrat text-xs tracking-widest uppercase text-white/60 mb-6">
              Рустам & Мария · 28 августа 2026
            </p>
            {envelopeState === 'idle' && (
              <button
                onClick={handleOpenEnvelope}
                className="font-montserrat text-xs tracking-widest uppercase px-8 py-3 rounded-full border border-white/50 text-white/80 hover:bg-white/20 transition-all animate-bounce"
              >
                Открыть конверт
              </button>
            )}
          </div>
        </div>
      </div>
    )}

    {/* Main site */}
    <div className={`min-h-screen bg-[hsl(var(--cream))] ${showSite ? 'site-reveal' : 'opacity-0 pointer-events-none'}`}>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[hsl(var(--blush))]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <img src="https://cdn.poehali.dev/projects/1970ded7-737a-48ec-97af-3d20cacbf698/bucket/6d23c700-973f-4e0e-a831-c77c43520a07.png" alt="РМ" className="h-10 w-10 object-contain" />

          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link font-montserrat text-sm tracking-widest uppercase transition-colors ${
                    activeSection === item.id
                      ? 'text-[hsl(var(--rose))]'
                      : 'text-[hsl(var(--dark))] hover:text-[hsl(var(--rose))]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-[hsl(var(--dark))]"
            onClick={() => setMobileMenuOpen(o => !o)}
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 border-t border-[hsl(var(--blush))] px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-montserrat text-sm tracking-widest uppercase text-left text-[hsl(var(--dark))] hover:text-[hsl(var(--rose))] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-white/10" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {['top-[15%] left-[10%]', 'top-[25%] right-[12%]', 'top-[60%] left-[5%]', 'top-[40%] right-[8%]'].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} text-2xl opacity-60 animate-float`}
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              🌸
            </div>
          ))}
        </div>

        <div className="relative text-center px-6 animate-fadeIn">
          <img
            src="https://cdn.poehali.dev/projects/1970ded7-737a-48ec-97af-3d20cacbf698/bucket/6d23c700-973f-4e0e-a831-c77c43520a07.png"
            alt="РМ монограмма"
            className="w-28 h-28 object-contain mx-auto mb-4 opacity-90"
          />
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-[hsl(var(--rose))] mb-6">
            мы выходим замуж
          </p>
          <h1 className="font-cormorant font-light text-7xl md:text-9xl text-[hsl(var(--dark))] leading-none mb-4">
            Рустам<br />&<br />Мария
          </h1>
          <div className="divider-rose my-8 text-[hsl(var(--rose))]">
            <span className="font-cormorant italic text-xl text-[hsl(var(--rose))]">28 августа 2026</span>
          </div>
          <p className="font-montserrat text-sm text-[hsl(var(--muted-foreground))] tracking-wider mb-10">
            г. Уфа
          </p>

          {daysLeft > 0 && (
            <div className="inline-flex flex-col items-center bg-white/70 backdrop-blur-sm border border-[hsl(var(--blush))] rounded-2xl px-10 py-5 mb-10">
              <span className="font-cormorant text-5xl text-[hsl(var(--rose))]">{daysLeft}</span>
              <span className="font-montserrat text-xs tracking-widest uppercase text-[hsl(var(--muted-foreground))] mt-1">
                {daysLeft === 1 ? 'день' : daysLeft < 5 ? 'дня' : 'дней'} до свадьбы
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('guests')}
              className="bg-[hsl(var(--rose))] text-white font-montserrat text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[hsl(340,40%,58%)] transition-all hover:shadow-lg hover:shadow-[hsl(var(--rose))]/30"
            >
              Подтвердить присутствие
            </button>
            <button
              onClick={() => scrollTo('program')}
              className="border border-[hsl(var(--rose))] text-[hsl(var(--rose))] font-montserrat text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[hsl(var(--blush))] transition-all"
            >
              Программа дня
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollTo('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[hsl(var(--rose))] animate-bounce"
        >
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* О нас */}
      <section id="about" className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-[hsl(var(--rose))] mb-4">Наша история</p>
          <h2 className="font-cormorant font-light text-5xl md:text-6xl text-[hsl(var(--dark))] mb-12">О нас</h2>

          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--blush))] flex items-center justify-center mb-6">
                <span className="text-2xl">👰</span>
              </div>
              <h3 className="font-cormorant text-3xl text-[hsl(var(--dark))]">Мария</h3>
              <p className="font-montserrat text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                Люблю утренний кофе с книгой, долгие прогулки по набережной и уютные вечера в хорошей компании.
                Верю, что самые важные моменты в жизни — это те, что мы создаём вместе с любимыми людьми.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--blush))] flex items-center justify-center mb-6">
                <span className="text-2xl">🤵</span>
              </div>
              <h3 className="font-cormorant text-3xl text-[hsl(var(--dark))]">Рустам</h3>
              <p className="font-montserrat text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                Обожаю путешествия, кулинарные эксперименты и джазовую музыку. Три года назад встретил человека,
                который изменил мой взгляд на мир и стал самым важным в нём.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-[hsl(var(--cream))] rounded-3xl p-10 border border-[hsl(var(--blush))]">
            <div className="text-4xl mb-4">💌</div>
            <p className="font-cormorant italic text-2xl text-[hsl(var(--dark))] leading-relaxed">
              «Мы познакомились три года назад на набережной Невы. Это была случайная встреча,
              которая изменила всё. Теперь мы хотим разделить наш особенный день с теми,
              кто дорог нам больше всего.»
            </p>
          </div>
        </div>
      </section>

      {/* Программа */}
      <section id="program" className="py-28 px-6 bg-[hsl(var(--cream))]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-[hsl(var(--rose))] mb-4">День свадьбы</p>
          <h2 className="font-cormorant font-light text-5xl md:text-6xl text-[hsl(var(--dark))] mb-16">Программа</h2>

          <div className="relative">
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(var(--blush))] via-[hsl(var(--rose))]/40 to-[hsl(var(--blush))]" />

            <div className="space-y-8">
              {PROGRAM.map((item, i) => (
                <div key={i} className={`relative flex gap-6 md:gap-0 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} pl-14 md:pl-0 text-left`}>
                    <div className="bg-white rounded-2xl p-6 border border-[hsl(var(--blush))] shadow-sm hover:shadow-md transition-shadow inline-block w-full text-left">
                      <span className="font-montserrat text-xs text-[hsl(var(--rose))] tracking-widest">{item.time}</span>
                      <h3 className="font-cormorant text-2xl text-[hsl(var(--dark))] mt-1">{item.title}</h3>
                      <p className="font-montserrat text-xs text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed">{item.desc}</p>
                      {item.mapUrl && (
                        <a
                          href={item.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-3 font-montserrat text-xs text-[hsl(var(--rose))] hover:underline"
                        >
                          <Icon name="MapPin" size={12} />
                          Открыть на карте
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 md:w-10 md:h-10 rounded-full bg-[hsl(var(--blush))] border-2 border-[hsl(var(--rose))]/40 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} fallback="Star" size={16} className="text-[hsl(var(--rose))]" />
                  </div>

                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Гостевая книга */}
      <section id="guests" className="py-28 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-montserrat text-xs tracking-[0.4em] uppercase text-[hsl(var(--rose))] mb-4">Ваш ответ</p>
          <h2 className="font-cormorant font-light text-5xl md:text-6xl text-[hsl(var(--dark))] mb-4">Гостевая книга</h2>
          <p className="font-montserrat text-sm text-[hsl(var(--muted-foreground))] mb-12">
            Пожалуйста, подтвердите своё присутствие до 1 августа 2026 года
          </p>

          {submitted ? (
            <div className="bg-[hsl(var(--blush))]/40 border border-[hsl(var(--rose))]/30 rounded-3xl p-10 mb-10 animate-fadeIn">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="font-cormorant text-3xl text-[hsl(var(--dark))] mb-2">Спасибо!</h3>
              <p className="font-montserrat text-sm text-[hsl(var(--muted-foreground))]">
                Мы рады видеть вас на нашем торжестве. До встречи!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[hsl(var(--cream))] rounded-3xl p-8 border border-[hsl(var(--blush))] text-left space-y-5 mb-12">
              <div>
                <label className="font-montserrat text-xs tracking-wider uppercase text-[hsl(var(--muted-foreground))] block mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Имя Фамилия"
                  className="w-full bg-white border border-[hsl(var(--blush))] rounded-xl px-4 py-3 font-montserrat text-sm text-[hsl(var(--dark))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--rose))] transition-colors"
                />
              </div>

              <div>
                <label className="font-montserrat text-xs tracking-wider uppercase text-[hsl(var(--muted-foreground))] block mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-white border border-[hsl(var(--blush))] rounded-xl px-4 py-3 font-montserrat text-sm text-[hsl(var(--dark))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--rose))] transition-colors"
                />
              </div>

              <div>
                <label className="font-montserrat text-xs tracking-wider uppercase text-[hsl(var(--muted-foreground))] block mb-2">
                  Присутствие
                </label>
                <div className="flex gap-3">
                  {[{ val: 'yes', label: '✅ Буду' }, { val: 'no', label: '❌ Не смогу' }].map(opt => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, attending: opt.val }))}
                      className={`flex-1 py-3 rounded-xl border font-montserrat text-sm transition-all ${
                        form.attending === opt.val
                          ? 'bg-[hsl(var(--rose))] border-[hsl(var(--rose))] text-white'
                          : 'bg-white border-[hsl(var(--blush))] text-[hsl(var(--dark))] hover:border-[hsl(var(--rose))]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {form.attending === 'yes' && (
                <div>
                  <label className="font-montserrat text-xs tracking-wider uppercase text-[hsl(var(--muted-foreground))] block mb-2">
                    Количество гостей
                  </label>
                  <select
                    value={form.guests}
                    onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                    className="w-full bg-white border border-[hsl(var(--blush))] rounded-xl px-4 py-3 font-montserrat text-sm text-[hsl(var(--dark))] focus:outline-none focus:border-[hsl(var(--rose))] transition-colors"
                  >
                    {['1', '2', '3', '4', '5+'].map(n => (
                      <option key={n} value={n}>{n} {n === '1' ? 'человек' : 'человека'}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="font-montserrat text-xs tracking-wider uppercase text-[hsl(var(--muted-foreground))] block mb-2">
                  Пожелание молодожёнам
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Напишите тёплые слова..."
                  rows={3}
                  className="w-full bg-white border border-[hsl(var(--blush))] rounded-xl px-4 py-3 font-montserrat text-sm text-[hsl(var(--dark))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--rose))] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[hsl(var(--rose))] text-white font-montserrat text-xs tracking-widest uppercase py-4 rounded-xl hover:bg-[hsl(340,40%,58%)] transition-all hover:shadow-lg hover:shadow-[hsl(var(--rose))]/30"
              >
                Отправить ответ
              </button>
            </form>
          )}

          {guestList.length > 0 && (
            <div className="space-y-4 text-left">
              <h3 className="font-cormorant text-2xl text-[hsl(var(--dark))] text-center mb-6">Пожелания гостей</h3>
              {guestList.map((g, i) => (
                <div key={i} className="bg-[hsl(var(--cream))] rounded-2xl p-6 border border-[hsl(var(--blush))]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[hsl(var(--blush))] flex items-center justify-center text-sm">
                      {g.attending === 'yes' ? '✅' : '❌'}
                    </div>
                    <span className="font-cormorant text-xl text-[hsl(var(--dark))]">{g.name}</span>
                  </div>
                  {g.message && (
                    <p className="font-montserrat text-sm text-[hsl(var(--muted-foreground))] leading-relaxed italic ml-11">
                      «{g.message}»
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(var(--dark))] py-12 px-6 text-center">
        <img
          src="https://cdn.poehali.dev/projects/1970ded7-737a-48ec-97af-3d20cacbf698/bucket/6d23c700-973f-4e0e-a831-c77c43520a07.png"
          alt="РМ монограмма"
          className="w-16 h-16 object-contain mx-auto mb-4 opacity-70"
        />
        <p className="font-cormorant italic text-3xl text-[hsl(var(--blush))] mb-2">Рустам & Мария</p>
        <p className="font-montserrat text-xs tracking-widest uppercase text-[hsl(var(--blush))]/50">
          28 августа 2026 · Уфа
        </p>
        <div className="mt-6 text-[hsl(var(--rose))]/60 text-xl">🌸</div>
      </footer>
    </div>
    </>
  );
}