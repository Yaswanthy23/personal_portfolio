import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0B1117',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.role,
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
    knowsAbout: [
      'Amazon Web Services (AWS)',
      'Terraform',
      'Kubernetes',
      'Docker',
      'CI/CD Pipelines',
      'DevOps Engineering',
      'Infrastructure as Code',
      'Linux System Administration',
    ],
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans scroll-smooth dark`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0B1117] text-[#FFFFFF] font-sans antialiased selection:bg-[#00DC82]/30 selection:text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}
