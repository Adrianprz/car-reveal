import { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

export function Car({ offset }) {
  const white = 0xffffff;
  const orange = 0xffe5b4;
  const gray = 0x828282;

  const { scene, animations } = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/final.glb"
  );

  const { actions } = useAnimations(animations, scene);

  const carRef = useRef();

  useEffect(() => {
    carRef.current.position.set(0, -1.4, 0);
    carRef.current.traverse((object) => {
      if (object.isMesh) {
        if (object.name.includes("Bottom_light_bars")) {
          object.material.color = new THREE.Color(orange);
          object.material.emissive = new THREE.Color(orange);
          object.material.emissiveIntensity = 15;
          object.material.toneMapped = false;
        }
        if (object.name.includes("VP_Free_BMW_8_vm_T3_024_led_light_0")) {
          object.material.color = new THREE.Color(white);
          object.material.emissive = new THREE.Color(white);
        }

        if (object.name.includes("Plane004")) {
          object.material.roughness = 0.8;
          object.material.metalness = 0.8;
          object.material.envMapIntensity = 1;

          object.material.dithering = true;
          object.material.depthTest = true;
          object.material.depthWrite = true;

          object.material.reflectivity = 0;
          object.material.iridescence = 0;
          object.material.sheen = 0;
          object.material.side = THREE.DoubleSide;

          object.material.envMapIntensity = 100;
          // object.material.wireframe = true;
        }
        if (object.name.includes("carpaint")) {
          object.material.emissive = new THREE.Color(gray);
          object.material.emissiveIntensity = 0.2;
          object.material.roughness = 0.8;
          object.material.opacity = 1;
          object.material.metalness = 0.8;
          object.material.envMapIntensity = 1;
          object.material.color = new THREE.Color(gray);
        }

        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    actions["KeyAction"].play().paused = true;
  }, [actions]);

  useFrame((state, delta) => {
    const action = actions["KeyAction"];

    action.time = THREE.MathUtils.damp(
      action.time,
      (action.getClip().duration / 2) * offset * 1.5,
      100,
      delta
    );
  });

  return <primitive ref={carRef} object={scene} />;
}
