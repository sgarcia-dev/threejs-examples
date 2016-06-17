import THREE from 'three';

function createRenderer(width, height) {
	let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	return renderer;
}

export default {
	createRenderer: createRenderer
};