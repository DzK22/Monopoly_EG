function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  return scene;
}

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 2000);
  camera.position.set(0, 3.2, 2.5);
  camera.rotation.x = -0.6;
  return camera;
}

function getLight(scene) {
  var light = new THREE.PointLight("rgb(154, 151, 150)", 1, 0);
  light.position.set(1, 7, 0);
  scene.add(light);

  var light2 = new THREE.PointLight("rgb(154, 151, 150)", 1, 0);
  light2.position.set(0, 4, 0);
  scene.add(light2);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
  return light;
}

function getRenderer() {
  //Creation du render
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xffffff, 1);
  renderer.setSize( window.innerWidth, window.innerHeight );

  //On ajoute l'objet à la page html
  var container = document.getElementById("canvas");

  document.body.appendChild( renderer.domElement );
      
  return renderer;
}


// Load a JSON file from Blender
var loader1 = new THREE.JSONLoader();
loader1.load( 'plateau_test.js', addModelToScene );

// Load the Blender object to the scene
function addModelToScene( geometry, materials ) {
  var material = new THREE.MeshFaceMaterial(materials);
  model = new THREE.Mesh( geometry, material );
  model.scale.set(0.15,0.15,0.15);
  model.position.y = 1;
  model.rotation.y = 1.57;
  scene.add( model );
}

// Render loop to rotate our sphere by a little bit each frame
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();

render();