import './globals.css';
import 'quill/dist/quill.snow.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import { Header } from '@/components/header';
// import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrustPadi - Protect Yourself from Scams',
  description: 'Report and check potential scams, protect yourself and others from fraud.',
  keywords: ['scam', 'fraud', 'report scam', 'check scammer', 'TrustPadi'],
  authors: [{ name: 'TrustPadi Team' }],
  openGraph: {
    title: 'TrustPadi - Report & Check Scams',
    description: 'Protect yourself from scams. TrustPadi helps you verify people and businesses.',
    url: 'https://trustpadi.com',
    siteName: 'TrustPadi',
    images: [
      {
        url: './public/new-logo.png',
        width: 1200,
        height: 630,
        alt: 'TrustPadi Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustPadi - Protect Yourself from Scams',
    description: 'Verify and report scams. TrustPadi helps you avoid fraud.',
    images: ['./public/new-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
            <main className="flex-1 pt-2">
              {children}
            </main>
            
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}