import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  ExternalLink,
  Factory,
  FileText,
  Hammer,
  LayoutDashboard,
  Mail,
  Menu,
  Package,
  Pencil,
  Phone,
  Plus,
  Ruler,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Truck,
  Upload,
  Users,
  X,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, useRoute } from 'wouter';
import {
  addLead,
  equipment,
  industries,
  leadStatuses,
  projects,
  readLeads,
  services,
  type Equipment,
  type Lead,
  type LeadStatus,
  type Project,
} from './data';

const iconMap = {
  building: Building2,
  ruler: Ruler,
  hammer: Hammer,
  truck: Truck,
  clipboard: ClipboardList,
  factory: Factory,
  sun: Sun,
};

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" data-testid="link-logo">
      <span className={`relative grid h-10 w-10 place-items-center rounded-full border-2 ${dark ? 'border-[hsl(var(--primary))]' : 'border-[hsl(var(--accent))]'}`}>
        <span className={`absolute inset-[4px] rounded-full border ${dark ? 'border-[hsl(var(--primary))]/35' : 'border-white/45'}`} />
        <span className={`display relative text-sm font-bold ${dark ? 'text-[hsl(var(--primary))]' : 'text-white'}`}>SH</span>
        <span className="absolute -right-1 top-3 h-1.5 w-5 rotate-[-22deg] bg-[hsl(var(--accent))]" />
      </span>
      <span className="leading-none">
        <span className={`display block text-[1.02rem] font-bold tracking-[-.04em] ${dark ? 'text-[hsl(var(--secondary))]' : 'text-white'}`}>STRUCTURE HUB</span>
        <span className={`mt-1 block text-[.55rem] font-semibold tracking-[.17em] ${dark ? 'text-[hsl(var(--muted-foreground))]' : 'text-white/65'}`}>PRIVATE LIMITED · GWERU</span>
      </span>
    </Link>
  );
}

function PublicHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Services', '/services'],
    ['Projects', '/projects'],
    ['About', '/about'],
    ['Equipment', '/equipment'],
    ['Contact', '/contact'],
  ];
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="container-wide flex items-center justify-between border-b border-white/15 py-5">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href} className="link-underline text-[.76rem] font-semibold text-white/80 hover:text-white" data-testid={`link-nav-${label.toLowerCase()}`}>{label}</Link>)}
          <Link href="/admin" className="text-[.7rem] font-semibold text-white/55 hover:text-white" data-testid="link-nav-admin">Portal</Link>
          <Link href="/contact#quote" className="rounded-sm bg-[hsl(var(--accent))] px-4 py-2.5 text-[.74rem] font-bold text-[hsl(var(--secondary))] transition-transform hover:-translate-y-0.5" data-testid="link-nav-quote">Request a quote <ArrowRight className="ml-2 inline h-3.5 w-3.5" /></Link>
        </nav>
        <button type="button" className="grid h-10 w-10 place-items-center border border-white/25 text-white lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" data-testid="button-toggle-menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="container-wide absolute inset-x-0 top-[81px] flex flex-col gap-1 border-t border-white/10 bg-[hsl(var(--secondary))] p-3 lg:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10">{label}</Link>)}
          <Link href="/admin" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10">Business portal</Link>
          <Link href="/contact#quote" onClick={() => setOpen(false)} className="mt-1 bg-[hsl(var(--accent))] px-4 py-3 text-sm font-bold text-[hsl(var(--secondary))]">Request a quote <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[hsl(var(--secondary))] py-12 text-white">
      <div className="container-wide grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div><Logo /><p className="mt-6 max-w-xs text-sm leading-6 text-white/55">Civil engineering, construction and practical site capability for Zimbabwe.</p></div>
        <div><p className="eyebrow text-[hsl(var(--accent))]">Explore</p><div className="mt-4 grid gap-3 text-sm text-white/65"><Link href="/services" className="hover:text-white">Services</Link><Link href="/projects" className="hover:text-white">Projects</Link><Link href="/equipment" className="hover:text-white">Equipment hire</Link><Link href="/about" className="hover:text-white">About Structure Hub</Link></div></div>
        <div><p className="eyebrow text-[hsl(var(--accent))]">Reach us</p><div className="mt-4 grid gap-3 text-sm text-white/65"><a href="tel:+263715686906" className="hover:text-white">0715 686 906</a><a href="mailto:structurehub50@gmail.com" className="hover:text-white">structurehub50@gmail.com</a><span>12 Bedford Road, L.I.S, Gweru</span></div></div>
      </div>
      <div className="container-wide mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-5 text-[.68rem] uppercase tracking-[.14em] text-white/40 md:flex-row"><span>Quality and Standard Our Command</span><span>© {new Date().getFullYear()} Structure Hub Private Limited</span></div>
    </footer>
  );
}

function PublicShell({ children }: { children: ReactNode }) {
  return <div className="grain min-h-[100dvh] overflow-hidden bg-[hsl(var(--background))]"><PublicHeader />{children}<Footer /></div>;
}

function PageIntro({ eyebrow, title, text, image = '/images/team-site.jpg' }: { eyebrow: string; title: ReactNode; text: string; image?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-[hsl(var(--secondary))] py-36 text-white md:py-44">
      <div className="absolute inset-0 -z-10"><img src={image} alt="" className="photo h-full w-full object-cover opacity-25" /><div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(192_61%_16%/.98),hsl(192_61%_16%/.65),hsl(192_61%_16%/.2))]" /></div>
      <div className="container-wide max-w-6xl"><div className="flex items-center gap-3 text-[hsl(var(--accent))]"><span className="h-px w-12 bg-[hsl(var(--accent))]" /><span className="eyebrow">{eyebrow}</span></div><h1 className="display mt-7 max-w-4xl text-5xl font-semibold leading-[.93] md:text-8xl">{title}</h1><p className="mt-7 max-w-xl text-base leading-7 text-white/70 md:text-lg">{text}</p></div>
    </section>
  );
}

