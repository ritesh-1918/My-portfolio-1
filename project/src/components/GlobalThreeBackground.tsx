import { Canvas } from '@react-three/fiber';
import { Canvas as R3FCanvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Icosahedron, TorusKnot } from '@react-three/drei';
// Temporarily comment out physics imports until @react-three/rapier is installed
import { Physics, useSphere } from '@react-three/rapier';
import { useSpring, animated } from '@react-spring/three';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useScroll } from '@react-three/drei';

// Shader materials (will be defined or imported later)
// import NeonWaveMaterial from '../shaders/NeonWaveMaterial';

const FloatingGeometry = () => {
  const icoRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (icoRef.current) {
      icoRef.current.rotation.x += 0.005;
      icoRef.current.rotation.y += 0.005;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.005;
      torusRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      <Icosahedron ref={icoRef} args={[1, 1]} position={[-2, 0, 0]}>
        <meshStandardMaterial color="#00FF88" wireframe />
      </Icosahedron>
      <TorusKnot ref={torusRef} args={[1, 0.4, 128, 16]} position={[2, 0, 0]}>
        <meshStandardMaterial color="#7000FF" wireframe />
      </TorusKnot>
    </group>
  );
};

const ParticleSystem = () => {
  const scroll = useScroll();
  const ref = useRef<THREE.Points>(null);
  const count = 5000;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame(() => {
    if (ref.current) {
      // Simple pulsate effect based on scroll
      const offset = scroll.offset;
      const scale = 1 + Math.sin(offset * Math.PI * 2) * 0.5;
      // This is a simplified pulsate. More complex animation would require updating attribute.
      // For now, just a visual indicator of scroll effect.
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#F0F0F0" sizeAttenuation={true} />
    </points>
  );
};

const DynamicLighting = () => {
  const pointLightRef = useRef<THREE.PointLight>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const { viewport } = useThree();
  const [isDay, setIsDay] = useState(true);

  useFrame((state) => {
    // Point light follows cursor (simplified)
    if (pointLightRef.current) {
      pointLightRef.current.position.x = state.mouse.x * viewport.width / 2;
      pointLightRef.current.position.y = state.mouse.y * viewport.height / 2;
    }

    // Simple day/night cycle based on time
    const time = state.clock.getElapsedTime();
    const cycleDuration = 60; // seconds
    const angle = (time % cycleDuration) / cycleDuration * Math.PI * 2;
    const intensity = Math.sin(angle) * 0.5 + 0.5; // Intensity varies between 0 and 1

    if (directionalLightRef.current) {
      directionalLightRef.current.intensity = intensity;
      directionalLightRef.current.position.set(
        Math.sin(angle) * 10,
        Math.cos(angle) * 10,
        5
      );
    }

    setIsDay(intensity > 0.5);
  });

  return (
    <group>
      <pointLight ref={pointLightRef} intensity={1} distance={20} color="#F0F0F0" />
      <directionalLight ref={directionalLightRef} intensity={0.8} position={[5, 10, 5]} color={isDay ? "#F0F0F0" : "#7000FF"} />
      <ambientLight intensity={0.2} color={isDay ? "#F0F0F0" : "#2A2A2A"} />
    </group>
  );
};

// Placeholder for Shader Effects (will be implemented later)
const ShaderEffects = () => {
  // Example: Apply a post-processing shader or use custom materials
  return null; // Or a mesh with custom material
};

const PhysicsObject = () => {
  const [ref, api] = useSphere(() => ({ mass: 1, position: [0, 0, 0] }));
  const [spring, springApi] = useSpring(() => ({ scale: 1 }));

  const handleHover = (hovered: boolean) => {
    springApi.start({ scale: hovered ? 1.2 : 1 });
  };

  return (
    <animated.mesh
      ref={ref}
      scale={spring.scale}
      onPointerOver={() => handleHover(true)}
      onPointerOut={() => handleHover(false)}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </animated.mesh>
  );
};

const GlobalThreeBackground = () => {
  return (
    <R3FCanvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <color attach="background" args={["#2A2A2A"]} />
      <Physics>
        <FloatingGeometry />
        <ParticleSystem />
        <DynamicLighting />
        <ShaderEffects />
        <PhysicsObject />
      </Physics>

    </R3FCanvas>
  );
};

export default GlobalThreeBackground;