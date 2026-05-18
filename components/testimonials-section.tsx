"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const testimonials = [
  {
    name: "Mukhtar Oladipo Ayinla",
    position: "Small Business Owner, Lagos",
    content: "After reporting a phishing attempt targeting my customers, TrustPadi helped spread awareness and prevented others from falling victim. Their verification process is thorough and efficient.",
    image: "/ayinla.jpg",
    stars: 5,
  },
  {
    name: "Winoh Israel",
    position: "Backend Engineer, Abuja",
    content: "Thanks to TrustPadi, I was able to verify that the investment opportunity I received via email was actually a scam. The community reports saved me from losing my retirement savings.",
    image: "/wimoh.jpg",
    stars: 5,
  },
  {
    name: "Shogo Adeniran",
    position: "Cybersecurity Analyst, PH",
    content: "As a professional in the security field, I'm impressed with the accuracy and timeliness of TrustPadi's database. It's become an essential tool I recommend to all my clients.",
    image: "/shogo.jpg",
    stars: 5,
  },
  {
    name: "Tanya Nyathi",
    position: "Online Shopper, Kano",
    content: "I almost purchased from a fake online store until I checked it on TrustPadi. The detailed report showed multiple red flags I had missed. This service is invaluable.",
    image: "/tanya.jpg",
    stars: 5,
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setActive((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, paused]);

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Trusted by thousands</h2>
          <p className="text-lg text-muted-foreground">Real stories from people TrustPadi has helped protect.</p>
        </div>

        <div className="max-w-3xl mx-auto" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Main card */}
          <div className="relative bg-card border border-border rounded-2xl p-8 md:p-10 shadow-lg overflow-hidden min-h-[240px]">
            {/* Quote watermark */}
            <Quote className="absolute top-6 right-8 h-16 w-16 text-primary/5" />

            {testimonials.map((t, i) => (
              <div key={i}
                className={`transition-all duration-500 ${i === active ? "opacity-100 translate-y-0" : "opacity-0 absolute inset-0 translate-y-2 pointer-events-none"}`}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 px-1">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full w-9 h-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={next} className="rounded-full w-9 h-9">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
