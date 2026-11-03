'use client';

import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle2, ArrowRight, Check } from 'lucide-react';
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
    const mailtoUrl = `mailto:yaswanthgedela27@gmail.com?subject=${encodeURIComponent(formState.subject + ' - from ' + formState.name)}&body=${encodeURIComponent(formState.message + '\n\nSender Email: ' + formState.email)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#B4532A] border-t border-[#9C431D] relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] ambient-glow-peach rounded-full blur-3xl opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7D3414] border border-[#C4653D] text-[#E8B89C] text-xs font-mono font-bold uppercase tracking-wider">
            <span>05 / CONTACT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FFFFFF] tracking-tight">
            Let&apos;s build something <span className="text-[#E8B89C]">scalable together.</span>
          </h2>
          <p className="text-sm text-[#F5EBE1] max-w-2xl leading-relaxed">
            Have a project in mind, need infrastructure automation, or exploring new cloud opportunities? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Channels & Status */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#FFFFFF]">
                Direct Contact Channels
              </h3>
              <p className="text-xs sm:text-sm text-[#F5EBE1] leading-relaxed">
                Reach out through email or LinkedIn. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              <a
                href={emailLink}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#7D3414] border border-[#C4653D] text-[#F5EBE1] hover:text-[#FFFFFF] hover:border-[#E8B89C] transition-all duration-200 group shadow-md"
              >
                <div className="p-2 rounded-lg bg-[#943E19] text-[#E8B89C] group-hover:bg-[#E8B89C] group-hover:text-[#2A211B] transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#F5EBE1]/70 uppercase">EMAIL</div>
                  <div className="font-semibold text-[#FFFFFF] group-hover:text-[#E8B89C] truncate">
                    yaswanthgedela27@gmail.com
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#7D3414] border border-[#C4653D] text-[#F5EBE1] hover:text-[#FFFFFF] hover:border-[#E8B89C] transition-all duration-200 group shadow-md"
              >
                <div className="p-2 rounded-lg bg-[#943E19] text-[#E8B89C] group-hover:bg-[#E8B89C] group-hover:text-[#2A211B] transition-colors">
                  <LinkedInIcon className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] text-[#F5EBE1]/70 uppercase">LINKEDIN</div>
                  <div className="font-semibold text-[#FFFFFF] group-hover:text-[#E8B89C] truncate">
                    yaswanth-gedela-84946b250
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#7D3414] border border-[#C4653D] text-[#F5EBE1] shadow-md">
                <div className="p-2 rounded-lg bg-[#943E19] text-[#E8B89C]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#F5EBE1]/70 uppercase">LOCATION</div>
                  <div className="font-semibold text-[#FFFFFF]">
                    Remote / Hybrid
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#7D3414] border border-[#C4653D] text-[#F5EBE1] shadow-md">
                <div className="p-2 rounded-lg bg-[#943E19] text-[#E8B89C]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#F5EBE1]/70 uppercase">AVAILABILITY</div>
                  <div className="font-semibold text-[#FFFFFF] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E8B89C] animate-pulse shadow-[0_0_8px_#E8B89C]" />
                    <span>Available for full-time &amp; contracts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#943E19] border border-[#C4653D] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono text-[#F5EBE1]">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#7D3414] border border-[#C4653D] focus:border-[#E8B89C] focus:ring-1 focus:ring-[#E8B89C] text-sm text-[#FFFFFF] placeholder-[#E8D8CC]/50 outline-none transition-colors font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-[#F5EBE1]">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#7D3414] border border-[#C4653D] focus:border-[#E8B89C] focus:ring-1 focus:ring-[#E8B89C] text-sm text-[#FFFFFF] placeholder-[#E8D8CC]/50 outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-1.5">
                <label htmlFor="contact-project-type" className="text-xs font-mono text-[#F5EBE1]">
                  Project Type / Inquiry
                </label>
                <select
                  id="contact-project-type"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#7D3414] border border-[#C4653D] focus:border-[#E8B89C] focus:ring-1 focus:ring-[#E8B89C] text-sm text-[#FFFFFF] outline-none transition-colors font-mono"
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
                <label htmlFor="contact-message" className="text-xs font-mono text-[#F5EBE1]">
                  Tell me about your project...
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your infrastructure goals, timeline, and tech stack..."
                  className="w-full px-4 py-3 rounded-xl bg-[#7D3414] border border-[#C4653D] focus:border-[#E8B89C] focus:ring-1 focus:ring-[#E8B89C] text-sm text-[#FFFFFF] placeholder-[#E8D8CC]/50 outline-none transition-colors font-mono resize-none"
                />
              </div>

              {/* Submit Button in Warm Sand Pill style matching reference */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#F5EBE1] text-[#2A211B] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#FFFFFF] hover:shadow-[0_4px_20px_rgba(232,184,156,0.35)] active:translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4 text-[#2A211B]" />
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
