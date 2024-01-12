import {
  EffectComposer,
  Noise,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";

export function Effects() {
  return (
    <EffectComposer multisampling={false}>
      <Bloom intensity={1} luminanceThreshold={1} mipmapBlur />
      {/* <Noise opacity={0.05} /> */}
      <Vignette eskil={false} offset={0.5} darkness={0.7} />
    </EffectComposer>
  );
}
