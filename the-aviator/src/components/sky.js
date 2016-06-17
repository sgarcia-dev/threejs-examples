import THREE from 'three';

function createCloud(cloudColor) {
	let cloudMesh, cloudPartGeometry, cloudMaterial;
	cloudMesh = new THREE.Object3D();
	cloudPartGeometry = new THREE.BoxGeometry(20, 20, 20);
	cloudMaterial = new THREE.MeshPhongMaterial({
		color: cloudColor
	});
	// decide how many cloud parts each cloud is made of
	let nBlocks = 3 + Math.floor(Math.random() * 3);
	for (let i = 0; i < nBlocks; i++) {
		let cloudPartMesh = new THREE.Mesh(cloudPartGeometry, cloudMaterial);
		// enable shadows;
		cloudPartMesh.castShadow = true;
		cloudPartMesh.receiveShadow = true;
		// set the position and the rotation of each cube randomly
		cloudPartMesh.position.x = i * 15;
		cloudPartMesh.position.y = Math.random() * 10;
		cloudPartMesh.position.z = Math.random() * 10;
		cloudPartMesh.rotation.z = Math.random() * Math.PI * 2;
		cloudPartMesh.rotation.y = Math.random() * Math.PI * 2;
		// set size randomly
		let newSize = 0.1 + Math.random() * 0.9;
		cloudPartMesh.scale.set(newSize, newSize, newSize);

		cloudMesh.add(cloudPartMesh);
	}
	return cloudMesh;
}

function createSky(cloudColor) {
	let skyMesh, cloudNumber, stepAngle;

	skyMesh = new THREE.Object3D();
	cloudNumber = 20;
	// uniform angle required to place cloud consistently
	stepAngle = Math.PI * 2 / cloudNumber;
	// create the clouds
	for (let i = 1; i < cloudNumber; i++) {
		let angle, height, scale;
		let cloud = createCloud(cloudColor);
		// set scale, rotation and position with some trigonometry
		scale = 1 + Math.random() * 2;
		angle = stepAngle * i;
		height = 750 + Math.random() * 200;

		cloud.scale.set(scale, scale, scale);
		cloud.position.y = Math.sin(angle) * height;
		cloud.position.x = Math.cos(angle) * height;
		cloud.position.z = -400 - Math.random() * 400;
		cloud.rotation.z = angle + Math.PI / 2;

		skyMesh.add(cloud);
	}
	skyMesh.position.y = -600;
	return skyMesh;
}

export default {
	createSky: createSky
};