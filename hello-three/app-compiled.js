"use strict";

var scene = void 0,
    camera = void 0,
    renderer = void 0,
    cube = void 0;

function init() {
    scene = new THREE.Scene();
    // creates camera using FOV, aspect ratio, and near and far clipping pane, or render distance
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // create renderer and it's dimensions
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // create a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1),
        material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // adjust camera position
    camera.position.z = 5;

    // insert renderer into document body
    document.body.appendChild(renderer.domElement);
}

// start rendering
function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    renderer.render(scene, camera);
}

init();
render();

//# sourceMappingURL=app-compiled.js.map