'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigationItems } from '@/data/navigation';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['hero', 'about', 'experience', 'projects', 'technologies', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 75;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#FAF5F0]/95 backdrop-blur-md border-b border-[#E8D8CC] py-3 shadow-md shadow-black/5'
          : 'bg-transparent py-4'
      )}
    >
      <Container size="lg">
        <div className="flex items-center justify-between px-5 py-2.5 rounded-full bg-[#FAF5F0]/90 backdrop-blur-md border border-[#E8D8CC] shadow-md shadow-[#2A211B]/5">
          {/* Brand Logo / Badge inspired by reference */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#B4532A] text-[#FFFFFF] font-black text-xs font-mono shadow-[0_0_10px_rgba(180,83,42,0.35)]">
              Y
            </span>
            <span className="font-extrabold text-sm tracking-tight text-[#2A211B] group-hover:text-[#B4532A] transition-colors">
              Yaswanth<span className="text-[#B4532A]">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navigationItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'text-xs font-mono tracking-widest font-semibold transition-colors duration-150 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4532A] rounded uppercase',
                    isActive
                      ? 'text-[#B4532A]'
                      : 'text-[#7A6D65] hover:text-[#2A211B]'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#B4532A] shadow-[0_0_8px_#B4532A] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button (LET'S TALK ↗) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-mono font-bold tracking-wider uppercase text-[#FFFFFF] bg-[#B4532A] hover:bg-[#9C431D] hover:shadow-[0_4px_16px_rgba(180,83,42,0.35)] rounded-full transition-all duration-200"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-mono font-bold uppercase text-[#FFFFFF] bg-[#B4532A] rounded-full sm:hidden"
            >
              <span>TALK</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <button
              type="button"
              className="p-2 rounded-lg bg-[#F5EBE1] border border-[#E8D8CC] text-[#7A6D65] hover:text-[#B4532A] hover:border-[#B4532A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4532A]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF5F0]/98 backdrop-blur-2xl border-b border-[#E8D8CC] px-4 pt-3 pb-6 mt-3 shadow-2xl animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {navigationItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider font-semibold transition-colors uppercase',
                    isActive
                      ? 'text-[#B4532A] bg-[#F5EBE1]'
                      : 'text-[#7A6D65] hover:text-[#2A211B] hover:bg-[#F5EBE1]'
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#B4532A] shadow-[0_0_6px_#B4532A]" />}
                </a>
              );
            })}

            <div className="pt-3 border-t border-[#E8D8CC]">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-mono font-bold uppercase text-[#FFFFFF] bg-[#B4532A] rounded-full shadow-md"
              >
                <span>LET&apos;S TALK</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
