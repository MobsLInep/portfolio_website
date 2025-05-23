import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

type CubeProps = {
  color?: string;
  position?: [number, number, number];
}

function Cube(props: CubeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = React.useState(false);
  
  useFrame((state, delta) => {
    if (!hovered) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });
  
  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial 
        color={hovered ? '#ff00ff' : (props.color || '#00ffff')} 
        wireframe={true} 
      />
    </mesh>
  );
}

function SkillNodes() {
  const technologies = [
    { id: 1, name: 'React', icon: '⚛️' },
    { id: 2, name: 'TypeScript', icon: 'TS' },
    { id: 3, name: 'Node.js', icon: 'Node' },
    { id: 4, name: 'Three.js', icon: '3D' },
    { id: 5, name: 'MongoDB', icon: 'DB' },
    { id: 6, name: 'GraphQL', icon: 'GQL' },
  ];
  
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.1;
  });
  
  return (
    <group ref={groupRef}>
      {technologies.map((tech, index) => {
        // Calculate positions in a spherical arrangement
        const radius = 6;
        const phi = Math.acos(-1 + (2 * index) / technologies.length);
        const theta = Math.sqrt(technologies.length * Math.PI) * phi;
        
        return (
          <mesh 
            key={tech.id}
            position={[
              radius * Math.cos(theta) * Math.sin(phi),
              radius * Math.sin(theta) * Math.sin(phi),
              radius * Math.cos(phi)
            ]}
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial 
              color={['#00ffff', '#ff00ff', '#39ff14'][index % 3]}
              emissive={['#00ffff', '#ff00ff', '#39ff14'][index % 3]}
              emissiveIntensity={0.5}
            />
            
            {/* Use HTML to create labels */}
            <Html position={[0, 0, 0]} center distanceFactor={8}>
              <div className="text-white bg-black/70 px-2 py-1 rounded text-xs whitespace-nowrap">
                {tech.name}
              </div>
            </Html>
          </mesh>
        );
      })}
    </group>
  );
}

// Import HTML from drei
import { Html } from '@react-three/drei';

const SkillCube = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Cube position={[0, 0, 0]} color="#00ffff" />
      <SkillNodes />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
};

export default SkillCube;