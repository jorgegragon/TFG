
function init() {
    var scene = new THREE.Scene();
    var sceneWidth = window.innerWidth;
    var sceneHeight = window.innerHeight;
    scene.background = new THREE.Color(0x2a3b4c);

    var camera = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight, 0.01, 100);
    camera.position.x = 0;
    camera.position.y = -40;
    camera.position.z = 40;
    camera.lookAt(scene.position);

    var floor = getFloor();

    scene.add(floor);

    var renderer = new THREE.WebGLRenderer({
       antialias : true
    });

	 const controls = new THREE.OrbitControls( camera, renderer.domElement );
	 //controls.minDistance = 1;
	 //controls.maxDistance = 20;
    //controls.enableZoom = false;
    //controls.enableRotate = false;
    //controls.enableDamping = true;
    //controls.dampingFactor = 0.5;
    //controls.maxPolarAngle = Math.PI;

    renderer.setSize(sceneWidth, sceneHeight);
    document.body.appendChild(renderer.domElement);

    animate(renderer, scene, camera);
 }


 function animate(renderer, scene, camera) {

    renderer.render(scene, camera);

    requestAnimationFrame(function() {
       animate(renderer, scene, camera);
    });
 }

 function getFloor() {
    var geometry = new THREE.PlaneGeometry(40, 40);
    var material = new THREE.MeshBasicMaterial({
       color : 0xAAAAAA
    });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
 }