function ServiceIcon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? Building2;
  return <Icon className={className} strokeWidth={1.5} />;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card group overflow-hidden bg-[hsl(var(--secondary))] text-white">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative h-64 overflow-hidden"><img src={project.image} alt={project.name} className="photo h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--secondary))] via-transparent to-transparent opacity-80" /><span className="absolute left-5 top-5 text-[.65rem] font-bold tracking-[.16em] text-white/75">{project.filter.toUpperCase()} · {project.year}</span><span className="absolute right-5 top-5 bg-white/15 px-2 py-1 text-[.6rem] font-bold uppercase tracking-[.12em] backdrop-blur-sm">{project.status}</span></div>
        <div className="p-6"><p className="text-[.68rem] font-semibold uppercase tracking-[.12em] text-[hsl(var(--accent))]">{project.kind}</p><h3 className="display mt-3 text-2xl font-semibold leading-tight">{project.name}</h3><p className="mt-2 text-xs text-white/55">{project.location}</p><p className="mt-5 text-sm leading-6 text-white/68">{project.summary}</p><span className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-[.14em] text-[hsl(var(--accent))]">View project <ArrowRight className="ml-3 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></div>
      </Link>
    </article>
  );
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const contact = String(form.get('contact') ?? '').trim();
    const brief = String(form.get('brief') ?? '').trim();
    if (!name || !contact || !brief) { setError('Please complete your name, contact and project brief.'); setSubmitted(false); return; }
    addLead({ id: `SH-${Date.now().toString().slice(-4)}`, name, organisation: String(form.get('organisation') ?? '').trim() || 'Website enquiry', service: String(form.get('service') ?? 'Construction'), location: String(form.get('location') ?? '').trim() || 'Not provided', contact, brief, status: 'New', createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), priority: 'Normal' });
    setError('');
    setSubmitted(true);
    event.currentTarget.reset();
  }
  return (
    <form className="border border-white/20 bg-[hsl(var(--secondary))]/30 p-6 md:p-8" onSubmit={submit} data-testid="form-quote">
      <div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-semibold text-white/70">Your name<input name="name" required placeholder="Name or organisation" className="field-dark" data-testid="input-quote-name" /></label><label className="text-xs font-semibold text-white/70">Email or phone<input name="contact" required placeholder="How should we reach you?" className="field-dark" data-testid="input-quote-contact" /></label></div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2"><label className="text-xs font-semibold text-white/70">Organisation<input name="organisation" placeholder="Company or institution" className="field-dark" /></label><label className="text-xs font-semibold text-white/70">Project location<input name="location" placeholder="Town or site location" className="field-dark" /></label></div>
      <label className="mt-6 block text-xs font-semibold text-white/70">What do you need?<select name="service" defaultValue="Construction" className="field-dark text-white"><option>Construction</option>{services.slice(1).map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
      <label className="mt-6 block text-xs font-semibold text-white/70">Project brief<textarea name="brief" required rows={4} placeholder="Location, scope, timing and anything useful to know..." className="field-dark resize-none" data-testid="textarea-quote-brief" /></label>
      {error && <p className="mt-4 text-xs font-semibold text-[hsl(var(--accent))]">{error}</p>}
      {submitted && <div className="mt-5 flex items-start gap-3 border border-[hsl(var(--accent))]/40 bg-[hsl(var(--accent))]/10 p-4 text-sm text-white/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" /><span>Request received. The Structure Hub team can now follow it up in the business portal.</span></div>}
      <div className="mt-7 flex flex-wrap gap-4"><button type="submit" className="inline-flex items-center bg-[hsl(var(--accent))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--secondary))] transition-transform hover:-translate-y-1" data-testid="button-submit-quote">Submit request <Send className="ml-5 h-4 w-4" /></button>{submitted && <a href="mailto:structurehub50@gmail.com" className="inline-flex items-center border border-white/25 px-5 py-3.5 text-sm font-semibold text-white hover:border-white">Email the team <Mail className="ml-3 h-4 w-4" /></a>}</div>
    </form>
  );
}

