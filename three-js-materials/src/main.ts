import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'lil-gui'

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
document.body.appendChild(renderer.domElement);

// Controls for both cameras
let controls = new OrbitControls(perspectiveCamera, renderer.domElement);

/////////// OBJECTS ////////////

// PLANE
 const planegeometry = new THREE.PlaneGeometry(5,5);
 const planematerial = new THREE.MeshBasicMaterial({
    color: 0x00ff00, // Grün
    wireframe: false // Drahtgitterdarstellung

 });
 const plane1 = new THREE.Mesh(planegeometry, planematerial);
 plane1.position.set(-20, 0, 0);

 plane1.rotation.x = -Math.PI / 2;
 scene.add(plane1);

 
// PLANE 2
 const planegeometry2 = new THREE.PlaneGeometry(5,5);
 const planematerial2 = new THREE.MeshStandardMaterial({
    color: 0xff0000, // Rot
    metalness: 0.7, // Metallischer Glanz
    roughness: 0.3 // Oberfläche mit wenig Rauheit


 });
 const plane2 = new THREE.Mesh(planegeometry2, planematerial2);
 plane2.position.set(-15, 0, 0);

 plane2.rotation.x = -Math.PI / 2;
 scene.add(plane2);

 // PLANE 3
 const planegeometry3 = new THREE.PlaneGeometry(5,5);
 const planematerial3 = new THREE.MeshPhongMaterial({
    color: 0x0000ff, // Blau
    shininess: 100, // Starke Glanzlichter
    specular: 0x888888 // Farbe der Reflexionen

 });
 const plane3 = new THREE.Mesh(planegeometry3, planematerial3);
 plane3.position.set(-10, 0, 0);

 plane3.rotation.x = -Math.PI / 2;
 scene.add(plane3);

 // PLANE 4
 const planegeometry4 = new THREE.PlaneGeometry(5,5);
 const planematerial4 = new THREE.MeshLambertMaterial({
    color: 0xffff00 // Gelb

 });
 const plane4 = new THREE.Mesh(planegeometry4, planematerial4);
 plane4.position.set(-5, 0, 0);

 plane4.rotation.x = -Math.PI / 2;
 scene.add(plane4);

 // PLANE 5
 const planegeometry5 = new THREE.PlaneGeometry(5,5);
 const planematerial5 = new THREE.MeshPhysicalMaterial({
    color: 0xff00ff, // Pink
    metalness: 0.9, 
    roughness: 0.1, 
    clearcoat: 1.0, // Extra Glanzschicht
    clearcoatRoughness: 0.2

 });
 const plane5 = new THREE.Mesh(planegeometry5, planematerial5);
 plane5.position.set(0, 0, 0);

 plane5.rotation.x = -Math.PI / 2;
 scene.add(plane5);

 // PLANE 6
const loader = new THREE.TextureLoader();
const woodColorMap = loader.load('./assets/pictures/wood_floor_worn_diff_1k.png');
const woodNormalMap = loader.load('./assets/pictures/wood_floor_worn_nor_gl_1k.png');
const woodRoughnessMap = loader.load('./assets/pictures/wood_floor_worn_rough_1k.png');
const woodMetalnessMap = loader.load('./assets/pictures/wood_floor_worn_arm_1k.png');
const woodDisplacementMap = loader.load('./assets/pictures/wood_floor_worn_disp_1k.png');

woodColorMap.wrapS = THREE.RepeatWrapping;
woodColorMap.wrapT = THREE.RepeatWrapping;

woodColorMap.repeat.set(5, 5); // 4x4 Wiederholungen

const geometry = new THREE.PlaneGeometry(25, 25, 128, 128); // hohe Auflösung für Displacement
const material = new THREE.MeshStandardMaterial({
  map: woodColorMap,
  normalMap: woodNormalMap,
  roughnessMap: woodRoughnessMap,
  metalnessMap: woodMetalnessMap,
  displacementMap: woodDisplacementMap,
  displacementScale: 0.2, // Tiefe der Verformung
  metalness: 1.0,         // Fallback, falls Map fehlt
  roughness: 1.0
});

const plane6 = new THREE.Mesh(geometry, material);
plane6.rotation.x = -Math.PI / 2; // Als Bodenfläche
plane6.receiveShadow = true;
plane6.position.set(-10, 0, 15);
scene.add(plane6);

/////////// LIGHTNING ////////////

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Add a soft ambient light for base illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Add a strong directional light from the top right
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(5, 10, 7);
dirLight.position.set(1, 1, 1);
dirLight.castShadow = true;
scene.add(dirLight);

// Point Lights setup
const pointLight1 = new THREE.PointLight(0xffffff, 50, 50);
pointLight1.castShadow = true
pointLight1.position.set(-15, 3, 0);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 50, 50);
pointLight2.castShadow = true
pointLight2.position.set(0, 3, 0);
scene.add(pointLight2);

// const pointLight2 = new THREE.PointLight(0xff0000, 50, 0);
// pointLight2.castShadow = true
// pointLight2.position.set(10, 2, 0);
// scene.add(pointLight2);

// Spotlight setup
// const spotLight = new THREE.SpotLight(0xffffff, 20); // Farbe, Intensität
// spotLight.position.set(2, 5, 2); // Position über dem Objekt
// spotLight.angle = Math.PI / 3;  // Lichtkegel
// spotLight.penumbra = 0.2;       // Weiche Kanten
// spotLight.decay = 2;            // Lichtabfall mit Entfernung
// spotLight.distance = 60;        // Wie weit das Licht reicht

// spotLight.castShadow = true;
// scene.add(spotLight)

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    // Animate the ball to circle around the cube
    const time = performance.now() * 0.001; // seconds
    controls.update();
    renderer.render(scene, activeCamera);
}


// Beispielmaterial und Mesh
const guimaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.5, metalness: 0.5 });
const guimesh = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), guimaterial);
guimesh.position.set(-10, 1.5,-3);
scene.add(guimesh); // Hier wird das Mesh zur Szene hinzugefügt


// GUI setup
const gui = new GUI();

const materialParams = {
    color: guimaterial.color.getHex(),
    roughness: guimaterial.roughness,
    metalness: guimaterial.metalness,
    wireframe: guimaterial.wireframe
};

 
const materialFolder = gui.addFolder('Material');
materialFolder.addColor(materialParams, 'color').onChange(value => {
    guimaterial.color.setHex(value);
});
materialFolder.add(materialParams, 'roughness', 0, 1).onChange(value => {
    guimaterial.roughness = value;
});
materialFolder.add(materialParams, 'metalness', 0, 1).onChange(value => {
    guimaterial.metalness = value;
});
materialFolder.add(materialParams, 'wireframe').onChange(value => {
    guimaterial.wireframe = value;
});

materialFolder.open();



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
