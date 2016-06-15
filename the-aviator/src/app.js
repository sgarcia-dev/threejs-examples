import THREE from 'three';

let scene, camera, renderer, container,
	height = window.innerHeight,
	width = window.innerWidth,
	sea;

const ASPECTRATIO = height / width,
	FOV = 60,
	NEARPLANE = 1,
	FARPLANE = 10000,
	COLORS = {
		pink: 0xF5986E,
		red: 0xf25346,
		blue: 0x68c3c0,
		maize: 0xf7d9aa,
		brown: 0x59332e,
		brownDark: 0x23190f,
		white: 0xffffff,
		swissCoffee: 0xd8d0d1,
		whiteTemp: 0xd8d0d1,
		silverChalice: 0xaaaaaa,
		black: 0x000000
	};

function init() {
	createScene();
	createLights();

	// createPlane();
	createSea();
	// createSky();

	start();
}

function createScene() {
	// set up the scene, camera and the renderer
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(COLORS.maize, 100, 950);

	camera = new THREE.PerspectiveCamera(FOV, ASPECTRATIO, NEARPLANE, FARPLANE);
	camera.position.x = 0;
	camera.position.z = 200;
	camera.position.z = 100;

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setSize(width, height);

	container = document.getElementById('world');
	container.appendChild(renderer.domElement);

	window.addEventListener('resize', handleWindowResize, false);

	function handleWindowResize() {
		height = window.innerHeight;
		width = window.innerWidth;
		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}
}

function createLights() {
	// adding lights
	let hemisphereLight, shadowLight;

	hemisphereLight = new THREE.HemisphereLight(COLORS.silverChalice, COLORS.black, 0.9);
	shadowLight = new THREE.DirectionalLight(COLORS.white, 0.9);
	// shadow positioning
	shadowLight.position.set(150, 350, 350);
	// enable shadows and it's positioning
	shadowLight.castShadow = true;
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;
	// shadow resolution
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	// activating the lights
	scene.add(hemisphereLight);
	scene.add(shadowLight);
}

function createSea() {
	function Sea() {
		// creating a cylinder
		let cylinderGeometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
		// rotating the geometry on X
		cylinderGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

		let material = new THREE.MeshPhongMaterial({
			color: COLORS.blue,
			transparent: true,
			opacity: 0.6,
			shading: THREE.FlatShading
		});

		this.mesh = new THREE.Mesh(cylinderGeometry, material);
		this.mesh.receiveShadow = true;
	}
	
	sea = new Sea();
	sea.mesh.position.y = -600;

	scene.add(sea.mesh);
}

function start() {
	renderer.render(scene, camera);
	requestAnimationFrame(start);
}

window.addEventListener('load', init, false);