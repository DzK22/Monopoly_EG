function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  return scene;
}

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 2000);
  camera.position.set(2.5, 2.6, 6.0);
  camera.rotation.x = 0;
  return camera;
}

function getLight(scene) {
  var light = new THREE.PointLight("rgb(154, 151, 150)", 1, 0);
  light.position.set(7, 4, 3);
  scene.add(light);

  var light2 = new THREE.PointLight("rgb(154, 151, 150)", 1, 0);
  light2.position.set(3, 3, 4);
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

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;

  //On ajoute l'objet à la page html
  var container = document.getElementById("canvas");

  document.body.appendChild( renderer.domElement );
      
  return renderer;
}

/*function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
  const halfSizeToFitOnScreen = sizeToFitOnScreen * 1;
  const halfFovY = THREE.Math.degToRad(camera.fov * .5);
  const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
  // compute a unit vector that points in the direction the camera is now
  // in the xz plane from the center of the box
  const direction = (new THREE.Vector3())
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 0, 1))
      .normalize();
  // move the camera to a position distance units way from the center
  // in whatever direction the camera was from the center already
  camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
  // pick some near and far values for the frustum that
  // will contain the box.
  camera.near = boxSize / 100;
  camera.far = boxSize * 200;
  camera.updateProjectionMatrix();
  // point the camera to look at the center of the box
  camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
}*/


// Load a JSON file from Blender
var loader1 = new THREE.GLTFLoader();
loader1.load( 'plateau_jeu.gltf', (gltf) => {
  console.log(gltf);
  const root = gltf.scene;
  root.rotation.y = 185;
  root.scale.set(1.00, 1.00, 1.00);
  root.position.set(2.5,0.9,0.6);
  scene.add(root);
  // compute the box that contains all the stuff
  // from root and below
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
  // set the camera to frame the box
  //frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
} );

var loader2 = new THREE.GLTFLoader();
loader2.load( 'moto.gltf', (gltf) => {
  console.log(gltf);
  const root = gltf.scene;
  root.rotation.y = 109.5;
  root.scale.set(0.04, 0.04, 0.04);
  root.position.set(0.5,1.0,0.6);
  scene.add(root);
  // compute the box that contains all the stuff
  // from root and below
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
  // set the camera to frame the box
  //frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
} );

var loader3 = new THREE.GLTFLoader();
loader3.load( 'boat.gltf', (gltf) => {
  console.log(gltf);
  const root = gltf.scene;
  root.rotation.y = 180.2;
  root.scale.set(0.005, 0.005, 0.005);
  root.position.set(2.9,1.36,3.5);
  scene.add(root);
  // compute the box that contains all the stuff
  // from root and below
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
  // set the camera to frame the box
  //frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
} );

/*// Load the Blender object to the scene
function addModelToScene( geometry, materials ) {
  console.log(geometry)
  console.log(materials)
  var material = new THREE.MeshFaceMaterial(materials);
  model = new THREE.Mesh( geometry, material );
  model.scale.set(0.15,0.15,0.15);
  model.position.y = 0;
  model.rotation.y = 180;
  scene.add( model );
}*/

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