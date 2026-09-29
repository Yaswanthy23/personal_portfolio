import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Hero } from '@/components/sections/Hero';
import { TechStack } from '@/components/sections/TechStack';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ContactCTA } from '@/components/sections/ContactCTA';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B1120] text-[#F8FAFC]">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Tech Stack Categories */}
        <TechStack />

        {/* About Preview */}
        <AboutPreview />

        {/* Featured Work Preview */}
        <FeaturedProjects />

        {/* Contact CTA */}
        <ContactCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Utility Scroll To Top */}
      <ScrollToTop />
    </div>
  );
}
