import THREE from 'three';

function createSea(color) {
	var geom = new THREE.CylinderGeometry(600,600,800,40,10);
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	var mat = new THREE.MeshPhongMaterial({
		color: color,
		transparent:true,
		opacity:.6,
		shading:THREE.FlatShading
	});

	let mesh = new THREE.Mesh(geom, mat);
	mesh.receiveShadow = true;
	mesh.position.y = -600;
	return mesh;
}

function Sea(color){
	var geom = new THREE.CylinderGeometry(600,600,800,40,10);
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	var mat = new THREE.MeshPhongMaterial({
		color: color,
		transparent:true,
		opacity:.6,
		shading:THREE.FlatShading
	});

	let mesh = new THREE.Mesh(geom, mat);
	mesh.receiveShadow = true;
}

export default {
	createSea: createSea
};