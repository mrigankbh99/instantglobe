
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
// Fix the import path for OrbitControls
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'source' | 'destination';
}

const locations: Location[] = [
  { name: 'USA', lat: 40.7128, lng: -74.0060, type: 'source' },
  { name: 'UAE', lat: 25.2048, lng: 55.2708, type: 'source' },
  { name: 'UK', lat: 51.5074, lng: -0.1278, type: 'source' },
  { name: 'India', lat: 20.5937, lng: 78.9629, type: 'destination' }
];

const Globe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const markersRef = useRef<{ [key: string]: THREE.Mesh }>({});
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    // Move camera back to see the smaller globe
    camera.position.z = 7;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controlsRef.current = controls;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Point light
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Create globe - make it smaller (1.5 instead of 2)
    const globeGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    
    // Earth texture with dark theme
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
    );
    
    const bumpMap = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'
    );
    
    // Create custom shader material for dark earth with lighter countries
    const customMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpMap,
      bumpScale: 0.05,
      shininess: 5,
      color: new THREE.Color(0x666666), // Lighter color for countries
      emissive: new THREE.Color(0x112244),
      emissiveIntensity: 0.1,
    });
    
    const globe = new THREE.Mesh(globeGeometry, customMaterial);
    scene.add(globe);

    // Add a subtle glow effect - adjust for smaller globe
    const glowGeometry = new THREE.SphereGeometry(1.6, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a1a2a,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Add location markers - adjust for smaller globe
    locations.forEach((location) => {
      // Convert lat/lng to 3D coordinates - adjusted for smaller radius (1.5)
      const phi = (90 - location.lat) * (Math.PI / 180);
      const theta = (location.lng + 180) * (Math.PI / 180);
      
      const x = -1.5 * Math.sin(phi) * Math.cos(theta);
      const y = 1.5 * Math.cos(phi);
      const z = 1.5 * Math.sin(phi) * Math.sin(theta);
      
      // Create marker
      const markerGeometry = new THREE.SphereGeometry(0.04, 16, 16);
      
      // Set color based on location type
      const markerColor = location.type === 'source' ? 0x1EAEDB : 0x34D399;
      
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: markerColor,
        transparent: true,
        opacity: 0.9,
      });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(x, y, z);
      marker.userData = { location: location.name, type: location.type };
      
      scene.add(marker);
      markersRef.current[location.name] = marker;
      
      // Add pulse effect - adjust size for smaller globe
      const pulseGeometry = new THREE.SphereGeometry(0.06, 16, 16);
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: markerColor,
        transparent: true,
        opacity: 0.4,
      });
      
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.set(x, y, z);
      pulse.scale.set(1, 1, 1);
      pulse.userData = { isPulse: true, baseSize: 1, location: location.name };
      
      scene.add(pulse);
    });

    // Auto-rotation
    let autoRotate = true;
    const autoRotateSpeed = 0.001;
    
    // Mouse hover
    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      if (isInteractive) {
        autoRotate = false;
      }
    };
    
    // Enable/disable auto-rotation on mouse interaction
    const handleMouseDown = () => {
      autoRotate = false;
    };
    
    const handleMouseUp = () => {
      setTimeout(() => {
        autoRotate = true;
      }, 3000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (autoRotate) {
        globe.rotation.y += autoRotateSpeed;
      }
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Raycasting for hover effects
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children);
      
      let hoveredMarker = null;
      
      for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object.userData && object.userData.location && !object.userData.isPulse) {
          hoveredMarker = object.userData.location;
          setHoveredLocation(object.userData.location);
          break;
        }
      }
      
      if (!hoveredMarker) {
        setHoveredLocation(null);
      }
      
      // Pulse animation
      scene.children.forEach((child) => {
        if (child.userData && child.userData.isPulse) {
          const locationName = child.userData.location;
          
          // If this pulse's marker is hovered, make it pulse more dramatically
          if (hoveredLocation === locationName) {
            child.scale.x = 1 + Math.sin(Date.now() * 0.005) * 0.5;
            child.scale.y = 1 + Math.sin(Date.now() * 0.005) * 0.5;
            child.scale.z = 1 + Math.sin(Date.now() * 0.005) * 0.5;
          } else {
            // Normal subtle pulsing
            child.scale.x = 1 + Math.sin(Date.now() * 0.003) * 0.2;
            child.scale.y = 1 + Math.sin(Date.now() * 0.003) * 0.2;
            child.scale.z = 1 + Math.sin(Date.now() * 0.003) * 0.2;
          }
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      if (cameraRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
      
      if (rendererRef.current) {
        rendererRef.current.setSize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Set interactive after a delay
    setTimeout(() => {
      setIsInteractive(true);
    }, 2000);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.removeEventListener('mousedown', handleMouseDown);
        rendererRef.current.domElement.removeEventListener('mouseup', handleMouseUp);
        
        mountRef.current?.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[500px]"
    >
      {hoveredLocation && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 glassmorphism px-4 py-2 rounded-full text-sm animate-fade-in">
          {hoveredLocation}
        </div>
      )}
    </div>
  );
};

export default Globe;
