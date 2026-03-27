// MovingStars.tsx
// @ts-nocheck
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Stars() {
  const ref = useRef<any>();

  const starCount = 3000;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = Math.random() * -200;
  }

  useFrame(() => {
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < starCount; i++) {
      arr[i * 3 + 2] += 0.4;
      if (arr[i * 3 + 2] > 5) arr[i * 3 + 2] = -200;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.6} />
    </points>
  );
}

export default function MovingStarsBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <color attach="background" args={["black"]} />
        <Stars />
      </Canvas>
    </div>
  );
}