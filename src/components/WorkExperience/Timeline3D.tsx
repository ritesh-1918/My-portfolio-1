import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface Timeline3DProps {
  scrollProgress: MotionValue<number>;
}

export const Timeline3D: React.FC<Timeline3DProps> = ({ scrollProgress }) => {
  const pathRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create the timeline path
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      points.push(
        new THREE.Vector3(
          Math.sin(i * 0.2) * 3,
          i * 0.5 - 2.5,
          Math.cos(i * 0.3) * 2
        )
      );
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  // Generate tube geometry for the timeline path
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 70, 0.05, 8, false);
  }, [curve]);

  // Create particles along the path
  const particles = useMemo(() => {
    const points = [];
    const numPoints = 1000;
    for (let i = 0; i < numPoints; i++) {
      const t = i / numPoints;
      const position = curve.getPoint(t);
      points.push(position.x + (Math.random() - 0.5) * 0.5);
      points.push(position.y + (Math.random() - 0.5) * 0.5);
      points.push(position.z + (Math.random() - 0.5) * 0.5);
    }
    return new Float32Array(points);
  }, [curve]);

  // Animation loop
  useFrame((state, delta) => {
    if (pathRef.current && particlesRef.current) {
      // Animate path glow
      const material = pathRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime) * 0.2;

      // Animate particles
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      // Rotate based on scroll
      const progress = scrollProgress.get();
      pathRef.current.rotation.y = progress * Math.PI * 2;
      particlesRef.current.rotation.y = progress * Math.PI * 2;
    }
  });

  return (
    <group>
      {/* Timeline path */}
      <mesh ref={pathRef} geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#00FF88"
          emissive="#00FF88"
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Glowing particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#00FF88"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Node markers */}
      {[0, 0.2, 0.4, 0.6, 0.8, 1].map((t, i) => {
        const position = curve.getPoint(t);
        return (
          <mesh key={i} position={position}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <MeshDistortMaterial
              attach="material"
              speed={5}
              distort={0.2}
              radius={1}
            >
              <GradientTexture
                stops={[0, 1]}
                colors={['#00FF88', '#7000FF']}
                size={1024}
              />
            </MeshDistortMaterial>
          </mesh>
        );
      })}
    </group>
  );
};