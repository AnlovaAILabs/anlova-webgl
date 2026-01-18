'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils'; // Assuming standard utils, or I'll inline helper

gsap.registerPlugin(ScrollTrigger);

const services = [
    { title: "AI Health", desc: "Predictive diagnostics & patient care.", color: "from-blue-500/20" },
    { title: "AI Retail", desc: "Hyper-personalized shopping experiences.", color: "from-purple-500/20" },
    { title: "AI Invoicing", desc: "Automated financial reconciliation.", color: "from-emerald-500/20" },
    { title: "AI Insurance", desc: "Risk assessment & fraud detection.", color: "from-orange-500/20" },
];

export function Services() {
    const container = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const { setActiveServiceIndex } = useStore();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const scrollTween = gsap.to(track.current, {
                xPercent: -100 * (services.length - 1) / services.length, // Move based on number of items
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: "+=300%", // 3x scroll length
                    onUpdate: (self) => {
                        // Calculate active index based on progress
                        const index = Math.round(self.progress * (services.length - 1));
                        setActiveServiceIndex(index);
                    }
                }
            });
        }, container);
        return () => ctx.revert();
    }, [setActiveServiceIndex]);

    return (
        <section ref={container} className="relative h-screen bg-void-black text-white overflow-hidden">
            <div className="absolute top-10 left-10 z-10">
                <h2 className="text-4xl font-bold tracking-tighter">OUR VERTICALS</h2>
            </div>

            <div ref={track} className="flex h-full w-[400%]">
                {services.map((service, i) => (
                    <div key={i} className="w-screen h-full flex items-center justify-center p-10 box-border shrink-0">
                        <div className={`
              w-full max-w-2xl h-[60vh] 
              backdrop-blur-xl bg-gradient-to-br ${service.color} to-white/5 
              border border-white/10 rounded-3xl 
              flex flex-col justify-end p-12
              transition-transform duration-500 hover:scale-[1.02]
            `}>
                            <h3 className="text-6xl font-bold mb-4">{service.title}</h3>
                            <p className="text-2xl text-white/60 font-light">{service.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
