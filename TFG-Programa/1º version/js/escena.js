var start = false;
var resultado = "Hola";
var stepX = 0.15;
var stepY = 0.3;
var contador = 0;

function init() {
    var scene = new THREE.Scene();
    var sceneWidth = window.innerWidth;
    var sceneHeight = window.innerHeight;
    
    var camera = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight, 0.01, 100);
    camera.position.x = 0;
    camera.position.y = -40;
    camera.position.z = 40;
    camera.lookAt(scene.position);

    var floor = getFloor();
    var box = getBox();
    box.position.y = 10;

    var box1 = getBox();
    box1.position.x = 10;
    box1.position.y = -10;

    var box2 = getBox();
    box2.position.x = -10;
    box2.position.y = -10;

    var sphere = getSphere();
    sphere.position.y = -10;
	 sphere.position.x = -10;

    scene.add(floor);
    scene.add(box);
    scene.add(box1);
    scene.add(box2);
    scene.add(sphere);

    var renderer = new THREE.WebGLRenderer({
       antialias : true
    });

    renderer.setSize(sceneWidth, sceneHeight);
    document.body.appendChild(renderer.domElement);

    animate(sphere, renderer, scene, camera);

    document.onkeydown = function (ev) {
      switch (ev.keyCode) {
        case 32:
            start = true;
            resultado = "Inicio";      
            document.getElementById("marcadores").innerHTML = resultado;
            break;
        default:
          console.log("Tecla no contemplada.");
          break;
        }
    }
 }


 function animate(sphere, renderer, scene, camera) {

   if (start) {
      resultado = ("Empezamos...");
      document.getElementById("marcadores").innerHTML = resultado;

      if (sphere.position.y > 10){ // Proxy
         sphere.position.x = 0;
         sphere.position.y = 10;
         if (contador == 2 || contador == 3){
            stepX = 0.15;
            stepY = -0.3;
            console.log ("Proxy-Server");
         }else{
               stepX = -0.15;
               stepY = -0.3;
               console.log ("Proxy-Cliente");
         }
         contador += 1;
      }

      if (sphere.position.y < -10 & sphere.position.x < -5){ // Cliente
         if (contador == 2){
            sphere.position.x = 10;
            sphere.position.y = -10;
            stepX = -0.15;
            stepY = 0.3;
            console.log ("Servidor-Proxy");
         }else{
            sphere.position.x = -10;
            sphere.position.y = -10;
            stepX = 0.15;
            stepY = 0.3;
            console.log ("Cliente-Proxy");
         }
      }

      if (sphere.position.y < -10 & sphere.position.x > 5){ // Servidor
            if (contador == 4) {
               stepX = -0.15;
               stepY = 0.3;
               sphere.position.x = 10;
               sphere.position.y = -10;
               console.log ("2222"); 
            } else {
               stepX = 0.15;
               stepY = 0.3;
               sphere.position.x = -10;
               sphere.position.y = -10;
               console.log ("1111");  
            }
            
      }

      sphere.position.x += stepX;
      sphere.position.y += stepY;
   }
    
    renderer.render(scene, camera);

    requestAnimationFrame(function() {
       animate(sphere, renderer, scene, camera);
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

 function getBox() {
    var geometry = new THREE.BoxGeometry(3, 2, 8);
    var material = new THREE.MeshBasicMaterial({
       color : 0x0000ff
    });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
 }

 function getSphere() {
   var geometry = new THREE.SphereGeometry(0.5, 20, 20);
   var material = new THREE.MeshNormalMaterial();
   var mesh = new THREE.Mesh(geometry, material);
   mesh.position.z = 0.5;
   mesh.castShadow = true;
   mesh.name = "sphere";

   return mesh;
 }