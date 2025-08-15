import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Poppins } from 'next/font/google';
import VerticalDotScrollbar from '@/components/VerticalDotScrollbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-primary',
});

export const metadata: Metadata = {
  title: 'Ishan Hansaka Silva',
  description: 'My personal portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Header />
        <VerticalDotScrollbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
