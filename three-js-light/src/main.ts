import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene, Cameras, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222233);

/////////// CAMERAS ////////////

// Perspective Camera
const perspectiveCamera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
perspectiveCamera.position.set(0, 0, 10); // Move camera closer
perspectiveCamera.lookAt(0, 0, 0);

// Orthographic Camera
const aspect = window.innerWidth / window.innerHeight;
const d = 5;
const orthoCamera = new THREE.OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    0.1,
    1000
);
// const orthoCamera = new THREE.OrthographicCamera(
//   -aspect,
//   aspect,
//   1,
//   -1,
//   0.1,
//   1000
// );
orthoCamera.position.set(0, 0, 10);
orthoCamera.lookAt(0, 0, 0);

// Camera Helpers
const perspectiveHelper = new THREE.CameraHelper(perspectiveCamera);
scene.add(perspectiveHelper);
const orthoHelper = new THREE.CameraHelper(orthoCamera);
scene.add(orthoHelper);
orthoHelper.visible = false; // Hide orthographic helper by default

// Set active camera (switch between these two for demo)
let activeCamera: THREE.Camera = perspectiveCamera;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Controls for both cameras
let controls = new OrbitControls(perspectiveCamera, renderer.domElement);

/////////// OBJECTS ////////////

// CUBE
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff99,
    metalness: 0.5,
    roughness: 0.15,
});

const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true; // Enable shadow casting for the cube
cube.position.set(0, 0, 0); // Ensure cube is at origin

// PLANE
const planegeometry = new THREE.PlaneGeometry(20,20);
const planematerial = new THREE.MeshStandardMaterial({
    color: 0x00ff99,
    metalness: 0.5,
    roughness: 0.15,
});
const plane = new THREE.Mesh(planegeometry, planematerial);
plane.position.set(0, -0.5, 0); // Ensure cube is at origin
plane.receiveShadow = true;

plane.rotation.x = -Math.PI / 2;

scene.add(plane);

// Add visible edges to the cube
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
);
cube.add(line);
scene.add(cube);

// BALL
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x3366ff,
    metalness: 0.8,
    roughness: 0.3,
});
const ball = new THREE.Mesh(sphereGeometry, sphereMaterial);
ball.position.set(2, 0, -5); // Place ball behind the cube along the z-axis
ball.castShadow = true; // Enable shadow casting for the ball
scene.add(ball);

/////////// LIGHTNING ////////////

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Add a soft ambient light for base illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Add a strong directional light from the top right
// const dirLight = new THREE.DirectionalLight(0xffffff, 2);
// dirLight.position.set(5, 10, 7);
// dirLight.castShadow = true;
// scene.add(dirLight);

// Point Light setup
// const pointLight1 = new THREE.PointLight(0x00ff1a, 50, 0);
// pointLight1.castShadow = true
// pointLight1.position.set(-10, 2, 0);
// scene.add(pointLight1);

// const pointLight2 = new THREE.PointLight(0xff0000, 50, 0);
// pointLight2.castShadow = true
// pointLight2.position.set(10, 2, 0);
// scene.add(pointLight2);

const spotLight = new THREE.SpotLight(0xffffff, 20); // Farbe, Intensität
spotLight.position.set(2, 5, 2); // Position über dem Objekt
spotLight.angle = Math.PI / 3;  // Lichtkegel
spotLight.penumbra = 0.2;       // Weiche Kanten
spotLight.decay = 2;            // Lichtabfall mit Entfernung
spotLight.distance = 60;        // Wie weit das Licht reicht

spotLight.castShadow = true;
scene.add(spotLight)

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    // Animate the ball to circle around the cube
    const time = performance.now() * 0.001; // seconds
    const radius = 5;
    ball.position.x = Math.cos(time) * radius;
    ball.position.z = Math.sin(time) * radius;
    controls.update();
    renderer.render(scene, activeCamera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
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
window.addEventListener('keydown', (e) => {
    if (e.key === 'c') {
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
            controls = new OrbitControls(
                perspectiveCamera,
                renderer.domElement
            );
        }
    }
});
// By default, perspectiveCamera is active. Press 'c' to switch to orthographicCamera and back.