function HomePage() {
  useEffect(() => { document.title = 'Structure Hub | Civil Engineering & Construction in Zimbabwe'; }, []);
  return (
    <PublicShell>
      <main>
        <section className="relative isolate min-h-[730px] bg-[hsl(var(--secondary))] text-white">
          <div className="absolute inset-0 -z-10"><img src="/images/team-site.jpg" alt="Structure Hub team prepared for industrial work" className="photo image-drift h-full w-full object-cover opacity-35" /><div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(192_61%_16%/.98)_0%,hsl(192_61%_16%/.82)_45%,hsl(192_61%_16%/.3)_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(0deg,hsl(192_61%_16%/.82),transparent_42%)]" /></div>
          <div className="container-wide grid min-h-[730px] items-end pb-20 pt-40 md:grid-cols-[1.1fr_.9fr] md:items-center md:pb-10"><div className="max-w-3xl"><div className="rise flex items-center gap-3 text-[hsl(var(--accent))]"><span className="rule-sweep h-px w-12 bg-[hsl(var(--accent))]" /><span className="eyebrow">Gweru · Zimbabwe · Established 2022</span></div><h1 className="display rise rise-1 mt-6 max-w-3xl text-[clamp(3.4rem,9vw,7.6rem)] font-semibold leading-[.88] text-[hsl(var(--background))]">Building<br /><span className="text-[hsl(var(--accent))]">Zimbabwe’s</span><br />future.</h1><p className="rise rise-2 mt-8 max-w-lg text-base leading-7 text-white/72 md:text-lg">Civil engineering, construction and practical site capability for the places where people live, learn, work and produce.</p><div className="rise rise-3 mt-9 flex flex-wrap gap-3"><Link href="/contact#quote" className="inline-flex items-center bg-[hsl(var(--accent))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--secondary))]">Request a quote <ArrowRight className="ml-5 h-4 w-4" /></Link><Link href="/projects" className="inline-flex items-center border border-white/35 px-5 py-3.5 text-sm font-semibold text-white hover:border-white hover:bg-white/10">View our projects <ArrowRight className="ml-4 h-4 w-4" /></Link></div></div><div className="hidden justify-self-end md:block"><div className="rise rise-4 w-64 border border-white/20 bg-[hsl(var(--secondary))]/65 p-5 backdrop-blur-sm"><div className="mb-10 flex items-center justify-between"><Sparkles className="h-5 w-5 text-[hsl(var(--accent))]" /><span className="eyebrow text-white/50">Our standard</span></div><p className="display text-3xl font-medium leading-tight">Quality and<br /><span className="text-[hsl(var(--accent))]">standard</span> our<br />command.</p><div className="mt-8 h-px bg-white/20" /><p className="mt-3 text-xs leading-5 text-white/55">A Zimbabwean-owned team with the range to take a project from groundworks to finish.</p></div></div></div>
        </section>
        <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]"><div className="container-wide grid grid-cols-2 md:grid-cols-4">{[['7+', 'core service lines'], ['2022', 'registered in Zimbabwe'], ['30 yrs', 'post-experience leadership'], ['1–21 days', 'typical delivery lead time']].map(([value, label], index) => <div key={label} className={`border-r border-[hsl(var(--border))] px-4 py-7 ${index === 3 ? 'border-r-0' : ''}`}><p className="display text-2xl font-semibold text-[hsl(var(--primary))] md:text-3xl">{value}</p><p className="mt-1 text-[.68rem] font-semibold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">{label}</p></div>)}</div></section>
        <section className="section-pad"><div className="container-wide grid gap-12 md:grid-cols-[.72fr_1.28fr] md:gap-20"><div><p className="eyebrow text-[hsl(var(--primary))]">01 / What we do</p><h2 className="display mt-5 text-5xl font-semibold leading-[.98] text-[hsl(var(--secondary))] md:text-6xl">Capability<br /><span className="text-[hsl(var(--primary))]">without gaps.</span></h2><p className="mt-7 max-w-sm text-[.98rem] leading-7 text-[hsl(var(--muted-foreground))]">One accountable partner across the full life of a build — from a surveyed site and steel frame to the final finish, maintenance or power upgrade.</p><Link href="/services" className="link-underline mt-8 inline-flex items-center text-sm font-bold text-[hsl(var(--secondary))]">Explore all services <ArrowRight className="ml-3 h-4 w-4 text-[hsl(var(--primary))]" /></Link></div><div className="grid border-l border-t border-[hsl(var(--border))] sm:grid-cols-2">{services.map((service) => <Link href={`/services#${service.slug}`} key={service.slug} className="service-card group border-b border-r border-[hsl(var(--border))] p-6 md:p-7"><ServiceIcon name={service.icon} className="h-6 w-6 text-[hsl(var(--primary))]" /><h3 className="display mt-9 text-xl font-semibold text-[hsl(var(--secondary))]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{service.text}</p><span className="mt-7 flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">Explore <ArrowRight className="h-3.5 w-3.5" /></span></Link>)}</div></div></section>
        <section className="bg-[hsl(var(--secondary))] py-24 text-white"><div className="container-wide grid gap-12 md:grid-cols-[.9fr_1.1fr] md:items-center"><div><p className="eyebrow text-[hsl(var(--accent))]">02 / Built here. Ready anywhere.</p><h2 className="display mt-5 text-5xl font-semibold leading-[.95] md:text-6xl">The range to<br /><span className="text-[hsl(var(--accent))]">take it further.</span></h2><p className="mt-7 max-w-lg text-base leading-7 text-white/70">From school blocks and homes to industrial sites, Structure Hub brings a practical, coordinated team to projects that need more than a single trade.</p><Link href="/about" className="mt-8 inline-flex items-center border-b border-[hsl(var(--accent))] pb-2 text-sm font-bold text-white">Our story and values <ArrowRight className="ml-3 h-4 w-4 text-[hsl(var(--accent))]" /></Link></div><div className="grid gap-4 sm:grid-cols-2">{[['10+', 'industries served'], ['6', 'documented projects'], ['1', 'owned Gweru workshop'], ['360°', 'project perspective']].map(([value, label]) => <div key={label} className="border border-white/15 p-7"><p className="display text-4xl font-semibold text-[hsl(var(--accent))]">{value}</p><p className="mt-3 text-sm text-white/55">{label}</p></div>)}</div></div></section>
        <section className="section-pad bg-[hsl(var(--card))]"><div className="container-wide"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="eyebrow text-[hsl(var(--primary))]">03 / Selected work</p><h2 className="display mt-4 text-5xl font-semibold leading-none text-[hsl(var(--secondary))] md:text-6xl">Work that<br /><span className="text-[hsl(var(--primary))]">holds up.</span></h2></div><Link href="/projects" className="inline-flex items-center text-sm font-bold text-[hsl(var(--secondary))]">View project archive <ArrowRight className="ml-3 h-4 w-4 text-[hsl(var(--primary))]" /></Link></div><div className="mt-10 grid gap-5 md:grid-cols-3">{projects.slice(0, 3).map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div></section>
        <section className="section-pad bg-[hsl(var(--primary))] text-white"><div className="container-wide grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-24"><div><p className="eyebrow text-[hsl(var(--accent))]">04 / Start a conversation</p><h2 className="display mt-5 text-5xl font-semibold leading-[.93] md:text-7xl">Tell us what<br /><span className="text-[hsl(var(--accent))]">you’re building.</span></h2><p className="mt-7 max-w-sm text-sm leading-6 text-white/75">Share the essentials and our team will come back with the right next step — a call, a site visit or a considered quotation.</p><div className="mt-10 space-y-4 text-sm"><a href="tel:+263715686906" className="flex items-center gap-3 font-semibold hover:text-[hsl(var(--accent))]"><Phone className="h-4 w-4 text-[hsl(var(--accent))]" />0715 686 906</a><a href="mailto:structurehub50@gmail.com" className="flex items-center gap-3 font-semibold hover:text-[hsl(var(--accent))]"><Mail className="h-4 w-4 text-[hsl(var(--accent))]" />structurehub50@gmail.com</a></div></div><QuoteForm /></div></section>
      </main>
    </PublicShell>
  );
}

function ServicesPage() {
  return <PublicShell><PageIntro eyebrow="Services / 01" title={<>One team.<br /><span className="text-[hsl(var(--accent))]">More ways forward.</span></>} text="A broad, practical service range for construction, civil engineering, steel, supply, power and maintenance projects across Zimbabwe." image="/images/roofing-page.png" /><main className="section-pad"><div className="container-wide space-y-5">{services.map((service, index) => <article id={service.slug} key={service.slug} className="grid scroll-mt-10 gap-8 border-t border-[hsl(var(--border))] py-10 md:grid-cols-[.25fr_.35fr_.9fr] md:items-start"><div className="eyebrow text-[hsl(var(--primary))]">{service.kicker}</div><div className="flex items-start gap-4"><ServiceIcon name={service.icon} className="mt-1 h-7 w-7 shrink-0 text-[hsl(var(--primary))]" /><h2 className="display text-3xl font-semibold leading-none text-[hsl(var(--secondary))] md:text-4xl">{service.title}</h2></div><div><p className="max-w-xl text-base leading-7 text-[hsl(var(--muted-foreground))]">{service.detail}</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{service.bullets.map((bullet) => <div key={bullet} className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--secondary))]"><Check className="h-4 w-4 text-[hsl(var(--primary))]" />{bullet}</div>)}</div></div></article>)}</div></main><section className="bg-[hsl(var(--secondary))] py-20 text-white"><div className="container-wide flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow text-[hsl(var(--accent))]">Need a combination?</p><h2 className="display mt-3 text-4xl font-semibold">Let’s scope the whole job.</h2></div><Link href="/contact#quote" className="inline-flex items-center bg-[hsl(var(--accent))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--secondary))]">Request a quote <ArrowRight className="ml-4 h-4 w-4" /></Link></div></section></PublicShell>;
}

function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Construction', 'Roofing', 'Schools', 'Industrial', 'Civil'];
  const filtered = projects.filter((project) => filter === 'All' || project.filter === filter);
  return <PublicShell><PageIntro eyebrow="Projects / 02" title={<>Proof in<br /><span className="text-[hsl(var(--accent))]">the work.</span></>} text="A growing archive of documented work across institutions, homes, schools, industrial sites and community projects." image="/images/gare-school.jpg" /><main className="section-pad bg-[hsl(var(--card))]"><div className="container-wide"><div className="flex flex-wrap gap-2 border-y border-[hsl(var(--border))] py-4">{filters.map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={`px-3 py-2 text-[.68rem] font-bold uppercase tracking-[.12em] ${filter === item ? 'bg-[hsl(var(--secondary))] text-white' : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]'}`}>{item}</button>)}</div><div className="mt-8 grid gap-5 md:grid-cols-3">{filtered.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div></main></PublicShell>;
}

function ProjectDetailPage() {
  const [, params] = useRoute('/projects/:slug');
  const project = projects.find((item) => item.slug === params?.slug) ?? projects[0];
  return <PublicShell><section className="relative isolate overflow-hidden bg-[hsl(var(--secondary))] py-36 text-white md:py-44"><div className="absolute inset-0 -z-10"><img src={project.image} alt="" className="h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(192_61%_16%/.98),hsl(192_61%_16%/.6),transparent)]" /></div><div className="container-wide"><Link href="/projects" className="inline-flex items-center text-xs font-bold uppercase tracking-[.15em] text-white/60 hover:text-white"><ArrowLeft className="mr-2 h-4 w-4" />Back to projects</Link><p className="eyebrow mt-12 text-[hsl(var(--accent))]">{project.kind} · {project.year}</p><h1 className="display mt-5 max-w-4xl text-5xl font-semibold leading-[.93] md:text-8xl">{project.name}</h1><p className="mt-6 text-sm text-white/60">{project.location} · {project.status}</p></div></section><main className="section-pad"><div className="container-wide grid gap-12 md:grid-cols-[1.2fr_.8fr]"><div><img src={project.image} alt={project.name} className="photo aspect-[4/3] w-full object-cover" /><div className="mt-8 grid gap-8 sm:grid-cols-2"><div><p className="eyebrow text-[hsl(var(--primary))]">Project overview</p><p className="mt-4 text-base leading-7 text-[hsl(var(--muted-foreground))]">{project.summary}</p></div><div><p className="eyebrow text-[hsl(var(--primary))]">Scope of work</p><div className="mt-4 grid gap-3">{project.scope.map((item) => <div key={item} className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--secondary))]"><Check className="h-4 w-4 text-[hsl(var(--primary))]" />{item}</div>)}</div></div></div></div><aside className="h-fit bg-[hsl(var(--secondary))] p-7 text-white"><p className="eyebrow text-[hsl(var(--accent))]">Start something similar</p><h2 className="display mt-4 text-3xl font-semibold leading-tight">Bring us the brief.</h2><p className="mt-4 text-sm leading-6 text-white/65">Tell us what you’re planning and the team will help map the right next step.</p><Link href="/contact#quote" className="mt-7 inline-flex items-center bg-[hsl(var(--accent))] px-4 py-3 text-sm font-bold text-[hsl(var(--secondary))]">Request a quote <ArrowRight className="ml-4 h-4 w-4" /></Link></aside></div></main></PublicShell>;
}

