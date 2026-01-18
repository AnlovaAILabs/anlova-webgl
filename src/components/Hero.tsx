'use client';

import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { NeuralCloud } from '@/components/3d/NeuralCloud';
import { HeroOverlay } from '@/components/ui/HeroOverlay';
import { Suspense, useState } from 'react';

export function Hero() {
    const [dpr, setDpr] = useState(1.5);

    return (
        <div className="relative w-full h-screen bg-void-black overflow-hidden">
            <HeroOverlay />
            <div className="absolute inset-0 z-0">
                <Canvas
                    dpr={dpr}
                    camera={{ position: [0, 0, 12], fov: 45 }}
                    gl={{ antialias: false, toneMapping: 0 }} // Optimized settings
                >
                    <PerformanceMonitor onDecline={() => setDpr(1)} />
                    <color attach="background" args={['#050505']} />
                    <Suspense fallback={null}>
                        <NeuralCloud />
                    </Suspense>
                    <ambientLight intensity={0.5} />
                </Canvas>
            </div>
        </div>
    );
}
