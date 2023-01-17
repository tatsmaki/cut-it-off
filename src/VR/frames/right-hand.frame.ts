import { Matrix4 } from "three";
import { XrController } from "../../controllers/xr.controller";
import { renderer } from "../../renderer";
import { boxes } from "../components/boxes";
import { raycaster } from "../components/raycaster";
import { rightHand } from "../components/right-hand";

const matrix4 = new Matrix4();

export const rightHandFrame = (xrController: XrController) => {
  const rightControllerGrip = renderer.xr.getControllerGrip(1);
  const { position, rotation, matrixWorld } = rightControllerGrip;
  rightHand.position.copy(position);
  rightHand.rotation.copy(rotation);

  matrix4.identity().extractRotation(matrixWorld);
  raycaster.ray.origin.setFromMatrixPosition(matrixWorld);
  raycaster.ray.direction.applyMatrix4(matrix4);
  const [intersection] = raycaster.intersectObject(boxes, true);

  if (intersection) {
    intersection.object.removeFromParent();
    xrController.makePulse();
  }
  xrController.makePulse();
};
