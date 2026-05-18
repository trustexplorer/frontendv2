

'use client'

import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {

    return (
      <>
      <main className="flex flex-col min-h-screen">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
      </>
    );
  }


