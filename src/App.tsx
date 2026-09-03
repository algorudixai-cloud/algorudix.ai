import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { Technologies } from './components/Technologies';
import { Industries } from './components/Industries';
import { Portfolio } from './components/Portfolio';
import { Blog } from './components/Blog';
import { RoiEstimator } from './components/RoiEstimator';
import { CTA } from './components/CTA';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServiceItem, CaseStudyItem } from './types';
import { COMPANY_CONFIG } from './data/companyData';
import { Sparkles, Edit3 } from 'lucide-react';

export default function App() {
  const [companyName, setCompanyName] = useState<string>(COMPANY_CONFIG.defaultName);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  // Page Routing state: 'home' vs 'blog'
  const [activePage, setActivePage] = useState<'home' | 'blog'>(() => {
    return window.location.hash === '#blog' ? 'blog' : 'home';
  });

  // Modals state
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationPreselect, setConsultationPreselect] = useState<string>('Custom AI Development');

  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyItem | null>(null);

  // Pre-filled form state
  const [formPrefillService, setFormPrefillService] = useState<string>('Custom AI Development');
  const [formPrefillDesc, setFormPrefillDesc] = useState<string>('');

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#blog') {
        setActivePage('blog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'blog', targetId?: string) => {
    setActivePage(page);
    if (page === 'blog') {
      window.location.hash = '#blog';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = targetId ? `#${targetId}` : '#home';
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) setConsultationPreselect(serviceName);
    setIsConsultationOpen(true);
  };

  const handleGetStarted = () => {
    if (activePage !== 'home') {
      handleNavigate('home', 'contact');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBookService = (serviceName: string) => {
    setFormPrefillService(serviceName);
    if (activePage !== 'home') {
      handleNavigate('home', 'contact');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleApplyRoiEstimate = (scope: { service: string; hoursSaved: number; costSavings: number }) => {
    setFormPrefillService(scope.service);
    setFormPrefillDesc(
      `Inquiry generated from ROI Estimator: We are interested in ${scope.service} to save ~${scope.hoursSaved.toLocaleString()} hours/month and achieve estimated ~$${scope.costSavings.toLocaleString()}/yr in operational efficiencies.`
    );
    if (activePage !== 'home') {
      handleNavigate('home', 'contact');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleStartSimilarProject = (projectTitle: string) => {
    setFormPrefillService('AI & Custom Software Development');
    setFormPrefillDesc(`We are interested in building a solution similar to your case study: "${projectTitle}".`);
    if (activePage !== 'home') {
      handleNavigate('home', 'contact');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Optional Company Name Customizer Bar */}
      <div className="bg-slate-950/90 border-b border-slate-800/80 py-1.5 px-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <span>Company Brand:</span>
        {isEditingName ? (
          <div className="inline-flex items-center gap-2">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-slate-900 border border-cyan-500/50 text-white px-2 py-0.5 rounded text-xs focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => setIsEditingName(false)}
              className="text-cyan-400 hover:text-cyan-300 font-semibold px-2 py-0.5 bg-cyan-950 rounded border border-cyan-500/30"
            >
              Save
            </button>
          </div>
        ) : (
          <span 
            onClick={() => setIsEditingName(true)}
            className="text-cyan-300 font-semibold hover:underline cursor-pointer flex items-center gap-1"
            title="Click to rename company"
          >
            {companyName} <Edit3 className="w-3 h-3 text-slate-500" />
          </span>
        )}
      </div>

      {/* Navigation Header */}
      <Navbar 
        companyName={companyName}
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenContact={handleGetStarted}
      />

      {/* Main View Area */}
      <main>
        {activePage === 'blog' ? (
          /* Separate Standalone Blog Page View */
          <Blog 
            onOpenConsultation={handleOpenConsultation}
            onBackToHome={() => handleNavigate('home', 'home')}
          />
        ) : (
          /* Homepage Single Page View */
          <>
            {/* 1. Hero Section */}
            <Hero 
              onOpenConsultation={() => handleOpenConsultation()}
              onGetStarted={handleGetStarted}
            />

            {/* 2. About Us Section */}
            <About 
              onOpenConsultation={() => handleOpenConsultation()}
            />

            {/* 3. Services Section */}
            <Services 
              onSelectService={(service) => setSelectedServiceDetail(service)}
              onBookService={handleBookService}
            />

            {/* 4. Why Choose Us Section */}
            <WhyChooseUs 
              onOpenConsultation={() => handleOpenConsultation()}
            />

            {/* 5. Our Process Section */}
            <Process 
              onOpenConsultation={() => handleOpenConsultation()}
            />

            {/* 6. Technologies We Use Section */}
            <Technologies />

            {/* 7. Industries We Serve Section */}
            <Industries 
              onOpenConsultation={handleOpenConsultation}
            />

            {/* 8. Portfolio / Case Studies Section */}
            <Portfolio 
              onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
            />

            {/* Interactive Scope & ROI Estimator */}
            <RoiEstimator 
              onApplyScopeToContact={handleApplyRoiEstimate}
            />

            {/* 9. Call to Action Section */}
            <CTA 
              onStartProject={handleGetStarted}
              onTalkToExpert={() => handleOpenConsultation('Executive Strategy Call')}
            />

            {/* 10. Contact Section */}
            <ContactForm 
              prefilledService={formPrefillService}
              prefilledDescription={formPrefillDesc}
            />
          </>
        )}
      </main>

      {/* Footer Section */}
      <Footer 
        companyName={companyName}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Interactive Modals */}
      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        preselectedService={consultationPreselect}
      />

      <ServiceDetailModal 
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onBookService={handleBookService}
      />

      <CaseStudyModal 
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onStartSimilarProject={handleStartSimilarProject}
      />

    </div>
  );
}
