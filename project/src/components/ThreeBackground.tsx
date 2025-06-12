import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  const count = 3000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color1 = new THREE.Color('#444444');
    const color2 = new THREE.Color('#7000FF');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 25; // Increased radius for more depth
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const mixedColor = color1.clone().lerp(color2, Math.random() * 0.3); // Reduced brightness
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!starsRef.current) return;
    starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03; // Slower rotation
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015} // Smaller stars
        vertexColors
        transparent
        opacity={0.6} // Reduced opacity
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Nebula = () => {
  const nebulaRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!nebulaRef.current) return;
    nebulaRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <mesh ref={nebulaRef} position={[0, 0, -8]}>
      <planeGeometry args={[40, 40]} />
      <meshBasicMaterial
        color="#000000"
        transparent
        opacity={0.8}
        blending={THREE.MultiplyBlending}
      />
    </mesh>
  );
};

const DarkMatter = () => {
  const darkMatterRef = useRef<THREE.Points>(null);
  const count = 1000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 15 + Math.random() * 15;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!darkMatterRef.current) return;
    darkMatterRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    darkMatterRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={darkMatterRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#000000"
        transparent
        opacity={0.3}
        blending={THREE.MultiplyBlending}
      />
    </points>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} /> {/* Pure black background */}
        <fog attach="fog" args={['#000000', 8, 30]} /> {/* Darker fog */}
        <Stars />
        <Nebula />
        <DarkMatter />
        <EffectComposer>
          <Bloom
            intensity={0.3} // Reduced bloom intensity
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;