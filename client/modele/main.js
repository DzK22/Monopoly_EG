function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x78e9f8);
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
    //var num = i;
    window.te = gltf.scene;
    /*var te = "case"+num;
    window.te = gltf.scene;*/
    //console.log(te);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
  });
}

var blenderObject = ['case1', 'case2', 'case3', 'case4', 'case5', 'case6', 'case7', 'case8', 'case9',
                      'case10', 'case11', 'case12', 'case13', 'case14', 'case15', 'case16', 'case17',
                      'case18', 'case19', 'case20', 'case21', 'case22', 'case23', 'case24', 'case25',
                      'case26', 'case27', 'case28', 'case29', 'case30', 'case31', 'case32', 'case33',
                      'case34', 'case35', 'case36', 'coins', 'collections', 'eau', 'egout', 'orangerie',
                      'maison', 'parlement', 'pont', 'rail', 'route', 'tram', 'campus', 'cascade'];


for(var i = 0; i < 49; i++){
  var loader = "loader"+i;
  var objVar = blenderObject[i];
  var loader = new THREE.GLTFLoader();
  loaderObject(loader, objVar, i);
};


var loaderHotel = new THREE.GLTFLoader();
loaderHotel.load('/hotel/hotel.gltf', (gltf) => {
  const root = gltf.scene;
  scene.add(root);
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
});
/*
var loaderMoto = new THREE.GLTFLoader();
loaderMoto.load( 'Pions/pionEchelle/moto.gltf', (gltf) => {
  const root = gltf.scene;
  window.pionMoto = gltf.scene;
  root.rotateY(-90*Math.PI/180);
  root.position.set(3.8,2,3.85);
  scene.add(root);
  scene.updateMatrixWorld(true);
  var position = new THREE.Vector3();
  position.setFromMatrixPosition( root.matrixWorld );
  //alert("Position de la moto: " + position.x + ', ' + position.y + ', ' + position.z);
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
});*/


var loaderCitroen = new THREE.GLTFLoader();
loaderCitroen.load('Pions/pionEchelle/citroen\ C4.gltf', (gltf) => {
  const root = gltf.scene;
  window.pionCitroen = gltf.scene;
  root.position.set(0.335*11.5,2,0.335*11.5);
  root.rotateY(-1.6);
  scene.add(root);
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
  scene.updateMatrixWorld(true);
  var position = new THREE.Vector3();
  position.setFromMatrixPosition( root.matrixWorld );
  console.log("Position de la voiture: " + position.x + ', ' + position.y + ', ' + position.z);
});


var loaderMaisonBasGauche = new THREE.GLTFLoader();
loaderMaisonBasGauche.load('Pions/pionEchelle/moto.gltf', (gltf) => {
  const root = gltf.scene;
  window.maisonBasGauche = gltf.scene;
  root.position.set(0.335*1, 2, 0.335*11.5);
  root.rotateY(3);
  scene.add(root);
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
  scene.updateMatrixWorld(true);
  var position = new THREE.Vector3();
  position.setFromMatrixPosition( root.matrixWorld );
  console.log("Position de la maisonBasGauche: " + position.x + ', ' + position.y + ', ' + position.z);
});

var loaderMaisonHautGauche = new THREE.GLTFLoader();
loaderMaisonHautGauche.load('Pions/pionEchelle/moto.gltf', (gltf) => {
  const root = gltf.scene;
  window.maisonHautGauche = gltf.scene;
  root.position.set(0.335*1, 2, 0.335*1); //0.335*11.5, 5.5, 0.335*11.5
  root.rotateY(1.5);
  scene.add(root);
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
  scene.updateMatrixWorld(true);
  var position = new THREE.Vector3();
  position.setFromMatrixPosition( root.matrixWorld );
 console.log("Position de la maisonHautGauche: " + position.x + ', ' + position.y + ', ' + position.z);
});

var loaderMaisonHautDroite = new THREE.GLTFLoader();
loaderMaisonHautDroite.load('Pions/pionEchelle/moto.gltf', (gltf) => {
  const root = gltf.scene;
  window.maisonHautDroite = gltf.scene;
  root.position.set(0.335*11.5, 2, 0.335*1);
  root.rotateY(0);
  scene.add(root);
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
  scene.updateMatrixWorld(true);
  var position = new THREE.Vector3();
  position.setFromMatrixPosition( root.matrixWorld );
  console.log("Position de la maisonHautDroite: " + position.x + ', ' + position.y + ', ' + position.z);
});

