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
    controlsRef.current = controls;

    // Setup lighting and globe
    setupLighting(scene);
    const globe = createGlobe();
    scene.add(globe);
    globeRef.current = globe;
    
    // No glow effect for a more realistic Earth look
    
    // Add currency markers
    addCurrencyMarkers(scene);
    
    // Mouse interaction setup
    setupMouseInteractions(renderer);
    
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.removeEventListener('mousedown', handleMouseDown);
        rendererRef.current.domElement.removeEventListener('mouseup', handleMouseUp);
        
        mountRef.current?.removeChild(rendererRef.current.domElement);
      }
      
      clearTimeout(window.timeoutId);
    };
  }, []);

  // Helper function to setup lighting
  const setupLighting = (scene: THREE.Scene) => {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Point light
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);
  };

  // Helper function to create the globe
  const createGlobe = () => {
    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Earth texture with realistic look
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
    );
    
    const bumpMap = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'
    );
    
    // Create material without the emissive properties for a more realistic look
    const customMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpMap,
      bumpScale: 0.05,
      shininess: 5,
    });
    
    return new THREE.Mesh(globeGeometry, customMaterial);
  };

  // Helper function to add currency markers
  const addCurrencyMarkers = (scene: THREE.Scene) => {
    locations.forEach((location) => {
      const position = latLngToVector3(location.lat, location.lng);
      
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
      sprite.position.set(position.x, position.y, position.z);
      sprite.scale.set(0.4, 0.4, 0.4);
      sprite.userData = { location: location.name, type: location.type };
      
      scene.add(sprite);
      markersRef.current[location.name] = sprite;
    });
  };

  // Helper function to handle mouse move
  const handleMouseMove = (event: MouseEvent) => {
    if (!rendererRef.current) return;
    
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Only disable auto-rotation when user interacts, if interactive mode is on
    if (isInteractive && controlsRef.current) {
      controlsRef.current.autoRotate = false;
      
      // Re-enable auto-rotation after a period of inactivity
      clearTimeout(window.timeoutId);
      window.timeoutId = setTimeout(() => {
        if (controlsRef.current) {
          controlsRef.current.autoRotate = true;
        }
      }, 5000);
    }
  };

  // Helper function to handle mouse down
  const handleMouseDown = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }
  };

  // Helper function to handle mouse up
  const handleMouseUp = () => {
    // Re-enable auto-rotation after some time
    setTimeout(() => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = true;
      }
    }, 3000);
  };

  // Setup mouse interactions
  const setupMouseInteractions = (renderer: THREE.WebGLRenderer) => {
    window.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
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
