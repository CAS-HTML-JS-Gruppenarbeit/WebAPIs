import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const {
  Scene,
  PerspectiveCamera,
  OrthographicCamera,
  CameraHelper,
  WebGLRenderer,
  Color,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  AmbientLight,
  PointLight,
} = THREE;

// Scene, Cameras, Renderer
const scene = new Scene();
scene.background = new Color(0x222233);

// Perspective Camera
const perspectiveCamera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
perspectiveCamera.position.set(5, 5, 5);
perspectiveCamera.lookAt(0, 0, 0);

// Orthographic Camera
const aspect = window.innerWidth / window.innerHeight;
const d = 5;
const orthoCamera = new OrthographicCamera(
  -d * aspect,
  d * aspect,
  d,
  -d,
  0.1,
  1000
);
orthoCamera.position.set(5, 5, 5);
orthoCamera.lookAt(0, 0, 0);

// Camera Helpers
const perspectiveHelper = new CameraHelper(perspectiveCamera);
scene.add(perspectiveHelper);
const orthoHelper = new CameraHelper(orthoCamera);
scene.add(orthoHelper);
orthoHelper.visible = false; // Hide orthographic helper by default

// Set active camera (switch between these two for demo)
let activeCamera: THREE.Camera = perspectiveCamera;

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls for both cameras
let controls = new OrbitControls(perspectiveCamera, renderer.domElement);

// Geometry, Material, Mesh
const geometry = new BoxGeometry();
const material = new MeshStandardMaterial({ color: 0x00ff99 });
const cube = new Mesh(geometry, material);
scene.add(cube);

// Add visible edges to the cube
const edges = new EdgesGeometry(geometry);
const line = new LineSegments(
  edges,
  new LineBasicMaterial({ color: 0x000000, linewidth: 2 })
);
cube.add(line);

// Lighting
const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, activeCamera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  const aspect = window.innerWidth / window.innerHeight;
  perspectiveCamera.aspect = aspect;
  perspectiveCamera.updateProjectionMatrix();
  orthoCamera.left = -d * aspect;
  orthoCamera.right = d * aspect;
  orthoCamera.top = d;
  orthoCamera.bottom = -d;
  orthoCamera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Press 'c' to switch cameras for demonstration
window.addEventListener("keydown", (e) => {
  if (e.key === "c") {
    if (activeCamera === perspectiveCamera) {
      activeCamera = orthoCamera;
      perspectiveHelper.visible = false;
      orthoHelper.visible = true;
      controls.dispose();
      controls = new OrbitControls(orthoCamera, renderer.domElement);
    } else {
      activeCamera = perspectiveCamera;
      perspectiveHelper.visible = true;
      orthoHelper.visible = false;
      controls.dispose();
      controls = new OrbitControls(perspectiveCamera, renderer.domElement);
    }
  }
});
// By default, perspectiveCamera is active. Press 'c' to switch to orthographicCamera and back.
