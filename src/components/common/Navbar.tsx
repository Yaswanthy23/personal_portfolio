'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigationItems } from '@/data/navigation';
import { profileData } from '@/data/profile';
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

      const sections = ['hero', 'about', 'experience', 'projects', 'engineering', 'troubleshooting', 'skills', 'contact'];
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
        const offset = 80;
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
          ? 'bg-[#070B14]/85 backdrop-blur-md border-b border-[#1E293B] py-3.5 shadow-md'
          : 'bg-transparent border-b border-transparent py-5'
      )}
    >
      <Container size="lg">
        <div className="flex items-center justify-between">
          {/* Logo / Simple Name */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group font-bold tracking-tight text-lg sm:text-xl text-[#F8FAFC] hover:text-[#FF9900] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] rounded"
            aria-label="Yaswanth - Home"
          >
            <span>{profileData.name.toUpperCase()}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {navigationItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'text-sm font-medium transition-colors duration-150 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] rounded',
                    isActive
                      ? 'text-[#FF9900]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF9900] rounded-full" />
                  )}
                </a>
              );
            })}

            {/* Resume Action */}
            <div className="pl-4 border-l border-[#1E293B]">
              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#070B14] bg-[#FF9900] hover:bg-[#E08700] rounded-lg transition-colors shadow-sm"
              >
                <span>Resume</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#070B14] bg-[#FF9900] rounded-md"
            >
              <span>Resume</span>
            </a>
            <button
              type="button"
              className="p-2 rounded-lg bg-[#101827] border border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#2A3B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]"
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
        <div className="lg:hidden bg-[#070B14]/98 backdrop-blur-xl border-b border-[#1E293B] px-4 pt-3 pb-6 mt-3 shadow-2xl animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {navigationItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-[#FF9900] bg-[#101827] border border-[#1E293B]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#101827]'
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#FF9900]" />}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
