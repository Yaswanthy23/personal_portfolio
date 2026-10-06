'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 sm:py-10 bg-[#060907] border-t border-[#19241C] text-xs font-mono">
      <Container size="lg">
        <div className="flex items-center justify-center text-center">
          <p className="text-[12px] text-[#94A899]">
            © {new Date().getFullYear()} Yaswanth Gedela. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};