function AboutPage() {
  return <PublicShell><PageIntro eyebrow="About / 03" title={<>Built here.<br /><span className="text-[hsl(var(--accent))]">Ready anywhere.</span></>} text="Structure Hub is a Zimbabwean-owned company registered in 2022 and operating from owned premises in Gweru’s Light Industrial Sites." image="/images/brand-header.png" /><main><section className="section-pad"><div className="container-wide grid gap-12 md:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-[hsl(var(--primary))]">The company</p><h2 className="display mt-5 text-5xl font-semibold leading-none text-[hsl(var(--secondary))]">Practical experience.<br /><span className="text-[hsl(var(--primary))]">Local perspective.</span></h2></div><div className="text-base leading-8 text-[hsl(var(--muted-foreground))]"><p>Structure Hub Private Limited was formed to cater for the Civil & Construction Engineering Works, Steel Works, Plant and Equipment Hire and Hardware needs of both rural and urban Zimbabwe.</p><p className="mt-6">Our leadership combines construction engineering, wood technology and design, joinery and more than 30 years of post-experience knowledge — giving clients a team that understands both the drawing and the real site.</p></div></div></section><section className="bg-[hsl(var(--secondary))] py-24 text-white"><div className="container-wide grid gap-6 md:grid-cols-3"><div className="border border-white/15 p-7"><p className="eyebrow text-[hsl(var(--accent))]">Vision</p><p className="display mt-5 text-3xl leading-tight">Centre of quality and standard service, satisfaction and value for money.</p></div><div className="border border-white/15 p-7"><p className="eyebrow text-[hsl(var(--accent))]">Mission</p><p className="mt-5 text-lg leading-7 text-white/75">To maintain progress in the long run while aiming for higher quality and standard workmanship than competitors.</p></div><div className="border border-white/15 p-7"><p className="eyebrow text-[hsl(var(--accent))]">Values</p><div className="mt-5 flex flex-wrap gap-2">{['Quality', 'Transparency', 'Integrity', 'Professional', 'Honesty', 'Compliance', 'Creativity', 'Innovation', 'Compassion'].map((item) => <span key={item} className="border border-white/20 px-3 py-2 text-xs text-white/75">{item}</span>)}</div></div></div></section><section className="section-pad"><div className="container-wide"><p className="eyebrow text-[hsl(var(--primary))]">Industries we serve</p><div className="mt-8 grid grid-cols-2 border-l border-t border-[hsl(var(--border))] sm:grid-cols-3 md:grid-cols-5">{industries.map((industry, index) => <div key={industry} className="min-h-24 border-b border-r border-[hsl(var(--border))] p-4"><span className="text-[.65rem] font-bold text-[hsl(var(--primary))]">0{index + 1}</span><span className="display mt-8 block text-lg font-semibold text-[hsl(var(--secondary))]">{industry}</span></div>)}</div></div></section></main></PublicShell>;
}

