import React from 'react';
import { Container } from '@/components/ui/Container';
import { profileData } from '@/data/profile';
import { socialLinks } from '@/data/social';

export const Footer: React.FC = () => {
  const githubLink = socialLinks.find((s) => s.id === 'github')?.href || '#';
  const linkedinLink = socialLinks.find((s) => s.id === 'linkedin')?.href || '#';
  const emailLink = socialLinks.find((s) => s.id === 'email')?.href || '#';

  return (
    <footer className="py-12 bg-[#070B14] border-t border-[#1E293B] text-xs font-mono text-[#64748B]">
      <Container size="lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-[#F8FAFC]">
              {profileData.name}
            </div>
            <div>{profileData.role}</div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={emailLink}
              className="hover:text-[#F8FAFC] transition-colors"
            >
              Email
            </a>
          </div>

          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} {profileData.name}
          </div>
        </div>
      </Container>
    </footer>
  );
};
