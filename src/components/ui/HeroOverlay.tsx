'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function HeroOverlay() {
    const container = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(titleRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
            )
                .fromTo(subtitleRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
                    "-=1"
                );

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none select-none">
            <h1 ref={titleRef} className="text-[12vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mix-blend-overlay">
                ANLOVA
            </h1>
            <p ref={subtitleRef} className="text-xl md:text-2xl mt-4 font-mono tracking-[0.2em] text-neon-blue uppercase">
                Intelligence Adapted
            </p>
        </div>
    );
}
