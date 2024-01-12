import React, { useRef } from "react";
import { SpotLight, ContactShadows, useScroll, Cloud } from "@react-three/drei";
import { useControls } from "leva";

import { useFrame } from "@react-three/fiber";

import { Ground } from "./Ground";

import { LightConfiguration } from "../data/light";
import { textData } from "../data/textData";

import { Car } from "./Car";
import { Progress } from "./Progress";
import { Stars } from "./Stars";
import { Text } from "./Text";
import { useSceneUtils } from "./SceneUtils";

export function Scene({ PageCoordinates }) {
  const enableDebug = false;

  const {
    angle,
    penumbra,
    intensity,
    attenuation,
    positionX,
    positionY,
    positionZ,
    distance,
    anglePower,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = enableDebug ? useControls(LightConfiguration) : LightConfiguration;

  const light = useRef();
  const scroll = useScroll();

  const {
    offset,
    setOffset,
    currentPage,
    percentage,
    updateCameraPosition,
    handleMouseMove,
    updateLightTarget,
  } = useSceneUtils(PageCoordinates);

  useFrame((state) => {
    setOffset(scroll.offset);
    updateCameraPosition(
      {
        camera: state.camera,
        light,
        mouse: state.mouse,
        viewport: state.viewport,
      },
      offset,
      PageCoordinates
    );
    handleMouseMove({
      camera: state.camera,
      light,
      mouse: state.mouse,
      viewport: state.viewport,
    });
    updateLightTarget({
      camera: state.camera,
      light,
      mouse: state.mouse,
      viewport: state.viewport,
    });
  });

  return (
    <>
      <Car offset={offset} />
      <Stars />{" "}
      <ContactShadows
        position={[0, -1.39, 0]}
        opacity={1}
        scale={10}
        frames={1}
        color={"#000"}
        far={5}
      />
      <Progress progress={percentage} />
      <Ground />
      <SpotLight
        ref={light}
        color={"#ffd27f"}
        castShadow
        penumbra={enableDebug ? penumbra : penumbra.value}
        radiusTop={1}
        radiusBottom={50}
        distance={enableDebug ? distance : distance.value}
        angle={enableDebug ? angle : angle.value}
        attenuation={enableDebug ? attenuation : attenuation.value}
        anglePower={enableDebug ? anglePower : anglePower.value}
        volumetric={true}
        intensity={enableDebug ? intensity : intensity.value}
        opacity={0.3}
        position={[
          enableDebug ? positionX : positionX.value,
          enableDebug ? positionY : positionY.value,
          enableDebug ? positionZ : positionZ.value,
        ]}
      />
      <SpotLight
        color={"#666"}
        castShadow
        penumbra={enableDebug ? penumbra : penumbra.value}
        radiusTop={1}
        radiusBottom={40}
        distance={50}
        angle={0.1}
        attenuation={enableDebug ? attenuation : attenuation.value}
        anglePower={enableDebug ? anglePower : anglePower.value}
        volumetric={true}
        intensity={0.1}
        position={[8, 5, 30]}
      />
      <Cloud
        seed={20}
        fade={50}
        speed={0.1}
        growth={30}
        segments={40}
        volume={6}
        opacity={0.7}
        position={[0, 1, 10]}
        bounds={[2, 2, 3]}
        depthTest={true}
      />
      {currentPage > 0 && (
        <>
          {textData.map(
            (textItem, index) =>
              currentPage >= textItem.page && (
                <Text
                  key={index}
                  text={textItem.text}
                  size={textItem.size}
                  position={textItem.position}
                  rotation={textItem.rotation}
                />
              )
          )}
        </>
      )}
    </>
  );
}
