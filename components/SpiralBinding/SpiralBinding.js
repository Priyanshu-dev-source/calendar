// import styles from './SpiralBinding.module.css';

// export default function SpiralBinding() {
//   const coilCount = 28;

//   return (
//     <div className={styles.bindingArea}>
//       {/* Wall hook/hanger */}
//       <div className={styles.hookContainer}>
//         <div className={styles.hookNail} />
//         <div className={styles.hookWire}>
//           <svg viewBox="0 0 60 40" className={styles.hookSvg}>
//             {/* Hook wire arc */}
//             <path
//               d="M5,38 Q5,5 30,5 Q55,5 55,38"
//               stroke="#333"
//               strokeWidth="3"
//               fill="none"
//               strokeLinecap="round"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Spiral coils spanning full width */}
//       <div className={styles.spiralRow}>
//         {Array.from({ length: coilCount }, (_, i) => (
//           <div key={i} className={styles.coil}>
//             <svg viewBox="0 0 16 22" className={styles.coilSvg}>
//               <path
//                 d="M3,22 L3,6 C3,2.5 5,0.5 8,0.5 C11,0.5 13,2.5 13,6 L13,22"
//                 stroke="#444"
//                 strokeWidth="2"
//                 fill="none"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </div>
//         ))}
//       </div>

//       {/* Shadow line below spirals */}
//       <div className={styles.spiralShadow} />
//     </div>
//   );
// }


import React, { useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

// Invisible occluder material — writes to depth buffer only, renders no color.
// This hides the back part of the rings (bottom arcs going behind the page)
// while remaining completely invisible itself.
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
    {/* The Rings */}
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
    <div className="w-full h-10 bg-transparent flex items-end justify-center overflow-visible">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <OrthographicCamera makeDefault position={[0, 0.02, 1]} zoom={200} />

        <ambientLight intensity={1.2} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, 5]} intensity={1} />

        {/* Invisible occluder strip — hides the back arcs of the rings */}
        {/* Positioned at z=0 so it sits between the front and back faces of the torus */}
        <mesh position={[0, -(radius * 0.55), 0]} material={occluderMaterial}>
          <planeGeometry args={[planeWidth + 0.5, radius * 1.2]} />
        </mesh>

        {/* The Rings mapped with center gap and tilt */}
        {[...groups].reverse().map((posX, index) => {
          const centerIndex = (groups.length - 1) / 2;

          // Calculate how far this item is from the exact center
          const distanceFromCenter = Math.abs(index - centerIndex);

          // Remove the 4 innermost rings to create the gap
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
