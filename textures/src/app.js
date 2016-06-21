import THREE from 'three';

// camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.z = 30;
// renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// lights
var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);
var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);
lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);
scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);
// bowl
var mesh = new THREE.Object3D()
var points = [];
for (var i = 0; i < 10; i++) {
	points.push(new THREE.Vector2(Math.sin(i * 0.21) * 10 + 1, ( i - 1 ) * 2));
}
var data = {
	segments: 30,
	phiStart: 0,
	phiLength: Math.PI * 2,
};
var geometry = new THREE.LatheGeometry(points, data.segments, data.phiStart, data.phiLength);
// mesh.add(new THREE.LineSegments(
// 	new THREE.WireframeGeometry(geometry),
//
// 	new THREE.LineBasicMaterial({
// 		color: 0xffffff,
// 		transparent: true,
// 		opacity: 0.5
// 	})
// ));
// texture

mesh.add(new THREE.Mesh(
	geometry,
	new THREE.MeshPhongMaterial({
		// color: 0xff6289,
		// emissive: 0x072534,
		side: THREE.DoubleSide,
		shading: THREE.FlatShading,
		map: new THREE.TextureLoader().load('../textures/ipslogo.png')
	})
));
mesh.rotation.x += 0.5;
scene.add(mesh);
var getImageData = false;
var imgData;

function render() {
	requestAnimationFrame(render);
	//mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.012;
	mesh.rotation.x += 0.012;
	renderer.render(scene, camera);
	if (getImageData == true) {
		imgData = renderer.domElement.toDataURL();
		getImageData = false;
	}
}
render();


/*** ADDING SCREEN SHOT ABILITY ***/
window.addEventListener("keyup", function (e) {
	var imgNode;
	//Listen to 'P' key
	if (e.which !== 80) return;
	try {
		getImageData = true;
		render();
		console.log(imgData);
	}
	catch (e) {
		console.log("Browser does not support taking screenshot of 3d context");
		return;
	}
	imgNode = document.createElement("img");
	imgNode.src = imgData;
	document.body.appendChild(imgNode);
});
