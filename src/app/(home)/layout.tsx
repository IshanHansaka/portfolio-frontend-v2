import type { Metadata } from 'next';
import '../globals.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Poppins } from 'next/font/google';
import Preloader from '@/components/Preloader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-primary',
});

export const metadata: Metadata = {
  title: 'Ishan Hansaka',
  description:
    'Explore the portfolio of Ishan Hansaka – Web Developer, Software Engineer, and Technology Enthusiast. Showcasing projects, skills, and achievements in web development, IoT, and innovative software solutions.',
  keywords: [
    'Ishan Hansaka',
    'Web Developer Portfolio',
    'Software Engineer',
    'React Developer',
    'Next.js Portfolio',
  ],
  authors: [{ name: 'Ishan Hansaka' }],
  openGraph: {
    title: 'Ishan Hansaka',
    description:
      'Portfolio showcasing web development, IoT, and innovative software solutions by Ishan Hansaka.',
    url: 'https://www.ishanhansaka.dev/',
    siteName: 'Ishan Hansaka Portfolio',
    images: [
      {
        url: 'https://www.ishanhansaka.dev//og.png',
        width: 1200,
        height: 630,
        alt: 'Ishan Hansaka Portfolio Preview',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
        style={{ overflow: 'hidden' }}
      >
        <Preloader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
