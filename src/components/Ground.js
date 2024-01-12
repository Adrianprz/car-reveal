import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

export function Ground() {
  const [roughness, normal, diffuse, displacement] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/terrain-roughness.jpg",
    process.env.PUBLIC_URL + "textures/terrain-normal.jpg",
    process.env.PUBLIC_URL + "textures/terrain-dif.jpg",
    process.env.PUBLIC_URL + "textures/terrain-displace.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(50, 50);
      t.offset.set(20, 20);
    });

    normal.encoding = LinearEncoding;
  }, [normal, roughness]);

  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, -1.4, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshPhongMaterial
        normalMap={normal}
        roughnessMap={roughness}
        color={"#424242"}
        roughness={1}
      />
    </mesh>
  );
}
