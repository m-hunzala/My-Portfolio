import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'M. Hunzala - Web Developer & AI Engineer',
  description: 'Professional portfolio of M. Hunzala - Full-stack developer, AI engineer, and graphic designer crafting intelligent digital experiences.',
  keywords: ['web developer', 'AI engineer', 'graphic designer', 'full-stack', 'React', 'Next.js', 'Python'],
  authors: [{ name: 'M. Hunzala' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}