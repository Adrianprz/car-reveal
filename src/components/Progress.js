import { Html } from "@react-three/drei";

export function Progress({ progress }) {
  return (
    <Html as="div" wrapperClass="progress" bottom>
      <svg
        className="progress__text"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="transparent"
          id="circlePath"
          d="
      M 12, 50
      a 40,40 0 1,1 80,0
      40,40 0 1,1 -70,0
    "
        />
        <text>
          <textPath href="#circlePath">scroll to reveal</textPath>
        </text>
      </svg>
      <div className="progress__content" data-progress={progress}></div>
    </Html>
  );
}
