import { WebGLRenderer } from "three";
import { scene } from "./components/scene";
import { ground } from "./components/ground";
import { ambientLight } from "./components/ambient-light";
import { camera } from "./components/camera";
import { leftHand } from "./components/left-hand";
import { rightHand } from "./components/right-hand";

scene.add(ground);
scene.add(ambientLight);
scene.add(camera);
scene.add(leftHand, rightHand);

const renderer = new WebGLRenderer({ antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.xr.enabled = true;

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
  const leftController = renderer.xr.getController(0);
  leftHand.position.copy(leftController.position);
  leftHand.rotation.copy(leftController.rotation);
  const rightController = renderer.xr.getController(1);
  rightHand.position.copy(rightController.position);
  rightHand.rotation.copy(rightController.rotation);
});

window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.onclick = async () => {
  if (navigator.xr) {
    const mode = "immersive-vr";
    const options = {
      optionalFeatures: [
        "local",
        "local-floor",
        "viewer",
        "anchor",
        "depth-sensing",
        "layers",
      ],
    };
    const session = await navigator.xr.requestSession(mode, options);
    await renderer.xr.setSession(session);
  }
};
