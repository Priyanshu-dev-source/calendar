import React, { useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

const occluderMaterial = new THREE.MeshBasicMaterial({
  colorWrite: false,
  side: THREE.DoubleSide,
});

const CircularBinding = ({
  color = "#333333",
  thickness = 0.005,
  radius = 0.1,
  position = [0, 0, 0],
  idx = 0,
}) => {
  return (
    <mesh rotation={[0, Math.PI / 2 + idx * 0.01, 0]} position={position}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
    </mesh>
  );
};

const PairGroup = ({ xOffset, radius, thickness, groupX, idx }) => (
  <group position={[-groupX, 0, 0]}>
    {/* Square Hole Left */}
    <mesh position={[-xOffset, -0.07, 0.001]}>
      <planeGeometry args={[0.045, 0.054]} />
      <meshBasicMaterial color="white" />
    </mesh>
    {/* Square Hole Right */}
    <mesh position={[xOffset, -0.07, 0.001]}>
      <planeGeometry args={[0.045, 0.054]} />
      <meshBasicMaterial color="white" />
    </mesh>

    <CircularBinding
      radius={radius}
      thickness={thickness}
      position={[-xOffset, 0, 0]}
      idx={idx}
    />
    <CircularBinding
      radius={radius}
      thickness={thickness}
      position={[xOffset, 0, 0]}
      idx={idx}
    />
  </group>
);

const HangerHook = ({ thickness = 0.004, color = "#333333" }) => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-0.60, 0.05, 0),
        new THREE.Vector3(-0.12, 0.06, 0),
        new THREE.Vector3(-0.03, 0.16, 0),
        new THREE.Vector3(0, 0.18, 0),
        new THREE.Vector3(0.03, 0.16, 0),
        new THREE.Vector3(0.12, 0.06, 0),
        new THREE.Vector3(0.60, 0.05, 0),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, thickness * 1.8, 16, false]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
    </mesh>
  );
};

export default function App() {
  const radius = 0.08;
  const thickness = 0.004;
  const groupGap = 0.12;
  const xOffset = 0.01;

  const groupCount = 29;
  const groups = Array.from({ length: groupCount }, (_, i) => {
    return (i - (groupCount - 1) / 2) * groupGap;
  });

  const planeWidth = groupCount * groupGap;
  const planeHeight = radius * 1 + 0.01;

  return (
    <div className="w-full h-20 bg-transparent flex items-end justify-center overflow-visible">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <OrthographicCamera makeDefault position={[0, 0.02, 1]} zoom={200} />

        <ambientLight intensity={1.2} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, 5]} intensity={1} />


        <mesh position={[0, -(radius * 0.55), 0]} material={occluderMaterial}>
          <planeGeometry args={[planeWidth + 0.5, radius * 1.2]} />
        </mesh>

        <HangerHook thickness={thickness} color="#333333" />

  
        {[...groups].reverse().map((posX, index) => {
          const centerIndex = (groups.length - 1) / 2;

       
          const distanceFromCenter = Math.abs(index - centerIndex);


          if (distanceFromCenter < 1.5) {
            return null; 
          }

          return (
            <PairGroup
              key={index}
              groupX={-posX} 
              xOffset={xOffset}
              radius={radius}
              thickness={thickness}
              idx={centerIndex - index} 
            />
          );
        })}
      </Canvas>
    </div>
  );
}