function EquipmentPage() {
  const [equipmentFilter, setEquipmentFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(equipment.map((item) => item.category)))];
  const filtered = equipmentFilter === 'All' ? equipment : equipment.filter((item) => item.category === equipmentFilter);
  return <PublicShell><PageIntro eyebrow="Equipment / 04" title={<>Capacity when<br /><span className="text-[hsl(var(--accent))]">you need it.</span></>} text="A practical equipment and logistics service for teams who need dependable capacity on site. Enquire for specifications and availability." image="/images/trucks-page.png" /><main className="section-pad bg-[hsl(var(--card))]"><div className="container-wide"><div className="flex flex-wrap gap-2 border-y border-[hsl(var(--border))] py-4">{categories.map((item) => <button type="button" key={item} onClick={() => setEquipmentFilter(item)} className={`px-3 py-2 text-[.68rem] font-bold uppercase tracking-[.12em] ${equipmentFilter === item ? 'bg-[hsl(var(--secondary))] text-white' : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]'}`}>{item}</button>)}</div><div className="mt-8 grid gap-5 md:grid-cols-3">{filtered.map((item) => <EquipmentCard key={item.id} item={item} />)}</div></div></main><section className="bg-[hsl(var(--primary))] py-20 text-white"><div className="container-wide flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow text-[hsl(var(--accent))]">Need a machine or delivery?</p><h2 className="display mt-3 text-4xl font-semibold">Tell us the job, date and location.</h2></div><Link href="/contact#quote" className="inline-flex items-center bg-[hsl(var(--accent))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--secondary))]">Request equipment <ArrowRight className="ml-4 h-4 w-4" /></Link></div></section></PublicShell>;
}

function EquipmentCard({ item }: { item: Equipment }) {
  return <article className="overflow-hidden bg-[hsl(var(--background))]"><div className="relative h-56 overflow-hidden"><img src={item.image} alt={item.name} className="photo h-full w-full object-cover" /><span className={`absolute right-4 top-4 px-2 py-1 text-[.6rem] font-bold uppercase tracking-[.12em] ${item.availability === 'Available' ? 'bg-[hsl(var(--primary))] text-white' : 'bg-[hsl(var(--secondary))] text-white'}`}>{item.availability}</span></div><div className="p-6"><p className="eyebrow text-[hsl(var(--primary))]">{item.category}</p><h3 className="display mt-3 text-2xl font-semibold text-[hsl(var(--secondary))]">{item.name}</h3><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{item.specs}</p><Link href="/contact#quote" className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-[.14em] text-[hsl(var(--secondary))]">Request availability <ArrowRight className="ml-3 h-3.5 w-3.5 text-[hsl(var(--primary))]" /></Link></div></article>;
}

function HardwarePage() {
  const categories = ['Building materials', 'Steel', 'Roofing', 'Plumbing', 'Electrical', 'Construction supplies', 'General hardware'];
  return <PublicShell><PageIntro eyebrow="Hardware / 05" title={<>The right materials<br /><span className="text-[hsl(var(--accent))]">keep work moving.</span></>} text="Request pricing and availability for the materials that keep your project on schedule. We’ll come back with the right supply conversation." image="/images/bata-roofing.jpg" /><main className="section-pad"><div className="container-wide grid gap-12 md:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow text-[hsl(var(--primary))]">Supply categories</p><h2 className="display mt-5 text-5xl font-semibold leading-none text-[hsl(var(--secondary))]">Hardware that<br /><span className="text-[hsl(var(--primary))]">meets the brief.</span></h2><p className="mt-7 max-w-sm text-base leading-7 text-[hsl(var(--muted-foreground))]">Prices and availability move with the market. Send us your list and we’ll help you source the right materials for the work.</p><Link href="/contact#quote" className="mt-8 inline-flex items-center bg-[hsl(var(--secondary))] px-5 py-3.5 text-sm font-bold text-white">Request a price <ArrowRight className="ml-4 h-4 w-4 text-[hsl(var(--accent))]" /></Link></div><div className="grid border-l border-t border-[hsl(var(--border))] sm:grid-cols-2">{categories.map((category, index) => <div key={category} className="flex min-h-32 flex-col justify-between border-b border-r border-[hsl(var(--border))] p-6"><span className="text-[.65rem] font-bold text-[hsl(var(--primary))]">0{index + 1}</span><span className="display text-2xl font-semibold text-[hsl(var(--secondary))]">{category}</span></div>)}</div></div></main></PublicShell>;
}

function ContactPage() {
  return <PublicShell><PageIntro eyebrow="Contact / 06" title={<>Let’s make<br /><span className="text-[hsl(var(--accent))]">a plan.</span></>} text="Bring us the scope, the site or simply the first question. We’ll help shape the right next step." image="/images/team-page.png" /><main><section id="quote" className="scroll-mt-10 bg-[hsl(var(--primary))] py-24 text-white"><div className="container-wide grid gap-12 md:grid-cols-[.75fr_1.25fr] md:gap-20"><div><p className="eyebrow text-[hsl(var(--accent))]">Request a quote</p><h2 className="display mt-5 text-5xl font-semibold leading-[.93] md:text-6xl">A clear brief<br />starts here.</h2><p className="mt-7 max-w-sm text-sm leading-6 text-white/75">Share the project basics. The enquiry will be captured for follow-up by the Structure Hub team.</p></div><QuoteForm /></div></section><section className="section-pad"><div className="container-wide grid gap-10 md:grid-cols-3"><div><p className="eyebrow text-[hsl(var(--primary))]">Office & workshop</p><p className="mt-4 text-lg font-semibold leading-8 text-[hsl(var(--secondary))]">12 Bedford Road<br />Light Industrial Sites<br />Gweru, Zimbabwe</p></div><div><p className="eyebrow text-[hsl(var(--primary))]">Call the team</p><div className="mt-4 grid gap-2 text-lg font-semibold leading-8 text-[hsl(var(--secondary))]"><a href="tel:+263715686906">0715 686 906</a><a href="tel:+263773078875">0773 078 875</a><a href="tel:+263788814495">0788 814 495</a><a href="tel:+263542228106">+263-54-2228106</a></div></div><div><p className="eyebrow text-[hsl(var(--primary))]">Email</p><a href="mailto:structurehub50@gmail.com" className="mt-4 block text-lg font-semibold text-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))]">structurehub50@gmail.com</a><p className="mt-6 text-sm leading-6 text-[hsl(var(--muted-foreground))]">We work with individuals, schools, tertiary institutions, companies, mines, government institutions, NGOs, banks and retail teams.</p></div></div></section></main></PublicShell>;
}

function AdminLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const nav = [['/admin', 'Overview', LayoutDashboard], ['/admin/leads', 'Quote requests', ClipboardList], ['/admin/projects', 'Projects', Building2], ['/admin/equipment', 'Equipment', Truck], ['/admin/content', 'Website content', FileText]] as const;
  return <div className="min-h-[100dvh] bg-[#eef3ef] text-[hsl(var(--secondary))]"><aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[hsl(var(--secondary))] text-white md:flex"><div className="p-6"><Logo /><p className="mt-7 eyebrow text-white/40">Business portal</p></div><nav className="mt-4 flex-1 px-3">{nav.map(([href, label, Icon]) => <Link key={href} href={href} className={`mb-1 flex items-center gap-3 px-4 py-3 text-sm font-semibold ${location === href ? 'bg-white/12 text-[hsl(var(--accent))]' : 'text-white/60 hover:bg-white/8 hover:text-white'}`}><Icon className="h-4 w-4" />{label}</Link>)}</nav><div className="border-t border-white/10 p-5 text-xs text-white/45"><p>Structure Hub Private Limited</p><p className="mt-1">Gweru · Zimbabwe</p></div></aside><div className="md:pl-64"><div className="flex h-20 items-center justify-between border-b border-[#dbe5df] bg-white px-5 md:px-10"><div><p className="eyebrow text-[hsl(var(--primary))]">Structure Hub / Portal</p><p className="mt-1 text-sm font-semibold">{nav.find(([href]) => href === location)?.[1] ?? 'Overview'}</p></div><div className="flex items-center gap-4"><button type="button" className="grid h-9 w-9 place-items-center border border-[#dbe5df] text-[hsl(var(--muted-foreground))]" aria-label="Notifications"><Bell className="h-4 w-4" /></button><Link href="/" className="hidden items-center gap-2 text-xs font-bold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--secondary))] sm:flex">View website <ExternalLink className="h-3.5 w-3.5" /></Link><span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--accent))] text-xs font-bold text-[hsl(var(--secondary))]">MN</span></div></div><div className="border-b border-[#dbe5df] bg-white px-5 py-3 md:hidden"><div className="flex gap-2 overflow-x-auto">{nav.map(([href, label]) => <Link key={href} href={href} className={`whitespace-nowrap px-3 py-2 text-xs font-bold ${location === href ? 'bg-[hsl(var(--secondary))] text-white' : 'bg-[#eef3ef] text-[hsl(var(--muted-foreground))]'}`}>{label}</Link>)}</div></div><main className="p-5 md:p-10">{children}</main></div></div>;
}

