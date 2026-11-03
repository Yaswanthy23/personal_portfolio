import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TagCloud3D } from '@/components/ui/TagCloud3D';
import { profileData } from '@/data/profile';
export const About: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-16 md:py-20 bg-[#B4532A] border-t border-[#9C431D] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div
        className="absolute top-1/2 left-10 -translate-y-1/2 w-[350px] h-[350px] ambient-glow-peach rounded-full blur-3xl opacity-25 pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Interactive 3D Skills Sphere Tag Cloud */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <TagCloud3D />
          </div>

          {/* Right Column: About Section Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <SectionHeading
              label="01 / ABOUT ME"
              title={
                <>
                  A little <span className="text-[#E8B89C]">about me</span>
                </>
              }
              description="Transforming manual operations into scalable, self-healing cloud infrastructure."
              showLine={false}
              variant="dark"
              className="mb-6"
            />

            <div className="space-y-4 text-sm sm:text-base text-[#F5EBE1] leading-relaxed">
              <p>
                {profileData.aboutStory.intro}
              </p>

              <p>
                {profileData.aboutStory.focus}
              </p>

              <p>
                {profileData.aboutStory.journey}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
