import {
  AmbientLight,
  BoxGeometry,
  Color,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "https://cdn.jsdelivr.net/npm/three@0.177.0/+esm";

// Scene, Camera, Renderer
const scene = new Scene();
scene.background = new Color(0x222233);

const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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

// // Animation Loop
// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
renderer.render(scene, camera);
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Basic interaction: click to change cube color
renderer.domElement.addEventListener("click", () => {
  cube.material.color.set(Math.random() * 0xffffff);
});
