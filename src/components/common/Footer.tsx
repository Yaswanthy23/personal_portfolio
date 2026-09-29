import React from 'react';
import { Mail, Terminal, Shield, Cloud } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { profileData } from '@/data/profile';
import { socialLinks } from '@/data/social';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <GitHubIcon className="h-4 w-4" />;
      case 'linkedin':
        return <LinkedInIcon className="h-4 w-4" />;
      case 'mail':
        return <Mail className="h-4 w-4" />;
      default:
        return <Terminal className="h-4 w-4" />;
    }
  };

  return (
    <footer className="border-t border-[#263449] bg-[#0E172A] text-[#94A3B8] transition-colors">
      <Container size="lg" className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Column 1: Brand & Role */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold text-[#F8FAFC]">
                {profileData.name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF9900]" />
              <span className="text-xs font-mono text-[#FF9900] bg-[#FF9900]/10 px-2 py-0.5 rounded border border-[#FF9900]/20">
                AWS DevOps
              </span>
            </div>
            <p className="text-sm text-[#94A3B8] max-w-md leading-relaxed">
              Engineering automated, scalable, and production-ready cloud infrastructure with Terraform, Kubernetes, Docker, and CI/CD pipelines.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-[#64748B]">
              <span className="flex items-center gap-1">
                <Cloud className="h-3 w-3 text-[#FF9900]" /> AWS Cloud Native
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-[#22D3EE]" /> Infrastructure as Code
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links / Socials */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-semibold tracking-wider text-[#F8FAFC] uppercase">
              Connect & Source
            </div>
            <ul className="space-y-2 text-sm font-mono" aria-label="Social and Contact Links">
              {socialLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#FF9900] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] rounded px-1 -mx-1"
                    aria-label={item.ariaLabel}
                  >
                    <span className="text-[#64748B] group-hover:text-[#FF9900] transition-colors">
                      {getIcon(item.icon)}
                    </span>
                    <span>{item.name}</span>
                    {item.isPlaceholder && (
                      <span className="text-[10px] text-[#64748B] bg-[#172033] px-1.5 py-0.2 rounded border border-[#263449]">
                        config
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Architecture & Status */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-semibold tracking-wider text-[#F8FAFC] uppercase">
              Deployment Info
            </div>
            <div className="p-3 rounded-lg bg-[#172033] border border-[#263449] text-xs font-mono space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Platform:</span>
                <span className="text-[#F8FAFC]">AWS Amplify</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Assets:</span>
                <span className="text-[#22D3EE]">Cloudinary Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Status:</span>
                <span className="text-[#22C55E]">● Active / Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-[#263449] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <div>
            © {currentYear} {profileData.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Next.js App Router</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
