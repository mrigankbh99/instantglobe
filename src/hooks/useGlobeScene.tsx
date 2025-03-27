
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Location, locations, latLngToVector3 } from '../utils/globeUtils';

interface GlobeSceneHookResult {
  mountRef: React.RefObject<HTMLDivElement>;
  hoveredLocation: string | null;
}

export const useGlobeScene = (): GlobeSceneHookResult => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  
  // Refs to store Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const markersRef = useRef<{ [key: string]: THREE.Object3D }>({});
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const globeRef = useRef<THREE.Mesh | null>(null);

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

    // Controls setup - enable damping for smoother control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.zoomSpeed = 0.5;
    controls.minDistance = 4;
    controls.maxDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    // Ensure controls are enabled - this fixes the click and drag rotation issue
    controls.enabled = true;
    controlsRef.current = controls;

    // Setup lighting and globe
    setupLighting(scene);
    const globe = createGlobe();
    scene.add(globe);
    globeRef.current = globe;
    
    // No glow effect for a more realistic Earth look
    
    // Add currency markers
    addCurrencyMarkers(scene);
    
    // Animation loop
    setupAnimationLoop();
    
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
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && rendererRef.current.domElement) {
        mountRef.current?.removeChild(rendererRef.current.domElement);
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      clearTimeout(window.timeoutId);
    };
  }, []);

  // Helper function to setup lighting
  const setupLighting = (scene: THREE.Scene) => {
    // Ambient light - reduced intensity for darker appearance
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    // Point light - adjusted position and intensity for darker appearance
    const pointLight = new THREE.PointLight(0xffffff, 0.6);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);
  };

  // Helper function to create the globe
  const createGlobe = () => {
    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Earth texture with darker appearance
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
    );
    
    const bumpMap = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'
    );
    
    // Create darker material for better fit with website theme
    const customMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpMap,
      bumpScale: 0.05,
      shininess: 5,
      color: new THREE.Color(0x777777), // Darker color overlay
    });
    
    return new THREE.Mesh(globeGeometry, customMaterial);
  };

  // Helper function to add currency markers
  const addCurrencyMarkers = (scene: THREE.Scene) => {
    locations.forEach((location) => {
      const position = latLngToVector3(location.lat, location.lng);
      
      // Adjust position to move markers slightly outward from the globe surface
      const direction = new THREE.Vector3(position.x, position.y, position.z).normalize();
      const adjustedPosition = new THREE.Vector3(
        position.x + direction.x * 0.15,
        position.y + direction.y * 0.15,
        position.z + direction.z * 0.15
      );
      
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
      sprite.position.set(adjustedPosition.x, adjustedPosition.y, adjustedPosition.z);
      sprite.scale.set(0.4, 0.4, 0.4);
      sprite.userData = { location: location.name, type: location.type };
      
      scene.add(sprite);
      markersRef.current[location.name] = sprite;
    });
  };

  // Setup animation loop
  const setupAnimationLoop = () => {
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls for smooth damping effect
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Rotate currency symbols with the globe
      if (globeRef.current && sceneRef.current && cameraRef.current) {
        Object.values(markersRef.current).forEach(marker => {
          marker.quaternion.copy(globeRef.current!.quaternion);
        });
        
        // Raycasting for hover effects
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children);
        
        let hoveredMarker = null;
        
        for (let i = 0; i < intersects.length; i++) {
          const object = intersects[i].object;
          if (object.userData && object.userData.location) {
            hoveredMarker = object.userData.location;
            setHoveredLocation(object.userData.location);
            
            // Scale up the hovered object (whether it's a sprite or mesh)
            if (object.type === 'Sprite') {
              (object as THREE.Sprite).scale.set(0.5, 0.5, 0.5);
            }
            
            break;
          }
        }
        
        if (!hoveredMarker) {
          setHoveredLocation(null);
          
          // Reset all marker scales
          Object.values(markersRef.current).forEach(marker => {
            if (marker.type === 'Sprite') {
              (marker as THREE.Sprite).scale.set(0.4, 0.4, 0.4);
            }
          });
        }
        
        if (rendererRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }
    };
    
    animate();
  };

  return { mountRef, hoveredLocation };
};
