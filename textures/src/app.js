import THREE from 'three';
let scene,
	camera,
	renderer,
	container,
	canvas,
	components;

let config = {
	fieldOfView: 45,
	nearPlane: 0.1,
	farPlane: 50,
	domContainer: null,
	height: window.innerHeight,
	width: window.innerWidth,
	aspectRatio: window.innerWidth / window.innerHeight
};

function init() {
	initCanvas();

	camera = new THREE.PerspectiveCamera(config.fieldOfView, config.aspectRatio, config.nearPlane, config.farPlane);
	camera.position.z = 60;
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(config.width, config.height);
	// components
	components = createSceneComponents();
	components.lights.forEach(light => scene.add(light));
	scene.add(components.ambientLight);
	scene.add(components.bowl);
	// start render
	container = document.querySelector('#world');
	container.appendChild(renderer.domElement);

	window.scene = scene;
	window.renderer = renderer;
	window.camera = camera;
	renderAnimation();
}

function createSceneComponents() {
	components = {};
	// cube
	let cubeGeometry, cubeMaterial, cubeTexture, cubeMesh;
	cubeGeometry = new THREE.BoxBufferGeometry(200,200,200);
	// load canvas texture
	cubeTexture = new THREE.Texture(canvas);
	cubeTexture.needsUpdate = true;
	cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture });
	cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
	components.cube = cubeMesh;
	// bowl
	let bowlGeometry, bowlMesh;
	bowlMesh = new THREE.Object3D();
	let bowlPoints = [];
	for ( var i = 0; i < 10; i ++ ) {
		bowlPoints.push( new THREE.Vector2( Math.sin( i * 0.21 ) * 10 + 5, ( i - 5 ) * 2 ) );
	}
	bowlGeometry = new THREE.LatheGeometry(bowlPoints, 30, 0, Math.PI*2);
	// bowlMesh.add(new THREE.LineSegments(
	// 	new THREE.WireframeGeometry(bowlGeometry),
	// 	new THREE.LineBasicMaterial({
	// 		color: 0xffffff,
	// 		transparent: true,
	// 		opacity: 0.5
	// 	})
	// ));
	bowlMesh.add(new THREE.Mesh(bowlGeometry, new THREE.MeshPhongMaterial({
		// color: 0xff6289,
		// emissive: 0x072534,
		side: THREE.DoubleSide,
		shading: THREE.FlatShading,
		map: new THREE.TextureLoader().load( '../textures/ipslogo.png' )
	})));
	bowlMesh.rotation.x += 0.5;
	components.bowl = bowlMesh;
	// lights
	let ambientLight, lights;
	ambientLight = new THREE.AmbientLight(0x000000);
	lights = [];
	lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 0 ].position.set( 0, 200, 0 );
	lights[ 1 ].position.set( 100, 200, 100 );
	lights[ 2 ].position.set( - 100, - 200, - 100 );
	components.ambientLight = ambientLight;
	components.lights = lights;
	return components;
}

function initCanvas() {
	let context, texture1, texture2;
	canvas = document.getElementById('myCanvas');
	texture1 = document.getElementById('img1');
	texture2 = document.getElementById('img2');
	context = canvas.getContext('2d');
	context.drawImage(texture1, 0, 0);
	context.drawImage(texture2, 0, 0);
}

function renderAnimation() {
	renderer.render(scene, camera);
	components.bowl.rotation.y += 0.01;
	requestAnimationFrame(renderAnimation);
}

function handleWindowResize() {
	config.height = window.innerHeight;
	config.width = window.innerWidth;
	renderer.setSize(config.width, config.height);
	camera.aspect = config.width / config.height;
	camera.updateProjectionMatrix();
}

window.addEventListener('load', init, false);
window.addEventListener('resize', handleWindowResize, false);