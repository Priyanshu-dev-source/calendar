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


import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

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
    {/* --- LEFT SQUARE HOLE --- */}
    <mesh position={[-xOffset, -0.065, 0.001]}>
      {/* Width is slightly wider than the ring, height is a small slot */}
      <planeGeometry args={[0.012, 0.018]} />
      {/* Dark gray color to simulate depth/shadow inside the hole */}
      <meshBasicMaterial color="#666666" /> 
    </mesh>

    {/* --- RIGHT SQUARE HOLE --- */}
    <mesh position={[xOffset, -0.065, 0.001]}>
      <planeGeometry args={[0.012, 0.018]} />
      <meshBasicMaterial color="#666666" />
    </mesh>

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
    <div className="w-full h-16 bg-transparent flex items-center justify-center overflow-hidden">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <OrthographicCamera makeDefault position={[0, 0, 1]} zoom={200} />

        <ambientLight intensity={1.2} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, 5]} intensity={1} />

        {/* --- THE WHITE RECTANGLE --- */}
        <mesh position={[0, -0.03, 0]}>
          <planeGeometry args={[planeWidth, planeHeight]} />
          <meshBasicMaterial color="white" />
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
