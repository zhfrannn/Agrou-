import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import ValuePropStrip from './components/ValuePropStrip';
import heroBg from '../assets/backgorund-hero.jpg';
import ModuleIntro from './components/ModuleIntro';
import PromoBanner from './components/PromoBanner';
import BestSellers from './components/BestSellers';
import EkosistemBridge from './components/EkosistemBridge';
import KoperasiTerpercaya from './components/KoperasiTerpercaya';
import HomeBottom from './components/HomeBottom';
import Footer from './components/Footer';
import ShieldPage from './components/ShieldPage';
import BrandPage from './components/BrandPage';
import DashboardPage from './components/DashboardPage';
import KoperasiPage from './components/KoperasiPage';
import KoperasiProfilePage from './components/KoperasiProfilePage';
import AboutPage from './components/AboutPage';
import KatalogPage from './components/KatalogPage';
import LadangAIPage from './components/LadangAIPage';
import KomunitasPage from './components/KomunitasPage';

export default function App() {
  const [view, setView] = useState<'app' | 'shield' | 'brand' | 'dashboard' | 'koperasi' | 'profile' | 'about' | 'katalog' | 'ladangai' | 'komunitas'>('app');
  const [katalogCategory, setKatalogCategory] = useState('Semua Produk');

  const handleViewChange = (newView: any) => {
    setView(newView);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const goToKatalog = (category = 'Semua Produk') => {
    setKatalogCategory(category);
    handleViewChange('katalog');
  };

  useEffect(() => {
    // Scroll immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Scroll after a short delay to guarantee layout calculations have completed
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

    return () => clearTimeout(timer);
  }, [view]);

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen text-gray-800 font-sans overflow-x-hidden selection:bg-[#F77F00] selection:text-white">
        <DashboardPage />
        <button 
          onClick={() => handleViewChange('app')}
          className="fixed bottom-6 right-6 z-50 bg-[#3E2723] text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-transform"
        >
          Keluar Dashboard
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen text-gray-800 font-sans overflow-x-hidden selection:bg-[#F77F00] selection:text-white">
      <Header onViewChange={handleViewChange} currentView={view} onGoToKatalog={goToKatalog} />
      <main className={(view === 'ladangai' || view === 'komunitas') ? "" : "pb-[72px] md:pb-0"}>
        {view === 'shield' ? (
          <ShieldPage onGoToKatalog={goToKatalog} />
        ) : view === 'brand' ? (
          <BrandPage />
        ) : view === 'koperasi' ? (
          <KoperasiPage onViewChange={handleViewChange} />
        ) : view === 'profile' ? (
          <KoperasiProfilePage />
        ) : view === 'katalog' ? (
          <KatalogPage initialCategory={katalogCategory} />
        ) : view === 'about' ? (
          <AboutPage />
        ) : view === 'ladangai' ? (
          <LadangAIPage />
        ) : view === 'komunitas' ? (
          <KomunitasPage />
        ) : (
          <>
            <div 
              className="w-full relative z-10 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroBg})` }}
            >
              {/* Light Cream Overlay (85% Opacity) */}
              <div className="absolute inset-0 bg-[#FFFDF7]/85 z-0" />
              
              <div className="relative z-10">
                <Hero />
                <MarqueeStrip />
                <ValuePropStrip />
              </div>
            </div>
            <ModuleIntro />
            <PromoBanner />
            <BestSellers />
            <EkosistemBridge />
            <KoperasiTerpercaya />
            <HomeBottom />
          </>
        )}
      </main>
      {view !== 'ladangai' && view !== 'komunitas' && <Footer />}
    </div>
  );
}

