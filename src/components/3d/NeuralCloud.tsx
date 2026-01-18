'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

const vertexShader = `
uniform float uTime;
uniform vec3 uColor;
attribute float size;
varying vec3 vColor;

void main() {
  vec3 pos = position;
  
  // Gentle floating movement
  pos.x += sin(uTime * 0.3 + pos.y) * 0.1;
  pos.y += cos(uTime * 0.2 + pos.x) * 0.1;
  pos.z += sin(uTime * 0.3 + pos.z) * 0.1;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  
  // Mix based on position and active uniform color
  float noise = sin(pos.x * 2.0 + uTime) * 0.5 + 0.5;
  vColor = mix(vec3(0.1, 0.1, 0.2), uColor, noise);
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength, 3.0);
  
  gl_FragColor = vec4(vColor, strength);
  if (strength < 0.1) discard;
}
`;

const SERVICE_COLORS = [
    new THREE.Color('#3b82f6'), // Blue
    new THREE.Color('#a855f7'), // Purple
    new THREE.Color('#10b981'), // Emerald
    new THREE.Color('#f97316'), // Orange
];

export function NeuralCloud() {
    const mesh = useRef<THREE.Points>(null);
    const { activeServiceIndex } = useStore();

    const particleCount = 2000;

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#3b82f6') },
    }), []);

    const [positions, sizes] = useMemo(() => {
        const p = new Float32Array(particleCount * 3);
        const s = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            // Sphere distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 4 + Math.random() * 2; // Radius between 4 and 6

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            p[i * 3] = x;
            p[i * 3 + 1] = y;
            p[i * 3 + 2] = z;

            s[i] = Math.random();
        }
        return [p, s];
    }, []);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            // @ts-ignore
            mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();

            // Lerp color to target
            const targetColor = SERVICE_COLORS[activeServiceIndex] || SERVICE_COLORS[0];
            // @ts-ignore
            const currentColor = mesh.current.material.uniforms.uColor.value;
            currentColor.lerp(targetColor, 0.05);
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particleCount}
                    array={sizes}
                    itemSize={1}
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                depthWrite={false}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                transparent
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
