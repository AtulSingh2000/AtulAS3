import './style.css'
// import three.js in script
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// create a scene
const scene = new THREE.Scene();

const near = 2;
const far = 10;
//const fogColor = 0xc3f9ff;
//scene.fog = new THREE.Fog(0xc3f9ff, near, far);
scene.background = new THREE.Color(0xc3f9ff);

// scene.background = new THREE.Color( 0xefd1b5 );
// 				scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );

// create a camera
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);

// create a renderer for threejs
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

// set resolution
renderer.setSize(window.innerWidth, window.innerHeight);
// add to html page body
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  let aspectRatio = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
});

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// scene lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);
light.castShadow = true;

// create box geometry (like mesh filter in unity)
let geometry = new THREE.BoxGeometry();
// create simple/unlit material
let material = new THREE.MeshPhongMaterial({ color: GetRandomColor() });
// create a cube object with our mesh and material
let cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;

// add ground plane
// let planeGeometry = new THREE.PlaneGeometry(5, 5);
// let planeMaterial = new THREE.MeshPhongMaterial({ color: GetRandomColor() });
// let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// planeMesh.castShadow = true;
// planeMesh.receiveShadow = true;
// planeMesh.position.y = -2;

// planeMesh.rotation.x = 93;

// // add it to scene
// scene.add(planeMesh);
// planeMesh.add(cube);
// cube.position.z = 1;

// load custom file
const loader = new GLTFLoader();

loader.load(
  "three/examples/models/gltf/Duck/glTF-Binary/Duck.glb",
  function (loadedModel) {
    scene.add(loadedModel.scene);
  },
  undefined,
  function (error) {
    console.log(error);
  }
);

var chair;
loader.load(
    "models/chair.gltf",
    function (loadedModel) {
      chair = loadedModel.scene;
      chair.position.set(0,1,1);
      scene.add(chair);
    },
    undefined,
    function (error) {
      console.log(error);
    }
  );

// push back camera so we can see the cube, by default both are at zero
camera.position.z = 7;

function GetRandomColor() {
  const randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

  return randomColor;
}

const animate = function () {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  // render the scene with our camera
  renderer.render(scene, camera);

  // runs 60 times each seconds
  requestAnimationFrame(animate);
};

// start game loop
animate();
