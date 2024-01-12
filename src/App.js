import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "./components/Loader";
import { Scene } from "./components/Scene";

import {
  ScrollControls,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

import { PageCoordinates } from "./data/page";

import "./styles/style.scss";

import { Header } from "./components/Header";
import { Effects } from "./components/Effects";

const App = () => {
  const colorBackground = "#222222";
  const colorLight = "#242424";

  return (
    <Suspense fallback={<Loader />}>
      <Canvas flat={true} dpr={[1, 2]} camera={{ near: 1, far: 20 }}>
        <Header />
        <ScrollControls pages={PageCoordinates.length}>
          <Scene PageCoordinates={PageCoordinates} />
        </ScrollControls>
        <OrbitControls
          target={[0, 0, 0]}
          maxPolarAngle={1.45}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxAzimuthAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <Effects />
        <PerspectiveCamera makeDefault />
        <color attach="background" args={[colorBackground]} />
        <fog attach="fog" args={[colorBackground, 5, 30]} />
        <ambientLight intensity={0.5} color={colorLight} />
      </Canvas>
    </Suspense>
  );
};

export default App;
