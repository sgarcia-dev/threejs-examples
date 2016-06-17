import THREE from 'three';

function createCamera(fieldOfView, aspectRatio, nearPlane, farPlane) {
	let camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
	);
	
	camera.position.x = 0;
	camera.position.z = 200;
	camera.position.y = 100;

	return camera;
}

export default {
	createCamera: createCamera
};