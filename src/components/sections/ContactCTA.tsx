'use client';

import React from 'react';
import { Mail, ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { socialLinks } from '@/data/social';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const ContactCTA: React.FC = () => {
  const emailLink = socialLinks.find((s) => s.id === 'email')?.href || 'mailto:contact@placeholder.dev';
  const githubLink = socialLinks.find((s) => s.id === 'github')?.href || '#';
  const linkedinLink = socialLinks.find((s) => s.id === 'linkedin')?.href || '#';

  return (
    <section id="contact" className="py-20 bg-[#111827]/80 border-t border-[#263449]/50 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#FF9900]/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="md">
        <div className="relative rounded-2xl bg-[#172033] border border-[#263449] p-8 sm:p-12 text-center shadow-xl overflow-hidden">
          {/* Top minimal badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1120] border border-[#263449] text-xs font-mono text-[#22D3EE] mb-6">
            <MessageSquare className="h-3.5 w-3.5 text-[#FF9900]" />
            <span>START A CONVERSATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            Let&apos;s Build Something
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl mx-auto mb-8 leading-relaxed">
            Interested in cloud infrastructure, DevOps automation, or scalable Kubernetes platforms? Reach out directly.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href={emailLink}
              leftIcon={<Mail className="h-4 w-4" />}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Get In Touch
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href={linkedinLink}
              isExternal
              leftIcon={<LinkedInIcon className="h-4 w-4" />}
            >
              LinkedIn
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href={githubLink}
              isExternal
              leftIcon={<GitHubIcon className="h-4 w-4" />}
            >
              GitHub
            </Button>
          </div>

          {/* Terminal-style footer info */}
          <div className="mt-8 pt-6 border-t border-[#263449]/70 flex items-center justify-center gap-2 text-xs font-mono text-[#64748B]">
            <Terminal className="h-3.5 w-3.5 text-[#FF9900]" />
            <span>Response Time: &lt; 24 hours // PGP &amp; SSH ready</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
