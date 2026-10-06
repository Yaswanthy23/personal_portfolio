'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
          ? 'bg-[#060907]/90 backdrop-blur-md border-b border-[#19241C] py-3.5 shadow-xl'
          : 'bg-transparent border-b border-transparent py-5'
      )}
    >
      <Container size="lg">
        <div className="flex items-center justify-between">
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
                    'text-xs font-mono tracking-widest font-semibold transition-colors duration-150 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] rounded uppercase',
                    isActive
                      ? 'text-[#CCFF00]'
                      : 'text-[#94A899] hover:text-[#F4F9F5]'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#CCFF00] shadow-[0_0_8px_#CCFF00] rounded-full" />
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
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-bold tracking-wider uppercase text-[#CCFF00] bg-[#0E1410] border border-[#243529] hover:bg-[#CCFF00] hover:text-[#060907] hover:border-[#CCFF00] hover:shadow-[0_0_15px_rgba(204,255,0,0.3)] rounded-md transition-all duration-200"
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
              className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-mono font-bold uppercase text-[#CCFF00] bg-[#0E1410] border border-[#243529] rounded-md sm:hidden"
            >
              <span>TALK</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <button
              type="button"
              className="p-2 rounded-lg bg-[#0E1410] border border-[#19241C] text-[#94A899] hover:text-[#CCFF00] hover:border-[#243529] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
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
        <div className="lg:hidden bg-[#060907]/98 backdrop-blur-2xl border-b border-[#19241C] px-4 pt-3 pb-6 mt-3 shadow-2xl animate-in fade-in duration-200">
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
                      ? 'text-[#CCFF00] bg-[#0E1410] border border-[#243529]'
                      : 'text-[#94A899] hover:text-[#F4F9F5] hover:bg-[#0E1410]'
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00] shadow-[0_0_6px_#CCFF00]" />}
                </a>
              );
            })}

            <div className="pt-3 border-t border-[#19241C]">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-mono font-bold uppercase text-[#060907] bg-[#CCFF00] rounded-lg shadow-md"
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