var loaderMaisonBasDroite = new THREE.GLTFLoader();
loaderMaisonBasDroite.load('Pions/pionEchelle/moto.gltf', (gltf) => {
  const root = gltf.scene;
  window.maisonBasDroite = gltf.scene;
  root.position.set(0.335*11.5,2,0.335*11.5);
  root.rotateY(-1.5);
  scene.add(root);
  const box = new THREE.Box3().setFromObject(root);
  const boxSize = box.getSize(new THREE.Vector3()).length();
  const boxCenter = box.getCenter(new THREE.Vector3());
  scene.updateMatrixWorld(true);
  var position = new THREE.Vector3();
  position.setFromMatrixPosition( root.matrixWorld );
  console.log("Position de la maisonBasDroite: " + position.x + ', ' + position.y + ', ' + position.z);
});


var compteurDeplacement = 0;
function deplacement(){
  if(compteurDeplacement === 0){
    /*console.log("Position de la voiture: " + pionCitroen.position.x + ', ' + pionCitroen.position.y + ', ' + pionCitroen.position.z);
    console.log("Position de la maisongauchebas: " + maisonBasGauche.position.x + ', ' + maisonBasGauche.position.y + ', ' + maisonBasGauche.position.z);
    console.log("Position de la maisonhautegauche: " + maisonHautGauche.position.x + ', ' + maisonHautGauche.position.y + ', ' + maisonHautGauche.position.z);
    console.log("Position de la maisonhautedroite: " + maisonHautDroite.position.x + ', ' + maisonHautDroite.position.y + ', ' + maisonHautDroite.position.z);
    */
   compteurDeplacement = 1;
  }

  // Route d'en-bas (vers la gauche)
  if((Math.floor(maisonBasGauche.position.y * 100) / 100) == (Math.floor(pionCitroen.position.y * 100) / 100) && (Math.floor(maisonBasGauche.position.z * 100) / 100) == (Math.floor(pionCitroen.position.z * 100) / 100) && compteurDeplacement === 1) {
    pionCitroen.position.x -= 0.01;
  }

  if(compteurDeplacement === 1 && ((Math.floor(maisonBasGauche.position.x * 100) / 100) == (Math.floor(pionCitroen.position.x * 100) / 100)) && ((Math.floor(maisonBasGauche.position.z * 100) / 100) == (Math.floor(pionCitroen.position.z * 100) / 100)))
  {
    console.log('------');
    console.log("Maisongauchebas: " + (Math.floor(maisonBasGauche.position.x * 100) / 100) + ', ' + (Math.floor(maisonBasGauche.position.y * 100) / 100) + ', ' + (Math.floor(maisonBasGauche.position.z * 100) / 100));
    console.log("Position de la maisonhautegauche: " + (Math.floor(maisonHautGauche.position.x * 100) / 100) + ', ' + maisonHautGauche.position.y + ', ' + maisonHautGauche.position.z);
    console.log("Position de la voiture: " + (Math.floor(pionCitroen.position.x * 100) / 100) + ', ' + (Math.floor(pionCitroen.position.y * 100) / 100) + ', ' + (Math.floor(pionCitroen.position.z * 100) / 100));
    compteurDeplacement = 2;
    pionCitroen.rotateY(-1.5);
  }

  // Route gauche (vers le haut)
  if(compteurDeplacement === 2 && (Math.floor(pionCitroen.position.x * 100) / 100) === (Math.floor(maisonHautGauche.position.x * 100) / 100) && pionCitroen.position.y === maisonHautGauche.position.y && pionCitroen.position.z != maisonHautGauche.position.z){
    pionCitroen.position.z -= 0.01;
  }

  if(((Math.floor(maisonHautGauche.position.x * 100) / 100) === (Math.floor(pionCitroen.position.x * 100) /100)) && ((Math.floor(maisonHautGauche.position.y * 100) / 100) === (Math.floor(pionCitroen.position.y * 10) /10)) && ((Math.floor(maisonHautGauche.position.z * 100) / 100) === (Math.floor(pionCitroen.position.z * 100) /100))){
    console.log('------');
    console.log("Position de la maisonhautegauche: " + (Math.floor(maisonHautGauche.position.x * 100) / 100) + ', ' + (Math.floor(maisonHautGauche.position.y * 100) / 100) + ', ' + (Math.floor(maisonHautGauche.position.z * 100) / 100));
    console.log("Position de la maisonhautdroite: " + (Math.floor(maisonHautDroite.position.x * 100) / 100) + ', ' + (Math.floor(maisonHautDroite.position.y * 100) / 100) + ', ' + (Math.floor(maisonHautDroite.position.z * 100) / 100));
    console.log("Position de la voiture: " + (Math.floor(pionCitroen.position.x * 100) / 100) + ', ' + (Math.floor(pionCitroen.position.y * 100) / 100) + ', ' + (Math.floor(pionCitroen.position.z * 100) / 100));
    compteurDeplacement = 3;
    pionCitroen.rotateY(-1.5);
  }

  if(compteurDeplacement === 3 && (Math.floor(pionCitroen.position.x * 100) / 100) != (Math.floor(maisonHautDroite.position.x * 100) / 100) && (Math.floor(pionCitroen.position.y * 100) / 100) === (Math.floor(maisonHautDroite.position.y * 100) / 100) && (Math.floor(pionCitroen.position.z * 100) / 100) === (Math.floor(maisonHautDroite.position.z * 100) / 100)){
    pionCitroen.position.x += 0.01;
  }

  if(((Math.floor(maisonHautDroite.position.x * 100) / 100) === (Math.floor(pionCitroen.position.x * 100) /100)) && ((Math.floor(maisonHautDroite.position.y * 100) / 100) === (Math.floor(pionCitroen.position.y * 10) /10)) && ((Math.floor(maisonHautDroite.position.z * 100) / 100) === (Math.floor(pionCitroen.position.z * 100) /100))){
    console.log('------');
    console.log("Position de la maisonHautDroite: " + (Math.floor(maisonHautDroite.position.x * 100) / 100) + ', ' + (Math.floor(maisonHautDroite.position.y * 100) / 100) + ', ' + (Math.floor(maisonHautDroite.position.z * 100) / 100));
    console.log("Position de la maisonbasDroite: " + (Math.floor(maisonBasDroite.position.x * 100) / 100) + ', ' + (Math.floor(maisonBasDroite.position.y * 100) / 100) + ', ' + (Math.floor(maisonBasDroite.position.z * 100) / 100));
    console.log("Position de la voiture: " + (Math.floor(pionCitroen.position.x * 100) / 100) + ', ' + (Math.floor(pionCitroen.position.y * 100) / 100) + ', ' + (Math.floor(pionCitroen.position.z * 100) / 100));
    compteurDeplacement = 4;
    pionCitroen.rotateY(-1.5);
  }
  
  if(compteurDeplacement === 4 && (Math.floor(pionCitroen.position.x * 100) / 100) === (Math.floor(maisonBasDroite.position.x * 100) / 100) && (Math.floor(pionCitroen.position.y * 100) / 100) === (Math.floor(maisonBasDroite.position.y * 100) / 100) && (Math.floor(pionCitroen.position.z * 100) / 100) != (Math.floor(maisonBasDroite.position.z * 100) / 100)){
    pionCitroen.position.z += 0.01;
  }

  if(((Math.floor(maisonBasDroite.position.x * 100) / 100) === (Math.floor(pionCitroen.position.x * 100) /100)) && ((Math.floor(maisonBasDroite.position.y * 100) / 100) === (Math.floor(pionCitroen.position.y * 10) /10)) && ((Math.floor(maisonBasDroite.position.z * 100) / 100) === (Math.floor(pionCitroen.position.z * 100) /100))){
    console.log('------');
    console.log("Position de la maisonBasGauche: " + (Math.floor(maisonBasGauche.position.x * 100) / 100) + ', ' + (Math.floor(maisonBasGauche.position.y * 100) / 100) + ', ' + (Math.floor(maisonBasGauche.position.z * 100) / 100));
    console.log("Position de la maisonBasDroite: " + (Math.floor(maisonBasDroite.position.x * 100) / 100) + ', ' + (Math.floor(maisonBasDroite.position.y * 100) / 100) + ', ' + (Math.floor(maisonBasDroite.position.z * 100) / 100));
    console.log("Position de la voiture: " + (Math.floor(pionCitroen.position.x * 100) / 100) + ', ' + (Math.floor(pionCitroen.position.y * 100) / 100) + ', ' + (Math.floor(pionCitroen.position.z * 100) / 100));
    compteurDeplacement = 0;
    pionCitroen.rotateY(-1.8);
  }
}

