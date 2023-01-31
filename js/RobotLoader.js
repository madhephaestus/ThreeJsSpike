import { OrbitControls } from './OrbitControls.js';
import { STLLoader } from './STLLoader.js'
import { GUI } from './lil-gui.module.min.js';
import { DHStep } from './DHChain.js';
import { DHChain } from './DHChain.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

scene.add(new THREE.AxesHelper(5))
const light2 = new THREE.SpotLight()
light2.position.set(100, 100, 100)
scene.add(light2)

const light3 = new THREE.SpotLight()
light3.position.set(-100, 100, 100)
scene.add(light3)

const light4 = new THREE.SpotLight()
light4.position.set(100, -100, 100)
scene.add(light4)

const light = new THREE.SpotLight()
light.position.set(-100, -100, 100)
scene.add(light)

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const fingers = 3;
const bellows = 2;
const type = "T";
const circular = false;
const seperationDist = 60;
const fingerList = [];

for (let j = 0; j < fingers; j += 1) {
	var links = [];
	links.push(new DHStep(20, 0, 0, 0))
	for (let i = 0; i < bellows; i += 1) {
		links.push(new DHStep(30, 0, 0, 0))
	}
	links.push(new DHStep(40, 0, 0, 0))
	fingerList.push(new DHChain(new THREE.Matrix4(), new THREE.Matrix4(), links))
}
var tip, rib, base
const material = new THREE.MeshPhongMaterial({ color: 0x0000FF });
const loader = new STLLoader()
let startState = [];
for (let i = 0; i < 3; i += 1) {
	startState.push(false);
}
loader.load(
	'../assets/fingertip.stl',
	function(geometry) {
		tip = new THREE.Mesh(geometry, material)
		scene.add(tip)
		start(0)
	},
	(xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
	},
	(error) => {
		console.log(error)
	}
)
loader.load(
	'../assets/fingerRib.stl',
	function(geometry) {
		rib = new THREE.Mesh(geometry, material)
		scene.add(rib)
		start(1)
	},
	(xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
	},
	(error) => {
		console.log(error)
	}
)
loader.load(
	'../assets/fingerBase.stl',
	function(geometry) {
		base = new THREE.Mesh(geometry, material)
		scene.add(base)
		start(2)
	},
	(xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
	},
	(error) => {
		console.log(error)
	}
)

camera.position.set(0, 0, 100);
const controls = new OrbitControls(camera, renderer.domElement);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	render()
}
function render() {
	renderer.render(scene, camera)
}

function start(myIndex) {
	startState[myIndex] = true;
	for (let i = 0; i < 3; i += 1) {
		if (!startState[i])
			return
	}
	animate();
}
function animate() {
	requestAnimationFrame(animate);

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	//cube.rotation.x += 0.01;
	tip.rotation.z += 0.01;
	rib.rotation.y += 0.01;
	base.rotation.x += 0.01;

	render();
};

window.addEventListener('resize', onWindowResize, false)
