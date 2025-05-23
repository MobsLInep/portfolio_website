import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const BackgroundCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Particles setup - made dimmer
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // Colors for particles - made less saturated
    const colors = [
      new THREE.Color(0x00aaaa), // dimmer cyan
      new THREE.Color(0xaa00aa), // dimmer magenta
      new THREE.Color(0x29cc10), // dimmer green
    ];
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 100;
      
      // Color
      const color = colors[Math.floor(Math.random() * colors.length)];
      colorsArray[i] = color.r * 0.7; // Reduced brightness
      colorsArray[i + 1] = color.g * 0.7;
      colorsArray[i + 2] = color.b * 0.7;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      transparent: true,
      opacity: 0.4, // Reduced from 0.7
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Granular sphere made of small balls
    const granularCount = 800;
    const sphereRadius = 0.1;
    const baseRadius = 10;
    
    const granularSphere = new THREE.Group();
    scene.add(granularSphere);
    
    const basePositions: THREE.Vector3[] = [];
    const displaceVectors: THREE.Vector3[] = [];
    
    for (let i = 0; i < granularCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      
      const r = baseRadius * (0.95 + Math.random() * 0.1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      basePositions.push(new THREE.Vector3(x, y, z));
      
      displaceVectors.push(new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      ));
      
      const geometry = new THREE.SphereGeometry(sphereRadius, 6, 6);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.4), // Reduced saturation and lightness
        transparent: true,
        opacity: 0.5, // Reduced from 0.8
        blending: THREE.AdditiveBlending
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      granularSphere.add(sphere);
    }
    
    // Holographic Octahedron with CRT glitch effect - made dimmer
    const octahedronGeometry = new THREE.OctahedronGeometry(4, 0);
    
    const crtShader = {
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x008888) }, // Dimmer cyan
        opacity: { value: 0.3 }, // Reduced from 0.4
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float opacity;
        uniform vec2 resolution;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        float rand(vec2 n) { 
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }
        
        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);
          
          float res = mix(
            mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
            mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), 
            u.y
          );
          return res*res;
        }
        
        vec2 crtDistortion(vec2 uv, float distortion) {
          uv -= 0.5;
          float r2 = uv.x * uv.x + uv.y * uv.y;
          float distortionFactor = 1.0 + distortion * r2;
          uv *= distortionFactor;
          uv.y += sin(uv.x * 3.14159) * 0.05;
          uv += 0.5;
          return uv;
        }
        
        float scanLines(vec2 uv, float count) {
          float scan = sin(uv.y * count * 3.14159265359 * 2.0) * 0.1 + 0.9;
          scan *= 0.95 + 0.05 * sin(time * 2.0 + uv.y * 100.0);
          return scan;
        }
        
        float vignette(vec2 uv) {
          uv *= 1.0 - uv.yx;
          float vig = uv.x * uv.y * 15.0;
          vig = pow(vig, 0.25);
          vig *= 0.95 + 0.05 * sin(time * 3.0);
          return vig;
        }
        
        vec4 glitchEffect(vec2 uv, float intensity) {
          float glitchTime = floor(time * 15.0) / 15.0;
          float glitchRand = rand(vec2(glitchTime));
          
          if (glitchRand > 0.5) {
            float wave = sin(uv.y * 30.0 + time * 10.0) * 0.02 * intensity;
            uv.x += wave;
            
            if (glitchRand > 0.8) {
              float blockSize = 0.05 + rand(vec2(glitchTime, uv.y)) * 0.15;
              float blockX = floor(uv.x / blockSize) * blockSize;
              float blockY = floor(uv.y / (blockSize * 0.5)) * blockSize * 0.5;
              uv.x = blockX + (uv.x - blockX) * (1.0 - intensity * 0.7);
              uv.y = blockY + (uv.y - blockY) * (1.0 - intensity * 0.7);
            }
            
            float shift = intensity * 0.15 * rand(vec2(glitchTime, uv.y));
            vec3 shiftedColor = vec3(
              color.r + shift,
              color.g - shift * 0.5,
              color.b - shift
            );
            
            shiftedColor = mix(shiftedColor, vec3(shiftedColor.r, shiftedColor.r, shiftedColor.r), 0.3);
            
            return vec4(shiftedColor, opacity * 0.8); // Reduced opacity during glitch
          }
          
          return vec4(color, opacity);
        }
        
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          
          vec3 baseColor = color * (0.6 + 0.2 * sin(vUv.y * 50.0 + time * 3.0)); // Reduced brightness
          baseColor += color * fresnel * 0.3; // Reduced fresnel effect
          
          vec2 distortedUV = crtDistortion(vUv, 0.15);
          vec4 glitchColor = glitchEffect(distortedUV, 0.5); // Reduced glitch intensity
          float lines = scanLines(distortedUV, 800.0);
          float vig = vignette(distortedUV);
          
          vec3 finalColor = glitchColor.rgb * lines * vig;
          finalColor = mix(finalColor, vec3(0.8), fresnel * 0.2); // Reduced mix intensity
          finalColor += (noise(vUv * 1000.0 + time) - 0.5) * 0.02; // Reduced grain
          finalColor = mix(finalColor, vec3(finalColor.r, finalColor.r, finalColor.r), 0.1); // Reduced color bleeding
          
          float pulse = (sin(time * 2.0) + 1.0) * 0.2 + 0.5; // Reduced pulse intensity
          gl_FragColor = vec4(finalColor, opacity * pulse * (0.6 + fresnel * 0.2)); // Reduced overall opacity
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    };
    
    const holographicMaterial = new THREE.ShaderMaterial(crtShader);
    const octahedron = new THREE.Mesh(octahedronGeometry, holographicMaterial);
    scene.add(octahedron);
    
    // Add inner wireframe - made dimmer
    const wireframeGeometry = new THREE.OctahedronGeometry(4.2, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x008888, // Dimmer cyan
      wireframe: true,
      transparent: true,
      opacity: 0.05, // Reduced from 0.1
      blending: THREE.AdditiveBlending
    });
    
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    octahedron.add(wireframe);
    
    // Add pulsing light effect - made dimmer
    const pointLight = new THREE.PointLight(0x008888, 0.8, 15); // Reduced intensity
    pointLight.position.set(0, 0, 0);
    octahedron.add(pointLight);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      holographicMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    let time = 0;
    const pulseSpeed = 0.5;
    const startTime = Date.now();
    const delayDuration = 4000;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;

      const elapsedTime = Date.now() - startTime;
      const disintegrationProgress = elapsedTime < delayDuration 
        ? 0 
        : (Math.sin((time - delayDuration/1000) * 0.5) + 1) / 2;
      
      granularSphere.children.forEach((sphere, index) => {
        const basePos = basePositions[index];
        const displace = displaceVectors[index];
        
        sphere.position.x = basePos.x + displace.x * disintegrationProgress;
        sphere.position.y = basePos.y + displace.y * disintegrationProgress;
        sphere.position.z = basePos.z + displace.z * disintegrationProgress;
        
        const scale = 0.9 + 0.1 * Math.sin(time * 2 + index * 0.1); // Reduced scale variation
        sphere.scale.set(scale, scale, scale);
      });

      granularSphere.rotation.y += 0.001;
      
      holographicMaterial.uniforms.time.value = time;
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += mouseY * 0.0005;
      particlesMesh.rotation.y += mouseX * 0.0005;
      
      octahedron.rotation.x = time * 0.2;
      octahedron.rotation.y = time * 0.3;
      octahedron.rotation.z = Math.sin(time * 0.1) * 0.2;
      
      const pulseIntensity = (Math.sin(time * pulseSpeed) + 1) * 0.2 + 0.5; // Reduced pulse intensity
      holographicMaterial.uniforms.opacity.value = pulseIntensity * 0.25; // Further reduced
      pointLight.intensity = pulseIntensity * 0.7; // Reduced
      wireframeMaterial.opacity = pulseIntensity * 0.1; // Reduced
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', () => {});
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      octahedronGeometry.dispose();
      holographicMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      
      granularSphere.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className="w-full h-full fixed top-0 left-0 -z-10" />;
};

export default BackgroundCanvas;