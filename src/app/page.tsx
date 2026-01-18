'use client';

import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { NeuralCloud } from '@/components/3d/NeuralCloud';
import { Suspense, useState } from 'react';
import { HeroOverlay } from '@/components/ui/HeroOverlay';

export default function Home() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <main className="bg-void-black min-h-screen">
      {/* Persistent 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 12], fov: 45 }}
          gl={{ antialias: false, toneMapping: 0 }}
        >
          <PerformanceMonitor onDecline={() => setDpr(1)} />
          {/* Transparent background so CSS background shows if needed, but we have full screen canvas */}
          <color attach="background" args={['#050505']} />
          <Suspense fallback={null}>
            <NeuralCloud />
          </Suspense>
          <ambientLight intensity={0.5} />
        </Canvas>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Hero Section (Just Overlay now) */}
        <section className="h-screen relative">
          <HeroOverlay />
        </section>

        {/* Services Section */}
        <Services />

        {/* Footer / Contact placeholder */}
        <section className="h-[50vh] flex items-center justify-center border-t border-white/10 bg-void-black text-white/50">
          <p>ANLOVA © 2026</p>
        </section>
      </div>
    </main>
  );
}
