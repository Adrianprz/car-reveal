import { Text3D } from "@react-three/drei";
import { useRef, useState } from "react";
import { MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";

export function Text({ size, position, text, rotation }) {
  const ref = useRef();
  const [interval, setInverval] = useState(0);

  const textMaterial = new MeshStandardMaterial({
    color: "white",
    metalness: 0,
    opacity: interval,
    transparent: true,
    roughness: 0,
    emissive: "white",
    emissiveIntensity: 0.2,
  });

  useFrame((state, delta) => {
    if (interval <= 1) {
      setInverval(interval + 0.01);
      textMaterial.opacity = interval;
    }
  });

  return (
    <Text3D
      castShadow
      receiveShadow
      customDepthMaterial={true}
      position={position}
      rotation={rotation}
      ref={ref}
      size={size}
      font={"/gt.json"}
      material={textMaterial}
      height={0.01}
      depth={0.01}
    >
      {text}
    </Text3D>
  );
}
