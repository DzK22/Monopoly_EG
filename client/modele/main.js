function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  return scene;
}

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var d = 2;
  var camera = new THREE.OrthographicCamera(-d*aspectRatio, d*aspectRatio, d, -d, 1, 1000); 
  camera.position.set(20,20,20);
  camera.lookAt(scene.position);
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
  var renderer = new THREE.WebGLRenderer({ antialiasing: true });
  renderer.setClearColor( 0xffffff, 1);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight );

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;

  //On ajoute l'objet à la page html
  var container = document.getElementById("canvas");
  document.body.appendChild( renderer.domElement );
  return renderer;
}

function loaderObject(load, test, i){
  load.load('/plateau/'+test+'.gltf', (gltf) => {
    const root = gltf.scene;
    scene.add(root);
    //console.log(root);
    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
  });
}

var blenderObject = ['collections', 'eau', 'egout', 'orangerie', 'parlement', 'pont', 'rail',
                      'route', 'tram', 'campus', 'cascade', 'case1', 'case2', 'case3', 'case4', 'case5',
                      'case6', 'case7', 'case8', 'case9', 'case10', 'case11', 'case12', 'case13', 'case14',
                      'case15', 'case16', 'case17', 'case18', 'case19', 'case20', 'case21', 'case22', 'case23',
                      'case24', 'case25', 'case26', 'case27', 'case28', 'case29', 'case30', 'case31', 'case32', 'case33',
                      'case34', 'case35', 'case36', 'coins'];

// manque encore les maisons (doit faire encore une modification)

for(var i = 0; i <= 46; i++){
  var loader = "loader"+i;
  var objVar = blenderObject[i];
  var loader = new THREE.GLTFLoader();
  loaderObject(loader, objVar, i);
};

var loaderHotel = new THREE.GLTFLoader();
loaderHotel.load('/hotel/hotel.gltf', (gltf) => {
  const root = gltf.scene;
  scene.add(root);
  // compute the box that contains all the stuff
  // from root and below
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
});

var loaderHotel = new THREE.GLTFLoader();
loaderHotel.load('/maison/maison.gltf', (gltf) => {
  const root = gltf.scene;
  scene.add(root);
  // compute the box that contains all the stuff
  // from root and below
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
});


//var positionMoto = [];

var loaderMoto = new THREE.GLTFLoader();
loaderMoto.load( 'Pions/pionEchelle/moto.gltf', (gltf) => {
  //console.log(gltf); 
  const root = gltf.scene;
  window.te = gltf.scene;
  root.rotateY(-90*Math.PI/180);
  root.position.set(3.8,2,3.85);
  scene.add(root);
  scene.updateMatrixWorld(true);
  var position = new THREE.Vector3();
  position.setFromMatrixPosition( root.matrixWorld );
  alert("Position de la moto: " + position.x + ', ' + position.y + ', ' + position.z);
  //alert(positionMoto);
  /*positionMoto[0] = position.x;
  positionMoto[1] = position.y;
  positionMoto[2] = position.z;*/
  //alert(positionMoto);
  // compute the box that contains all the stuff
  // from root and below
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
});

//var positionVoiture = [];
var loaderCitroen = new THREE.GLTFLoader();
loaderCitroen.load('Pions/pionEchelle/citroen\ C4.gltf', (gltf) => {
  //console.log(gltf);
  const root = gltf.scene;
  window.te2 = gltf.scene;
  root.position.set(0.335*11.5,2,0.335*7);
  scene.add(root);
  // compute the box that contains all the stuff
  // from root and below
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
  scene.updateMatrixWorld(true);
  var position = new THREE.Vector3();
  position.setFromMatrixPosition( root.matrixWorld );
  alert("Position de la voiture: " + position.x + ', ' + position.y + ', ' + position.z);
  /*positionVoiture[0] = position.x;
  positionVoiture[1] = position.y;
  positionVoiture[2] = position.z;*/
  // set the camera to frame the box
  //console.log(positionMoto);
});

var tes = 0;
function deplacement(){
  if(tes === 0){
    tes = 1;
  }
  if(te.position.z >= te2.position.z) {
    te2.position.z += 0.01;
    //console.log(te.position.z);
    //console.log(te2.position.z);
    //console.log(Math.floor(te2.position.z * 100) / 100);
  } 
  if(te.position.z == (Math.floor(te2.position.z * 100) / 100)) {
    te2.rotateY(-90*Math.PI/180);
    tes = 0;
  }
}

function render() {
  requestAnimationFrame(render);
  if(tes === 1){
    deplacement();
  }
  renderer.render(scene, camera);
};

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();

render();