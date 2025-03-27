
import * as THREE from 'three';

export interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'source' | 'destination';
  currency: string;
}

export const locations: Location[] = [
  { name: 'USA', lat: 40.7128, lng: -74.0060, type: 'source', currency: '$' },
  { name: 'UAE', lat: 25.2048, lng: 55.2708, type: 'source', currency: 'د.إ' },
  { name: 'UK', lat: 51.5074, lng: -0.1278, type: 'source', currency: '€' },
  { name: 'India', lat: 20.5937, lng: 78.9629, type: 'destination', currency: '₹' }
];

// Helper function to convert lat/lng to 3D coordinates
export const latLngToVector3 = (lat: number, lng: number, radius: number = 2): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
};
