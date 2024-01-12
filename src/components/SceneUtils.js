// sceneUtils.js
import { useState, useRef } from "react";
import * as THREE from "three";

export const useSceneUtils = (PageCoordinates) => {
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const percentage = parseInt(Math.min(100, Math.max(0, offset * 100)));

  const updateCameraPosition = (state, offset, PageCoordinates) => {
    const newCurrentPage = Math.floor(offset * PageCoordinates.length);
    const clampedPage =
      newCurrentPage >= PageCoordinates.length - 1
        ? newCurrentPage - 1
        : newCurrentPage;

    setCurrentPage(clampedPage);

    const targetPosition = PageCoordinates[currentPage];

    state.camera.position.lerp(targetPosition, 0.03);
  };

  const handleMouseMove = (state) => {
    const mouseX = -state.mouse.x * 1.5 - 1;
    const mouseY = -state.mouse.y * 1.5 - 1;

    state.camera.position.lerp(
      new THREE.Vector3(mouseX, mouseY, state.camera.position.z),
      0.1
    );
    state.camera.lookAt(0, -1, 0);
  };

  const updateLightTarget = (state) => {
    const enableMove =
      currentPage === 0 || currentPage === PageCoordinates.length - 1;

    state.light.current.target.position.lerp(
      new THREE.Vector3().set(
        ((enableMove ? state.mouse.x : 0) * state.viewport.width) / 2,
        ((enableMove ? state.mouse.y : 0) * state.viewport.height) / 2,
        0
      ),
      0.1
    );
    state.light.current.target.updateMatrixWorld();
  };

  return {
    offset,
    setOffset,
    currentPage,
    percentage,
    updateCameraPosition,
    handleMouseMove,
    updateLightTarget,
  };
};
