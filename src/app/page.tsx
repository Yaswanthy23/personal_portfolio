import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Engineering } from '@/components/sections/Engineering';
import { Troubleshooting } from '@/components/sections/Troubleshooting';
import { Technologies } from '@/components/sections/Technologies';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070B14] text-[#F8FAFC]">
      {/* Sticky Minimal Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* 01 — Hero */}
        <Hero />

        {/* 02 — About */}
        <About />

        {/* 03 — Experience */}
        <Experience />

        {/* 04 — Projects */}
        <Projects />

        {/* 05 — Engineering & Interactive Architecture */}
        <Engineering />

        {/* 06 — Troubleshooting */}
        <Troubleshooting />

        {/* 07 — Technologies */}
        <Technologies />

        {/* 08 — Resume & Contact */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Utility Scroll To Top */}
      <ScrollToTop />
    </div>
  );
}
