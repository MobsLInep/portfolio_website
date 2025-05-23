import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const PhotoFrame = () => {
  const groupRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  const photoRef = useRef<THREE.Mesh>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  
  // Use drei's useTexture for better image loading
  const texture = useTexture('/images/pre.jpg');
  
  // Animation controls
  const moveSpeed = 0.15; // Slightly slower movement for smoother effect
  const neonBlue = new THREE.Color(0x00ffff); // Neon blue color

  useFrame(() => {
    if (!groupRef.current) return;
    
    // Z-position movement
    const targetZ = isHovered ? 0.5 : 0;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * moveSpeed;
  });
  
  return (
    <group 
      ref={groupRef} 
      position={[0, 0, 0]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Neon Blue Frame */}
      <mesh ref={frameRef}>
        <torusGeometry args={[0.425, 0.0425, 32, 32]} />
        <meshStandardMaterial 
          color={neonBlue}
          emissive={neonBlue}
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      {/* Photo */}
      <mesh ref={photoRef} position={[0, 0, 0.01]}>
        <circleGeometry args={[0.3825, 64]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.1}
          metalness={0}
          toneMapped={false}
          transparent={true}
          alphaTest={0.1}
        />
      </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5} 
        color={0xffffff}
      />
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.8} 
        color={0x00aaff}
      />
      <PhotoFrame />
    </>
  );
};

const PhotoFrameCanvas: React.FC = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
      linear // Disable automatic sRGB encoding for more accurate colors
    >
      <Scene />
    </Canvas>
  );
};

export default PhotoFrameCanvas;