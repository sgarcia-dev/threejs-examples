import Scene from './components/scene';
import Camera from './components/camera';
import Renderer from './components/renderer';

import lights from './components/lights';
import Sea from './components/sea';
import Sky from './components/sky';
import Plane from './components/plane';

let scene,
	camera,
	renderer,
	components;

let config = {
	fieldOfView: 60,
	nearPlane: 1,
	farPlane: 10000,
	domContainer: null,
	height: window.innerHeight,
	width: window.innerWidth,
	aspectRatio: window.innerWidth / window.innerHeight,
	Colors: {
		red: 0xf25346,
		white: 0xd8d0d1,
		brown: 0x59332e,
		pink: 0xF5986E,
		brownDark: 0x23190f,
		blue: 0x68c3c0
	},
	mousePosition: {x: 0, y: 0}
};

function init() {
	config.domContainer = document.getElementById('world');

	// initialize main components
	camera = Camera.createCamera(config.fieldOfView, config.aspectRatio, config.nearPlane, config.farPlane);
	renderer = Renderer.createRenderer(config.width, config.height);
	components = createSceneComponents();
	scene = Scene.createScene();
	// add content onto scene
	lights.lights.forEach(light => scene.add(light));
	scene.add(components.sea);
	scene.add(components.sky);
	scene.add(components.plane);
	// allow debugging
	window.scene = scene;

	config.domContainer.appendChild(renderer.domElement);

	renderAnimation();
}

function createSceneComponents() {
	let components = {};
	components.sea = Sea.createSea(config.Colors.blue);
	components.sky = Sky.createSky(config.Colors.white);
	components.plane = Plane.createPlane(config);
	return components;
}

function renderAnimation() {
	// animate elements
	components.sea.rotation.z += 0.005;
	components.sky.rotation.z += 0.01;
	components.plane.propeller.rotation.x += 0.3;
	renderer.render(scene, camera);
	requestAnimationFrame(renderAnimation);
}

function handleWindowResize() {
	config.height = window.innerHeight;
	config.width = window.innerWidth;
	renderer.setSize(config.width, config.height);
	camera.aspect = config.width / config.height;
	camera.updateProjectionMatrix();
}

function handleMouseMove(e) {
	let xPosition, yPosition;
	// conversion of position to normalized values of -1 and 1
	xPosition = -1 + (e.clientX / config.width) * 2;
	// for the vertical axis, we need to inverse the formula because the 2D y-axis goes the opposite direction of the 3D y-axis
	yPosition = 1 - (e.clientY / config.height) * 2;
	config.mousePosition = {x: xPosition, y: yPosition};

	components.plane.updatePosition(config.mousePosition.x, config.mousePosition.y);
}

window.addEventListener('mousemove', handleMouseMove, false);
window.addEventListener('load', init, false);
window.addEventListener('resize', handleWindowResize, false);