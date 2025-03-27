
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'source' | 'destination';
  currency?: string;
}

const locations: Location[] = [
  { name: 'USA', lat: 40.7128, lng: -74.0060, type: 'source', currency: '$' },
  { name: 'UAE', lat: 25.2048, lng: 55.2708, type: 'source', currency: 'AED' },
  { name: 'UK', lat: 51.5074, lng: -0.1278, type: 'source', currency: '£' },
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
  const globeRef = useRef<THREE.Mesh | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  // Fix: Update the type definition to specifically store THREE.Mesh objects
  const highlightedAreasRef = useRef<{[key: string]: THREE.Mesh}>({});
  const labelGroupRef = useRef<THREE.Group | null>(null);

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
    // Adjusted camera position to accommodate larger globe
    camera.position.z = 8;
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

    // Ambient light - increase intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Point light - make brighter
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Add a background glow effect - REDUCED SIZE TO AVOID GETTING CUT OFF
    const bgGlowGeometry = new THREE.SphereGeometry(2.4, 64, 64); // Reduced from 2.8 to 2.4
    const bgGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x1E3A8A,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const bgGlow = new THREE.Mesh(bgGlowGeometry, bgGlowMaterial);
    scene.add(bgGlow);

    // Create globe
    const globeGeometry = new THREE.SphereGeometry(2.0, 64, 64);
    
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
      shininess: 10,
      color: new THREE.Color(0x888888),
      emissive: new THREE.Color(0x223355),
      emissiveIntensity: 0.2,
    });
    
    const globe = new THREE.Mesh(globeGeometry, customMaterial);
    scene.add(globe);
    globeRef.current = globe;

    // Add a subtle glow effect
    const glowGeometry = new THREE.SphereGeometry(2.1, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4169E1,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Create a parent object for all location highlights - this is key for rotation sync
    const highlightsGroup = new THREE.Group();
    scene.add(highlightsGroup);
    globe.add(highlightsGroup);  // Add as a child of the globe for synchronized rotation

    // Create a group for labels
    const labelGroup = new THREE.Group();
    globe.add(labelGroup);
    labelGroupRef.current = labelGroup;

    // Function to create a text sprite
    const createTextSprite = (text: string, position: THREE.Vector3) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return null;
      
      canvas.width = 128;
      canvas.height = 64;
      
      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.font = '40px Arial';
      context.fillStyle = '#FFFFFF';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false
      });
      
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.set(0.6, 0.3, 1);
      
      return sprite;
    };

    // Add colored overlays for highlighted countries with smaller size
    const highlightCountry = (location: Location) => {
      // Convert lat/lng to 3D coordinates
      const phi = (90 - location.lat) * (Math.PI / 180);
      const theta = (location.lng + 180) * (Math.PI / 180);
      
      // Calculate position on the globe surface - slightly increased offset for better visibility
      const radius = 2.01;  // Just slightly above the globe surface
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      // Create a smaller highlight
      const highlightGeometry = new THREE.CircleGeometry(0.15, 32);  // Reduced from 0.25 to 0.15
      
      // Set color based on location type
      const highlightColor = location.type === 'source' ? 0x1EAEDB : 0x34D399;
      
      const highlightMaterial = new THREE.MeshBasicMaterial({
        color: highlightColor,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      
      const highlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
      
      // Position the highlight on the globe
      highlight.position.set(x, y, z);
      
      // Orient the highlight to face outward from the center of the globe
      highlight.lookAt(0, 0, 0);
      highlight.rotateY(Math.PI);
      
      highlight.userData = { location: location.name, type: location.type };
      
      // Add highlight to the globe itself rather than directly to the scene
      highlightsGroup.add(highlight);
      
      // Store reference to this highlight
      highlightedAreasRef.current[location.name] = highlight;
      
      // Add currency label above the country if available
      if (location.currency) {
        // Position the label slightly above the highlight
        const labelPosition = new THREE.Vector3(
          x * 1.15,  // Multiply by a value slightly larger than 1 to position it outside the globe
          y * 1.15, 
          z * 1.15
        );
        
        const textSprite = createTextSprite(location.currency, labelPosition);
        if (textSprite) {
          labelGroup.add(textSprite);
        }
      }
    };

    // Highlight all countries
    locations.forEach(highlightCountry);

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
      
      if (autoRotate && globeRef.current) {
        globeRef.current.rotation.y += autoRotateSpeed;
      }
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Raycasting for hover effects
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children, true);
      
      let hoveredMarker = null;
      
      for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object.userData && object.userData.location) {
          hoveredMarker = object.userData.location;
          setHoveredLocation(object.userData.location);
          
          // Make the hovered highlight pulse
          const highlight = highlightedAreasRef.current[object.userData.location];
          if (highlight) {
            highlight.scale.set(1.2, 1.2, 1.2);
            // Fix: Use type assertion to inform TypeScript this is a THREE.Material
            const material = highlight.material as THREE.MeshBasicMaterial;
            material.opacity = 0.9;
          }
          break;
        }
      }
      
      if (!hoveredMarker) {
        setHoveredLocation(null);
        
        // Reset all highlights to normal
        Object.values(highlightedAreasRef.current).forEach(highlight => {
          highlight.scale.set(1, 1, 1);
          // Fix: Use type assertion to inform TypeScript this is a THREE.Material
          const material = highlight.material as THREE.MeshBasicMaterial;
          material.opacity = 0.8;
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
