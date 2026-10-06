import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Technologies } from '@/components/sections/Technologies';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/common/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#060907] text-[#F4F9F5]">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* 01 — Hero */}
        <Hero />

        {/* 02 — About (with 3D Tag Cloud) */}
        <About />

        {/* 03 — Experience (with Hanging ID Card) */}
        <Experience />

        {/* 04 — Projects */}
        <Projects />

        {/* 05 — Technologies */}
        <Technologies />

        {/* 06 — Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Utility Scroll To Top */}
      <ScrollToTop />
    </div>
  );
}
