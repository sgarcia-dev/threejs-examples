import THREE from 'three';

function createScene() {
	let scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0xf7d9aa, 100,950);
	return scene;
}

export default {
	createScene: createScene
};