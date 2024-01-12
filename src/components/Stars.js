import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

export function Stars(props) {
  const ref = useRef();
  const [initialPosition] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 10 })
  );

  const initialPositionRef = useRef(initialPosition);

  useFrame((state, delta) => {
    ref.current.position.y -= delta / 1.4;

    if (ref.current.position.y < -7) {
      ref.current.position.set(
        initialPositionRef.current[0],
        initialPositionRef.current[1],
        initialPositionRef.current[2]
      );
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} position={[0, 0, -20]}>
      <Points
        ref={ref}
        positions={initialPositionRef.current}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