function AdminHeader({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow text-[hsl(var(--primary))]">{eyebrow}</p><h1 className="display mt-2 text-4xl font-semibold leading-none text-[hsl(var(--secondary))] md:text-5xl">{title}</h1></div>{action}</div>;
}

function StatCard({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Activity }) {
  return <div className="border border-[#dbe5df] bg-white p-5"><div className="flex items-start justify-between"><p className="eyebrow text-[hsl(var(--muted-foreground))]">{label}</p><Icon className="h-4 w-4 text-[hsl(var(--primary))]" /></div><p className="display mt-5 text-4xl font-semibold">{value}</p><p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">{note}</p></div>;
}

function AdminDashboardPage() {
  const leads = readLeads();
  const open = leads.filter((lead) => !['Won', 'Lost'].includes(lead.status)).length;
  return <AdminLayout><AdminHeader eyebrow="Command centre" title="Good morning, Mastermind." action={<Link href="/admin/leads" className="inline-flex items-center bg-[hsl(var(--secondary))] px-4 py-3 text-sm font-bold text-white">Review quote requests <ArrowRight className="ml-4 h-4 w-4 text-[hsl(var(--accent))]" /></Link>} /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Open enquiries" value={String(open)} note="Across all active stages" icon={ClipboardList} /><StatCard label="Active projects" value="4" note="2 currently on site" icon={Building2} /><StatCard label="Equipment items" value={String(equipment.length)} note="2 currently available" icon={Truck} /><StatCard label="Conversion signal" value="68%" note="Requests contacted this month" icon={BarChart3} /></div><div className="mt-8 grid gap-5 xl:grid-cols-[1.2fr_.8fr]"><section className="border border-[#dbe5df] bg-white"><div className="flex items-center justify-between border-b border-[#dbe5df] px-5 py-4"><div><p className="eyebrow text-[hsl(var(--primary))]">Lead pipeline</p><h2 className="mt-1 text-lg font-bold">Where enquiries are sitting</h2></div><Link href="/admin/leads" className="text-xs font-bold text-[hsl(var(--primary))]">View all</Link></div><div className="grid gap-4 p-5 sm:grid-cols-3">{leadStatuses.slice(0, 3).map((status) => { const count = leads.filter((lead) => lead.status === status).length; return <div key={status} className="border border-[#dbe5df] p-4"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">{status}</span><span className="display text-2xl font-semibold">{count}</span></div><div className="mt-4 h-1 bg-[#edf2ee]"><div className="h-1 bg-[hsl(var(--primary))]" style={{ width: `${Math.max(count * 22, 8)}%` }} /></div></div>; })}</div><div className="border-t border-[#dbe5df] px-5 py-4"><div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]"><Activity className="h-4 w-4 text-[hsl(var(--primary))]" /> Pipeline is updated from requests submitted on the public website.</div></div></section><section className="border border-[#dbe5df] bg-white"><div className="border-b border-[#dbe5df] px-5 py-4"><p className="eyebrow text-[hsl(var(--primary))]">Recent activity</p><h2 className="mt-1 text-lg font-bold">Latest requests</h2></div><div className="divide-y divide-[#dbe5df]">{leads.slice(0, 4).map((lead) => <div key={lead.id} className="flex items-start justify-between gap-4 px-5 py-4"><div><p className="text-sm font-bold">{lead.name}</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{lead.service} · {lead.location}</p></div><span className="whitespace-nowrap text-[.65rem] font-bold uppercase tracking-[.1em] text-[hsl(var(--primary))]">{lead.status}</span></div>)}</div></section></div><section className="mt-5 grid gap-5 md:grid-cols-3"><Link href="/admin/projects" className="border border-[#dbe5df] bg-[hsl(var(--secondary))] p-6 text-white hover:-translate-y-1"><Building2 className="h-5 w-5 text-[hsl(var(--accent))]" /><h2 className="mt-8 text-lg font-bold">Update project portfolio</h2><p className="mt-2 text-sm text-white/60">Add project status, locations and scope to the public archive.</p></Link><Link href="/admin/equipment" className="border border-[#dbe5df] bg-white p-6 hover:-translate-y-1"><Truck className="h-5 w-5 text-[hsl(var(--primary))]" /><h2 className="mt-8 text-lg font-bold">Manage availability</h2><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Keep equipment enquiries aligned with current capacity.</p></Link><Link href="/admin/content" className="border border-[#dbe5df] bg-white p-6 hover:-translate-y-1"><FileText className="h-5 w-5 text-[hsl(var(--primary))]" /><h2 className="mt-8 text-lg font-bold">Keep the site current</h2><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Control featured work, contact details and homepage content.</p></Link></section></AdminLayout>;
}

function StatusPill({ status }: { status: LeadStatus }) {
  return <span className={`inline-flex items-center px-2 py-1 text-[.62rem] font-bold uppercase tracking-[.1em] ${status === 'New' ? 'bg-[#fff2cc] text-[#84620b]' : status === 'Won' ? 'bg-[#dff3e7] text-[#18733e]' : status === 'Lost' ? 'bg-[#fbe2df] text-[#a44236]' : 'bg-[#e4efee] text-[#216c68]'}`}>{status}</span>;
}

function AdminLeadsPage() {
  const [leads, setLeads] = useState(readLeads());
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const filtered = useMemo(() => leads.filter((lead) => `${lead.name} ${lead.organisation} ${lead.service}`.toLowerCase().includes(search.toLowerCase()) && (status === 'All' || lead.status === status)), [leads, search, status]);
  function updateStatus(id: string, next: LeadStatus) { const updated = leads.map((lead) => lead.id === id ? { ...lead, status: next } : lead); setLeads(updated); window.localStorage.setItem('structure-hub-leads-v1', JSON.stringify(updated)); }
  return <AdminLayout><AdminHeader eyebrow="Lead management" title="Quote requests" action={<div className="flex items-center gap-2 border border-[#dbe5df] bg-white px-4 py-3 text-xs font-semibold text-[hsl(var(--muted-foreground))]"><CalendarDays className="h-4 w-4 text-[hsl(var(--primary))]" /> September 2026</div>} /><div className="mb-5 flex flex-col gap-3 sm:flex-row"><label className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, company or service" className="field-light pl-10" /></label><select value={status} onChange={(event) => setStatus(event.target.value)} className="field-light sm:w-48"><option>All</option>{leadStatuses.map((item) => <option key={item}>{item}</option>)}</select></div><div className="overflow-hidden border border-[#dbe5df] bg-white"><div className="hidden grid-cols-[.8fr_1.2fr_1fr_1fr_1fr] gap-4 border-b border-[#dbe5df] bg-[#f7faf7] px-5 py-3 text-[.65rem] font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))] md:grid"><span>Request</span><span>Organisation</span><span>Service</span><span>Received</span><span>Stage</span></div>{filtered.map((lead) => <div key={lead.id} className="grid gap-3 border-b border-[#dbe5df] px-5 py-5 last:border-0 md:grid-cols-[.8fr_1.2fr_1fr_1fr_1fr] md:items-center md:gap-4"><div><div className="flex items-center gap-2"><p className="text-sm font-bold">{lead.name}</p>{lead.priority === 'High' && <span className="text-[.58rem] font-bold uppercase tracking-[.1em] text-[#b36c1d]">Priority</span>}</div><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{lead.id} · {lead.location}</p></div><p className="text-sm">{lead.organisation}</p><p className="text-sm text-[hsl(var(--muted-foreground))]">{lead.service}</p><div><p className="text-sm">{lead.createdAt}</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{lead.contact}</p></div><select value={lead.status} onChange={(event) => updateStatus(lead.id, event.target.value as LeadStatus)} className="w-full border border-[#dbe5df] bg-white px-2 py-2 text-xs font-bold"><option>{lead.status}</option>{leadStatuses.filter((item) => item !== lead.status).map((item) => <option key={item}>{item}</option>)}</select><div className="md:col-span-5 border-t border-[#edf2ee] pt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]"><span className="font-bold text-[hsl(var(--secondary))]">Brief: </span>{lead.brief}</div></div>)}{filtered.length === 0 && <div className="p-12 text-center text-sm text-[hsl(var(--muted-foreground))]">No quote requests match this view.</div>}</div></AdminLayout>;
}

function AdminProjectsPage() {
  const [items, setItems] = useState(projects);
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState('');
  function addProject(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const name = String(form.get('name') ?? '').trim(); if (!name) return; setItems([{ ...projects[0], slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, kind: String(form.get('kind') ?? 'New project'), filter: 'Construction', status: 'In progress', year: '2026', summary: 'Project added from the Structure Hub business portal.', scope: ['Project planning', 'Site coordination'] }, ...items]); setAdding(false); setNotice('Project added to the working portfolio.'); event.currentTarget.reset(); }
  return <AdminLayout><AdminHeader eyebrow="Portfolio management" title="Projects" action={<button type="button" onClick={() => setAdding((value) => !value)} className="inline-flex items-center bg-[hsl(var(--secondary))] px-4 py-3 text-sm font-bold text-white"><Plus className="mr-2 h-4 w-4 text-[hsl(var(--accent))]" />Add project</button>} />{notice && <div className="mb-5 border border-[hsl(var(--primary))]/30 bg-[#e3f1e9] px-4 py-3 text-sm font-semibold text-[#216c68]">{notice}</div>}{adding && <form onSubmit={addProject} className="mb-6 grid gap-4 border border-[hsl(var(--primary))]/30 bg-white p-5 md:grid-cols-[1fr_1fr_auto] md:items-end"><label className="text-xs font-bold">Project name<input name="name" required className="field-light mt-2" placeholder="e.g. New school block" /></label><label className="text-xs font-bold">Project type<input name="kind" className="field-light mt-2" placeholder="e.g. Commercial construction" /></label><button type="submit" className="bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-white">Save project</button></form>}<div className="overflow-hidden border border-[#dbe5df] bg-white"><div className="grid grid-cols-[1.4fr_1fr_.7fr_.6fr_auto] gap-4 border-b border-[#dbe5df] bg-[#f7faf7] px-5 py-3 text-[.65rem] font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]"><span>Project</span><span>Location</span><span>Status</span><span>Year</span><span /></div>{items.map((project) => <div key={project.slug} className="grid grid-cols-[1.4fr_1fr_.7fr_.6fr_auto] gap-4 border-b border-[#dbe5df] px-5 py-5 last:border-0"><div className="flex items-center gap-3"><img src={project.image} alt="" className="h-12 w-16 object-cover" /><div><p className="text-sm font-bold">{project.name}</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{project.kind}</p></div></div><p className="text-sm text-[hsl(var(--muted-foreground))]">{project.location}</p><StatusPill status={project.status === 'Completed' ? 'Won' : 'Site visit'} /><p className="text-sm">{project.year}</p><button type="button" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]" aria-label={`Edit ${project.name}`}><Pencil className="h-4 w-4" /></button></div>)}</div></AdminLayout>;
}

function AdminEquipmentPage() {
  const [items, setItems] = useState(equipment);
  const states: Equipment['availability'][] = ['Available', 'On hire', 'Maintenance'];
  function cycle(id: number) { setItems(items.map((item) => { if (item.id !== id) return item; const next = states[(states.indexOf(item.availability) + 1) % states.length]; return { ...item, availability: next }; })); }
  return <AdminLayout><AdminHeader eyebrow="Capacity management" title="Equipment" action={<Link href="/contact#quote" className="inline-flex items-center border border-[#dbe5df] bg-white px-4 py-3 text-sm font-bold">View public enquiry form <ExternalLink className="ml-3 h-4 w-4 text-[hsl(var(--primary))]" /></Link>} /><div className="grid gap-5 lg:grid-cols-3">{items.map((item) => <article key={item.id} className="overflow-hidden border border-[#dbe5df] bg-white"><div className="relative h-44"><img src={item.image} alt="" className="h-full w-full object-cover" /><span className="absolute right-4 top-4 bg-white px-2 py-1 text-[.6rem] font-bold uppercase tracking-[.1em]">{item.availability}</span></div><div className="p-5"><p className="eyebrow text-[hsl(var(--primary))]">{item.category}</p><h2 className="mt-2 text-lg font-bold">{item.name}</h2><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{item.specs}</p><div className="mt-5 flex items-center justify-between border-t border-[#edf2ee] pt-4"><span className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">{item.rate}</span><button type="button" onClick={() => cycle(item.id)} className="text-xs font-bold text-[hsl(var(--primary))]">Change status <ChevronDown className="ml-1 inline h-3.5 w-3.5" /></button></div></div></article>)}</div><div className="mt-8 border border-dashed border-[#b8cbc1] bg-[#f7faf7] p-6"><div className="flex items-start gap-3"><Upload className="mt-0.5 h-5 w-5 text-[hsl(var(--primary))]" /><div><h2 className="font-bold">Add more equipment</h2><p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">The portal is ready for a full equipment catalogue with specifications, photos, hire types and availability.</p></div></div></div></AdminLayout>;
}

function AdminContentPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({ featured: true, references: true, equipment: true, homepage: true });
  function save(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSaved(true); window.setTimeout(() => setSaved(false), 2500); }
  return <AdminLayout><AdminHeader eyebrow="Content management" title="Website content" action={saved ? <span className="flex items-center gap-2 text-sm font-bold text-[#217548]"><Check className="h-4 w-4" />Changes saved</span> : undefined} /><form onSubmit={save} className="grid gap-5 xl:grid-cols-[1fr_.7fr]"><section className="border border-[#dbe5df] bg-white"><div className="border-b border-[#dbe5df] px-5 py-4"><p className="eyebrow text-[hsl(var(--primary))]">Publishing controls</p><h2 className="mt-1 text-lg font-bold">What visitors can see</h2></div><div className="divide-y divide-[#dbe5df]">{[['featured', 'Featured project archive', 'Show selected completed work on the public projects page.'], ['references', 'Trade references', 'Display the current reference list on the company story page.'], ['equipment', 'Equipment hire catalogue', 'Keep equipment and availability visible in the main navigation.'], ['homepage', 'Homepage lead form', 'Keep the quote capture form available on the home page.']].map(([key, label, description]) => <label key={key} className="flex items-start justify-between gap-6 px-5 py-5"><span><span className="block text-sm font-bold">{label}</span><span className="mt-1 block max-w-lg text-sm leading-6 text-[hsl(var(--muted-foreground))]">{description}</span></span><input type="checkbox" checked={settings[key as keyof typeof settings]} onChange={(event) => setSettings({ ...settings, [key]: event.target.checked })} className="mt-1 h-5 w-5 accent-[hsl(var(--primary))]" /></label>)}</div></section><aside className="h-fit border border-[#dbe5df] bg-white p-5"><p className="eyebrow text-[hsl(var(--primary))]">Contact details</p><div className="mt-5 grid gap-4"><label className="text-xs font-bold">Primary email<input defaultValue="structurehub50@gmail.com" className="field-light mt-2" /></label><label className="text-xs font-bold">Primary phone<input defaultValue="0715 686 906" className="field-light mt-2" /></label><label className="text-xs font-bold">Office address<textarea defaultValue={'12 Bedford Road\nLight Industrial Sites\nGweru, Zimbabwe'} rows={3} className="field-light mt-2 resize-none" /></label></div><button type="submit" className="mt-6 w-full bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-white">Save content settings</button></aside></form></AdminLayout>;
}

function App() {
  return <Switch><Route path="/" component={HomePage} /><Route path="/services" component={ServicesPage} /><Route path="/projects" component={ProjectsPage} /><Route path="/projects/:slug" component={ProjectDetailPage} /><Route path="/about" component={AboutPage} /><Route path="/equipment" component={EquipmentPage} /><Route path="/hardware" component={HardwarePage} /><Route path="/contact" component={ContactPage} /><Route path="/admin" component={AdminDashboardPage} /><Route path="/admin/leads" component={AdminLeadsPage} /><Route path="/admin/projects" component={AdminProjectsPage} /><Route path="/admin/equipment" component={AdminEquipmentPage} /><Route path="/admin/content" component={AdminContentPage} /></Switch>;
}

export default App;