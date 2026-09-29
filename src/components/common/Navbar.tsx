'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
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
      // Toggle translucency
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
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
          ? 'bg-[#0B1120]/85 backdrop-blur-md border-b border-[#263449]/80 py-3.5 shadow-lg'
          : 'bg-transparent border-b border-transparent py-5'
      )}
    >
      <Container size="lg">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] rounded-md px-1 py-0.5"
            aria-label="Yaswanth - Home"
          >
            <div className="relative flex items-center justify-center h-8 w-8 rounded-md bg-[#172033] border border-[#263449] group-hover:border-[#FF9900] transition-colors">
              <Terminal className="h-4 w-4 text-[#FF9900]" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#FF9900] ring-2 ring-[#0B1120]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-base font-bold tracking-wider text-[#F8FAFC] group-hover:text-[#FF9900] transition-colors">
                  {profileData.name.toUpperCase()}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF9900] inline-block" />
              </div>
              <span className="text-[10px] font-mono text-[#94A3B8] tracking-tight -mt-0.5 hidden sm:inline">
                AWS DEVOPS ENGINEER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Items */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navigationItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'relative px-3.5 py-1.5 font-mono text-xs font-medium tracking-wider transition-all duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]',
                    isActive
                      ? 'text-[#FF9900] bg-[#172033]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#172033]/60'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#FF9900] rounded-full" />
                  )}
                </a>
              );
            })}

            <div className="ml-3 pl-3 border-l border-[#263449]">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-semibold text-[#0B1120] bg-[#FF9900] hover:bg-[#E08700] rounded transition-all shadow-sm"
              >
                <span>CONNECT</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center p-2 rounded-md bg-[#172033] border border-[#263449] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#374863] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1120]/95 backdrop-blur-xl border-b border-[#263449] px-4 pt-3 pb-6 mt-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl">
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
                    'flex items-center justify-between px-3.5 py-2.5 rounded-lg font-mono text-xs font-medium tracking-wider transition-colors',
                    isActive
                      ? 'text-[#FF9900] bg-[#172033] border border-[#FF9900]/30'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#172033]/60'
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[#FF9900]" />}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#263449]">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-xs font-bold text-[#0B1120] bg-[#FF9900] hover:bg-[#E08700] transition-colors"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
