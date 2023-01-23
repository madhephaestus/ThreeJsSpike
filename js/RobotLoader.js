import { OrbitControls } from './OrbitControls.js'; 
import { STLLoader } from './STLLoader.js'
import { GUI } from './lil-gui.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
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

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const fingers=3;
const bellows=2;
const type="T";
const circular=false;
const seperationDist = 60;

var mesh 
const material = new THREE.MeshPhongMaterial( { color: 0x0000FF } );
const loader = new STLLoader()
loader.load(
    '../assets/fingertip.stl',
    function (geometry) {
        mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        start()
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

camera.position.set( 0, 0, 100 );
const controls = new OrbitControls( camera, renderer.domElement );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
function render() {
    renderer.render(scene, camera)
}

function start() {
        animate();
}
function animate() {
	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	
	//cube.rotation.x += 0.01;
	mesh.rotation.z += 0.01;
	render();
};

window.addEventListener('resize', onWindowResize, false)
