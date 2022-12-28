import { CylinderGeometry, Group, Mesh, MeshLambertMaterial } from "three";
import { degToRad } from "three/src/math/MathUtils";

const geometry = new CylinderGeometry(0.1, 0.1, 0.5);
const material = new MeshLambertMaterial({ color: "red" });

const mesh = new Mesh(geometry, material);
mesh.rotateX(degToRad(45));

export const rightHand = new Group().add(mesh);
