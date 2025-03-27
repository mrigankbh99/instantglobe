
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
// Fix the import path for OrbitControls
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DollarSign, EuroIcon } from 'lucide-react';

interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'source' | 'destination';
  currency: string;
}

const locations: Location[] = [
  { name: 'USA', lat: 40.7128, lng: -74.0060, type: 'source', currency: '$' },
  { name: 'UAE', lat: 25.2048, lng: 55.2708, type: 'source', currency: 'د.إ' },
  { name: 'UK', lat: 51.5074, lng: -0.1278, type: 'source', currency: '€' },
  { name: 'India', lat: 20.5937, lng: 78.9629, type: 'destination', currency: '₹' }
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
    // Position camera to see the globe well
    camera.position.z = 6;
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

    // Create globe - slightly larger than before but still fits well
    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    
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
      color: new THREE.Color(0x888888), // Lighter color for countries
      emissive: new THREE.Color(0x1a2d5b), // Subtle blue overlay
      emissiveIntensity: 0.2,
    });
    
    const globe = new THREE.Mesh(globeGeometry, customMaterial);
    scene.add(globe);

    // Add a subtle glow effect
    const glowGeometry = new THREE.SphereGeometry(2.1, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x3366cc,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Add currency symbols as text sprites
    locations.forEach((location) => {
      // Convert lat/lng to 3D coordinates - adjusted for our globe size (2)
      const phi = (90 - location.lat) * (Math.PI / 180);
      const theta = (location.lng + 180) * (Math.PI / 180);
      
      const x = -2 * Math.sin(phi) * Math.cos(theta);
      const y = 2 * Math.cos(phi);
      const z = 2 * Math.sin(phi) * Math.sin(theta);
      
      // Create text sprite for currency symbol
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 128;
      canvas.height = 128;
      
      if (context) {
        context.fillStyle = location.type === 'source' ? '#1EAEDB' : '#34D399';
        context.font = '80px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(location.currency, 64, 64);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(x, y, z);
      sprite.scale.set(0.4, 0.4, 0.4);
      sprite.userData = { location: location.name, type: location.type };
      
      scene.add(sprite);
      markersRef.current[location.name] = sprite;
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
        if (object.userData && object.userData.location) {
          hoveredMarker = object.userData.location;
          setHoveredLocation(object.userData.location);
          
          // Scale up the hovered sprite
          if (object.type === 'Sprite') {
            object.scale.set(0.5, 0.5, 0.5);
          }
          
          break;
        }
      }
      
      if (!hoveredMarker) {
        setHoveredLocation(null);
        
        // Reset all sprite scales
        Object.values(markersRef.current).forEach(marker => {
          if (marker.type === 'Sprite') {
            marker.scale.set(0.4, 0.4, 0.4);
          }
        });
      }
      
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
      className="w-full h-full min-h-[500px] relative"
    >
      {/* Add a background glare effect */}
      <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-emerald-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse-glow"></div>
      
      {hoveredLocation && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 glassmorphism px-4 py-2 rounded-full text-sm animate-fade-in">
          {hoveredLocation}
        </div>
      )}
    </div>
  );
};

export default Globe;