function ajoutHotel(){
  var loaderajoutHotel = new THREE.GLTFLoader();

  loaderajoutHotel.load('hotel/hotel.gltf', (gltf) => {
    const root = gltf.scene;
    window.hotel1 = gltf.scene;
    root.position.set(0.335*-0.4, 2, 0.335*10);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de l'hotel1: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutHotel2 = new THREE.GLTFLoader();

  loaderajoutHotel2.load('hotel/hotel.gltf', (gltf) => {
    const root = gltf.scene;
    window.hotel2 = gltf.scene;
    root.position.set(0.335*-0.4, 2, 0.335*9);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de l'hotel2: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutHotel3 = new THREE.GLTFLoader();

  loaderajoutHotel3.load('hotel/hotel.gltf', (gltf) => {
    const root = gltf.scene;
    window.hotel3 = gltf.scene;
    root.position.set(0.335*-0.4, 2, 0.335*8);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de l'hotel2: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutHotel4 = new THREE.GLTFLoader();

  loaderajoutHotel4.load('hotel/hotel.gltf', (gltf) => {
    const root = gltf.scene;
    window.hotel4 = gltf.scene;
    root.position.set(0.335*-0.4, 2, 0.335*7);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de l'hotel2: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutHotel5 = new THREE.GLTFLoader();

  loaderajoutHotel5.load('hotel/hotel.gltf', (gltf) => {
    const root = gltf.scene;
    window.hotel5 = gltf.scene;
    root.position.set(0.335*-0.4, 2, 0.335*5);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de l'hotel2: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutHotel6 = new THREE.GLTFLoader();

  loaderajoutHotel6.load('hotel/hotel.gltf', (gltf) => {
    const root = gltf.scene;
    window.hotel6 = gltf.scene;
    root.position.set(0.335*-0.4, 2, 0.335*4);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de l'hotel2: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutHotel7 = new THREE.GLTFLoader();

  loaderajoutHotel7.load('hotel/hotel.gltf', (gltf) => {
    const root = gltf.scene;
    window.hotel7 = gltf.scene;
    root.position.set(0.335*-0.4, 2, 0.335*3);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de l'hotel2: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutHotel8 = new THREE.GLTFLoader();

  loaderajoutHotel8.load('hotel/hotel.gltf', (gltf) => {
    const root = gltf.scene;
    window.hotel8 = gltf.scene;
    root.position.set(0.335*-0.4, 2, 0.335*2);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de l'hotel2: " + position.x + ', ' + position.y + ', ' + position.z);
  });
}

function ajoutMaison(){
  var loaderajoutMaison1 = new THREE.GLTFLoader();

  loaderajoutMaison1.load('maisonSeule/maisonProp.gltf', (gltf) => {
    const root = gltf.scene;
    window.maison1 = gltf.scene;
    root.position.set(0.335*2, 2, 0.335*-0.3);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de la maison1: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutMaison2 = new THREE.GLTFLoader();

  loaderajoutMaison2.load('maisonSeule/maisonProp.gltf', (gltf) => {
    const root = gltf.scene;
    window.maison2 = gltf.scene;
    root.position.set(0.335*3, 2, 0.335*-0.3);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de la maison1: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutMaison3 = new THREE.GLTFLoader();

  loaderajoutMaison3.load('maisonSeule/maisonProp.gltf', (gltf) => {
    const root = gltf.scene;
    window.maison3 = gltf.scene;
    root.position.set(0.335*4, 2, 0.335*-0.3);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de la maison1: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutMaison4 = new THREE.GLTFLoader();

  loaderajoutMaison4.load('maisonSeule/maisonProp.gltf', (gltf) => {
    const root = gltf.scene;
    window.maison4 = gltf.scene;
    root.position.set(0.335*5, 2, 0.335*-0.3);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de la maison1: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutMaison5 = new THREE.GLTFLoader();

  loaderajoutMaison5.load('maisonSeule/maisonProp.gltf', (gltf) => {
    const root = gltf.scene;
    window.maison5 = gltf.scene;
    root.position.set(0.335*7, 2, 0.335*-0.3);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de la maison1: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutMaison6 = new THREE.GLTFLoader();

  loaderajoutMaison6.load('maisonSeule/maisonProp.gltf', (gltf) => {
    const root = gltf.scene;
    window.maison6 = gltf.scene;
    root.position.set(0.335*8, 2, 0.335*-0.3);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de la maison1: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutMaison7 = new THREE.GLTFLoader();

  loaderajoutMaison7.load('maisonSeule/maisonProp.gltf', (gltf) => {
    const root = gltf.scene;
    window.maison7 = gltf.scene;
    root.position.set(0.335*9, 2, 0.335*-0.3);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de la maison1: " + position.x + ', ' + position.y + ', ' + position.z);
  });

  var loaderajoutMaison8 = new THREE.GLTFLoader();

  loaderajoutMaison8.load('maisonSeule/maisonProp.gltf', (gltf) => {
    const root = gltf.scene;
    window.maison8 = gltf.scene;
    root.position.set(0.335*10, 2, 0.335*-0.3);
    root.rotateY(0);
    scene.add(root);
    const box = new THREE.Box3().setFromObject(root);
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( root.matrixWorld );
    console.log("Position de la maison1: " + position.x + ', ' + position.y + ', ' + position.z);
  });
}

function supprimerHotel(){
  scene.remove(hotel1);
  scene.remove(hotel2);
  scene.remove(hotel3);
  scene.remove(hotel4);
  scene.remove(hotel5);
  scene.remove(hotel6);
  scene.remove(hotel7);
  scene.remove(hotel8);
}

function supprimerMaison(){
  scene.remove(maison1);
  scene.remove(maison2);
  scene.remove(maison3);
  scene.remove(maison4);
  scene.remove(maison5);
  scene.remove(maison6);
  scene.remove(maison7);
  scene.remove(maison8);
}

function render() {
  requestAnimationFrame(render);
  if(compteurDeplacement != 0){
    deplacement();
  }
  renderer.render(scene, camera);
};


var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();

render();