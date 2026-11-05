import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { isShown, type CaseStudy, type Policy, type Service } from './content';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Nav, type Page } from './site/Nav';
import { Hero } from './site/Hero';
import { Intro } from './site/Intro';
import { Tasks } from './site/Tasks';
import { Services } from './site/Services';
import { Process } from './site/Process';
import { Work } from './site/Work';
import { Industries } from './site/Industries';
import { About } from './site/About';
import { Faq } from './site/Faq';
import { Contact } from './site/Contact';
import { Footer } from './site/Footer';
import { Tools } from './site/Tools';
import { DevHub } from './site/DevHub';
import { CaseStudyDialog, ConsultationDialog, PolicyDialog, ServiceDialog } from './site/dialogs';
import { useReveal } from './site/hooks';

// The admin is only downloaded by people who open #admin.
const Admin = lazy(() => import('./admin/Admin'));

type Route = Page | 'admin';
const routeFromHash = (): Route =>
  window.location.hash === '#development-hub' ? 'devhub' : window.location.hash === '#admin' ? 'admin' : 'home';

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};

function Site() {
  const { theme } = useTheme();
  const [route, setRoute] = useState<Route>(routeFromHash);
  const [booking, setBooking] = useState<{ open: boolean; service?: string }>({ open: false });
  const [service, setService] = useState<Service | null>(null);
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [policy, setPolicy] = useState<{ open: boolean; id: Policy['id'] }>({ open: false, id: 'privacy' });
  const [prefill, setPrefill] = useState<{ service?: string; message?: string; n: number }>({ n: 0 });

  useEffect(() => {
    const onHash = () => {
      const next = routeFromHash();
      setRoute((cur) => { if (next !== cur && next === 'devhub') window.scrollTo(0, 0); return next; });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#080b22' : '#ffffff');
  }, [theme]);

  useReveal([route]);

  const navigate = useCallback((page: Page, targetId?: string) => {
    setRoute(page);
    if (page === 'devhub') {
      window.history.pushState(null, '', '#development-hub');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState(null, '', targetId ? `#${targetId}` : '#home');
    if (targetId) setTimeout(() => scrollToId(targetId), 40);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toContact = (service?: string, message?: string) => {
    setService(null);
    setStudy(null);
    setPrefill((p) => ({ service, message, n: p.n + 1 }));
    navigate('home', 'contact');
  };
  const book = (s?: string) => setBooking({ open: true, service: s });

  if (route === 'admin') {
    return (
      <Suspense fallback={<p className="wrap section lead">Loading the admin…</p>}>
        <Admin onExit={() => { window.history.pushState(null, '', '#home'); setRoute('home'); }} />
      </Suspense>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav page={route} onNavigate={navigate} onBook={() => book()} />
      <main id="main" tabIndex={-1}>
        {route === 'devhub' ? (
          <DevHub onHome={() => navigate('home')} />
        ) : (
          <>
            <Hero onBook={() => book()} onShowTasks={() => scrollToId('tasks')} />
            {isShown('services') && <Services onOpen={setService} onBook={() => book()} />}
            {isShown('intro') && <Intro />}
            {isShown('tools') && <Tools onBook={() => toContact()} />}
            {isShown('tasks') && <Tasks onAsk={(task) => toContact(undefined, `We would like to automate: ${task.toLowerCase()}.`)} />}
            {isShown('process') && <Process />}
            {isShown('work') && <Work onOpen={setStudy} />}
            {isShown('industries') && <Industries onBook={() => book()} />}
            {isShown('about') && <About onBook={() => book()} />}
            {isShown('faq') && <Faq onBook={() => book()} />}
            {isShown('contact') && <Contact key={prefill.n} prefillService={prefill.service} prefillMessage={prefill.message} />}
          </>
        )}
      </main>
      <Footer onNavigate={navigate} onPolicy={(id) => setPolicy({ open: true, id })} onBook={() => book()} />

      <ConsultationDialog open={booking.open} service={booking.service} onClose={() => setBooking({ open: false })} />
      <ServiceDialog service={service} onClose={() => setService(null)} onAsk={(title) => toContact(title)} />
      <CaseStudyDialog study={study} onClose={() => setStudy(null)}
        onSimilar={(title) => toContact(undefined, `We are interested in a solution similar to your case study: "${title}".`)} />
      <PolicyDialog open={policy.open} initial={policy.id} onClose={() => setPolicy((p) => ({ ...p, open: false }))} onContact={() => toContact()} />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Site />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
