'use client';

import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle2, ArrowRight, Send, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { LinkedInIcon } from '@/components/ui/Icons';
import { socialLinks } from '@/data/social';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Cloud Infrastructure / DevOps Project',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const linkedinLink = socialLinks.find((s) => s.id === 'linkedin')?.href || 'https://www.linkedin.com/in/yaswanth-gedela-84946b250/';
  const emailLink = socialLinks.find((s) => s.id === 'email')?.href || 'mailto:yaswanthgedela27@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailto fallback trigger
    const mailtoUrl = `mailto:yaswanthgedela27@gmail.com?subject=${encodeURIComponent(formState.subject + ' - from ' + formState.name)}&body=${encodeURIComponent(formState.message + '\n\nSender Email: ' + formState.email)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#0A0F0C] border-t border-[#19241C] relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] ambient-glow-lime rounded-full blur-3xl opacity-15 pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1410] border border-[#19241C] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-wider">
            <span>CONTACT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F4F9F5] tracking-tight">
            Let&apos;s build something scalable together.
          </h2>
          <p className="text-sm text-[#94A899] max-w-2xl">
            Have a project in mind, need infrastructure automation, or exploring new cloud opportunities? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Channels & Status (Matching Screenshot) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#F4F9F5]">
                Direct Contact Channels
              </h3>
              <p className="text-xs sm:text-sm text-[#94A899] leading-relaxed">
                Reach out through email or LinkedIn. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              <a
                href={emailLink}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0E1410] border border-[#19241C] text-[#94A899] hover:text-[#CCFF00] hover:border-[#CCFF00]/40 transition-all duration-200 group"
              >
                <div className="p-2 rounded-lg bg-[#141E17] text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#060907] transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#667A6B] uppercase">EMAIL</div>
                  <div className="font-semibold text-[#F4F9F5] group-hover:text-[#CCFF00] truncate">
                    yaswanthgedela27@gmail.com
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0E1410] border border-[#19241C] text-[#94A899] hover:text-[#CCFF00] hover:border-[#CCFF00]/40 transition-all duration-200 group"
              >
                <div className="p-2 rounded-lg bg-[#141E17] text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#060907] transition-colors">
                  <LinkedInIcon className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#667A6B] uppercase">LINKEDIN</div>
                  <div className="font-semibold text-[#F4F9F5] group-hover:text-[#CCFF00] truncate">
                    yaswanth-gedela-84946b250
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0E1410] border border-[#19241C] text-[#94A899]">
                <div className="p-2 rounded-lg bg-[#141E17] text-[#A3E635]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#667A6B] uppercase">LOCATION</div>
                  <div className="font-semibold text-[#F4F9F5]">
                    Remote / Hybrid
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0E1410] border border-[#19241C] text-[#94A899]">
                <div className="p-2 rounded-lg bg-[#141E17] text-[#CCFF00]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#667A6B] uppercase">AVAILABILITY</div>
                  <div className="font-semibold text-[#CCFF00] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                    <span>Available for full-time &amp; contracts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Dark Contact Form (Matching Screenshot) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0E1410] border border-[#19241C] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono text-[#94A899]">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060907] border border-[#19241C] focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm text-[#F4F9F5] placeholder-[#667A6B] outline-none transition-colors font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-[#94A899]">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060907] border border-[#19241C] focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm text-[#F4F9F5] placeholder-[#667A6B] outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-1.5">
                <label htmlFor="contact-project-type" className="text-xs font-mono text-[#94A899]">
                  Project Type / Inquiry
                </label>
                <select
                  id="contact-project-type"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060907] border border-[#19241C] focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm text-[#F4F9F5] outline-none transition-colors font-mono"
                >
                  <option value="AWS Cloud Infrastructure Setup">AWS Cloud Infrastructure Setup</option>
                  <option value="Terraform Infrastructure as Code">Terraform Infrastructure as Code</option>
                  <option value="Kubernetes / EKS Deployment">Kubernetes / EKS Deployment</option>
                  <option value="CI/CD Pipeline Automation">CI/CD Pipeline Automation</option>
                  <option value="DevOps Engineering Full-Time Role">DevOps Engineering Full-Time Role</option>
                  <option value="Consulting & Production Troubleshooting">Consulting &amp; Production Troubleshooting</option>
                </select>
              </div>

              {/* Message Area */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-[#94A899]">
                  Tell me about your project...
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your infrastructure goals, timeline, and tech stack..."
                  className="w-full px-4 py-3 rounded-xl bg-[#060907] border border-[#19241C] focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] text-sm text-[#F4F9F5] placeholder-[#667A6B] outline-none transition-colors font-mono resize-none"
                />
              </div>

              {/* Submit Button (Solid Lime Matching Screenshot) */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#CCFF00] text-[#060907] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#B8F500] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)] active:translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4 text-[#060907]" />
                    <span>OPENING EMAIL CLIENT...</span>
                  </>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </Container>
    </section>
  );
};
