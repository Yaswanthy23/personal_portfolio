'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 sm:py-10 bg-[#0B1117] border-t border-[#17261D] text-xs font-mono">
      <Container size="lg">
        <div className="flex items-center justify-center text-center">
          <p className="text-[12px] text-[#9CA3AF]">
            © {new Date().getFullYear()} Yaswanth Gedela. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};
