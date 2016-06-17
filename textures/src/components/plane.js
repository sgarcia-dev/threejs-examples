import THREE from 'three';

function createPlane(config) {
	let Colors = config.Colors;
	let Plane = new THREE.Object3D();

	// cockpit
	let cockpitGeometry, cockpitMaterial, cockpitMesh;
	cockpitGeometry = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
	cockpitMaterial = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
	cockpitMesh = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
	cockpitMesh.castShadow = true;
	cockpitMesh.receiveShadow = true;
	Plane.add(cockpitMesh);

	// engine
	let engineGeometry, engineMaterial, engineMesh;
	engineGeometry = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
	engineMaterial = new THREE.MeshPhongMaterial({color: Colors.white, shading: THREE.FlatShading});
	engineMesh = new THREE.Mesh(engineGeometry, engineMaterial);
	engineMesh.position.x = 40;
	engineMesh.castShadow = true;
	engineMesh.receiveShadow = true;
	Plane.add(engineMesh);

	// tail
	let tailGeometry, tailMaterial, tailMesh;
	tailGeometry = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
	tailMaterial = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
	tailMesh = new THREE.Mesh(tailGeometry, tailMaterial);
	tailMesh.position.set(-35, 25, 0);
	tailMesh.castShadow = true;
	tailMesh.receiveShadow = true;
	Plane.add(tailMesh);

	// wing
	let wingGeometry, wingMaterial, wingMesh;
	wingGeometry = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
	wingMaterial = new THREE.MeshPhongMaterial({color: Colors.red, shading: THREE.FlatShading});
	wingMesh = new THREE.Mesh(wingGeometry, wingMaterial);
	wingMesh.castShadow = true;
	wingMesh.receiveShadow = true;
	Plane.add(wingMesh);

	// propeller
	let propellerGeometry, propellerMaterial;
	propellerGeometry = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
	propellerMaterial = new THREE.MeshPhongMaterial({color: Colors.brown, shading: THREE.FlatShading});
	Plane.propeller = new THREE.Mesh(propellerGeometry, propellerMaterial);
	Plane.propeller.castShadow = true;
	Plane.propeller.receiveShadow = true;

	// blades
	let bladeGeometry, bladeMaterial, bladeMesh;
	bladeGeometry = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
	bladeMaterial = new THREE.MeshPhongMaterial({color: Colors.brownDark, shading: THREE.FlatShading});

	bladeMesh = new THREE.Mesh(bladeGeometry, bladeMaterial);
	bladeMesh.position.set(8, 0, 0);
	bladeMesh.castShadow = true;
	bladeMesh.receiveShadow = true;
	Plane.propeller.add(bladeMesh);
	Plane.propeller.position.set(50, 0, 0);
	Plane.add(Plane.propeller);

	// reposition plane
	Plane.scale.set(0.25, 0.25, 0.25);
	Plane.position.y = 100;

	// add position updating functionality
	Plane.updatePosition = function updatePlanePosition(x, y) {
		let targetX, targetY;
		targetX = normalize(x, -1, 1, -100, 100);
		targetY = normalize(y, -1, 1, 25, 175);

		// update the airplane's position
		this.position.y = targetY;
		this.position.x = targetX;
		this.propeller.rotation.x += 0.3;

		function normalize(v, vmin, vmax, tmin, tmax) {
			let nv, dv, pc, dt, tv;
			nv = Math.max(Math.min(v, vmax), vmin);
			dv = vmax - vmin;
			pc = (nv - vmin) / dv;
			dt = tmax - tmin;
			tv = tmin + (pc * dt);
			return tv;
		}
	};

	return Plane;
}

export default {
	createPlane: createPlane
};