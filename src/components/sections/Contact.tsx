import React from 'react';
import { Mail, FileText, ArrowUpRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { profileData } from '@/data/profile';
import { socialLinks } from '@/data/social';

export const Contact: React.FC = () => {
  const githubLink = socialLinks.find((s) => s.id === 'github')?.href || '#';
  const linkedinLink = socialLinks.find((s) => s.id === 'linkedin')?.href || '#';
  const emailLink = socialLinks.find((s) => s.id === 'email')?.href || 'mailto:contact@placeholder-yaswanth.dev';

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#070B14] border-t border-[#1E293B]/50 relative">
      <Container size="lg">
        <SectionHeading
          label="07 / CONTACT"
          title="Let's connect"
          description="I'm always interested in discussing DevOps, cloud infrastructure, automation, and new engineering opportunities."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-4xl">
          
          {/* Resume CTA Box (7 Cols) */}
          <Card className="lg:col-span-7 p-8 bg-[#101827] border border-[#1E293B] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF9900]">
                <FileText className="h-4 w-4" />
                <span>DETAILED CV / RESUME</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                Want the detailed version?
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Download my comprehensive engineering resume detailing cloud projects, Terraform architectures, and full technical experience.
              </p>
            </div>

            <div>
              <Button
                variant="primary"
                size="md"
                href={profileData.resumeUrl}
                isExternal
                rightIcon={<ArrowUpRight className="h-4 w-4 text-[#070B14]" />}
              >
                Download Resume
              </Button>
            </div>
          </Card>

          {/* Direct Contact Links Box (5 Cols) */}
          <Card className="lg:col-span-5 p-8 bg-[#101827] border border-[#1E293B] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#22D3EE]">
                DIRECT CHANNELS
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC]">
                Get in touch
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Feel free to reach out directly via email or connect with me on LinkedIn.
              </p>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <a
                href={emailLink}
                className="flex items-center justify-between p-3 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#94A3B8] hover:text-[#FF9900] hover:border-[#FF9900]/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#FF9900]" />
                  <span>Email Me</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <LinkedInIcon className="h-3.5 w-3.5 text-[#22D3EE]" />
                  <span>LinkedIn Profile</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#2A3B52] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GitHubIcon className="h-3.5 w-3.5 text-[#F8FAFC]" />
                  <span>GitHub Repositories</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};
