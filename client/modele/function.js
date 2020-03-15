let hello, juni;

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


function render() {	
	requestAnimationFrame(render);
	if(compteurDeplacement > 0 && compteurDeplacement < 5){
	  deplacement(hello, juni);
	}
	renderer.render(scene, camera);
  };

function supprimerMaison(maisonPropriete){
	scene.remove(window[maisonPropriete]);
}


function supprimerHotel(hotelPropriete){
	scene.remove(window[hotelPropriete]);
}


function loaderPlateau(load, test){
  load.load('/plateau/'+test+'.gltf', (gltf) => {
    const root = gltf.scene;
    scene.add(root);
  });
}

var plateauObjects = ['collections', 'eau', 'egout', 'orangerie',
                      'maison', 'parlement', 'pont', 'rail', 'route', 'tram', 'campus', 'cascade'];


for(var i = 0; i < 12; i++){
  var objVar = plateauObjects[i];
  var loader = new THREE.GLTFLoader();
  loaderPlateau(loader, objVar);
};


function loaderCases(cases){
	var load = new THREE.GLTFLoader();
	load.load('/plateau/'+cases+'.gltf', (gltf) => {
		const root = gltf.scene;
		window[cases] = gltf.scene;
		scene.add(root);
	});
}


var plateauCases = ['case0', 'case1', 'case2', 'case3', 'case4', 'case5', 'case6', 'case7', 'case8', 'case9',
                     'case10', 'case11', 'case12', 'case13', 'case14', 'case15', 'case16', 'case17',
                     'case18', 'case19', 'case20', 'case21', 'case22', 'case23', 'case24', 'case25',
                     'case26', 'case27', 'case28', 'case29', 'case30', 'case31', 'case32', 'case33',
                     'case34', 'case35', 'case36', 'case37', 'case38', 'case39'
			]


for(var i = 0; i < 40; i++){
  var objVar = plateauCases[i];
  loaderCases(objVar);
};


function loaderPion(pion, _callback){
	var load = new THREE.GLTFLoader();
	load.load('/Pions/'+pion+'.gltf', (gltf) => {
	  const root = gltf.scene;
	  //window[pion] = gltf.scene;
	  //window.pion = gltf.scene;
		pion = gltf.scene;
	  root.position.set(0.335*11.5,2,0.335*11.5);
	  root.rotateY(-1.6);
	  scene.add(root);
	  if (_callback){
		hello = pion;
		_callback();
	  }
	});
}


function loaderMaisonPro(maisonPropriete){
	var load = new THREE.GLTFLoader();
	load.load('/maisonPro/'+maisonPropriete+'.gltf', (gltf) => {
		const root = gltf.scene;
		window[maisonPropriete] = gltf.scene;
		scene.add(root);
	});
}


function loaderHotelPro(hotelPropriete){
	var load = new THREE.GLTFLoader();
	load.load('/maisonPro/'+hotelPropriete+'.gltf', (gltf) => {
		const root = gltf.scene;
		window[hotelPropriete] = gltf.scene;
		scene.add(root);
	});
}
function no(essai){
	switch(essai){
		case "case0":
				return "case0";
				break;

		case "case1":
				return "case1";
				break;

		case "case2":
				return "case2";
				break;

		case "case3":
				return "case3";
				break;

		case "case4":
				return "case4";
				break;

		case "case5":
			return "case5";
			break;
	}
}

var compteurDeplacement = 0;
function deplacement(hello, juli){
	if(compteurDeplacement === 0){
		compteurDeplacement = 1;
		juni = juli;
	}
	//console.log(tabCases["case10"])
	//console.log(tabCases[no()]);
	if((Math.floor(tabCases[no(juni)].z * 100) / 100) != (Math.floor(hello.position.z * 100) / 100)
	||
		(Math.floor(tabCases[no(juni)].x * 100) / 100) != (Math.floor(hello.position.x * 100) / 100))
	{
	// Route d'en-bas (vers la gauche)
	if((Math.floor(tabCases.case10.z * 100) / 100) == (Math.floor(hello.position.z * 100) / 100) && compteurDeplacement === 1) {
		hello.position.x -= 0.01;
	}

	if(compteurDeplacement === 1 && (Math.floor(hello.position.x * 100) / 100) === (Math.floor(tabCases.case10.x * 100) / 100)){
		//compteurDeplacement = 0;
		compteurDeplacement = 2;
		hello.rotateY(-1.5);
	}
	// Route gauche (vers le haut)
	if(compteurDeplacement === 2 && (Math.floor(hello.position.x * 100) / 100) === (Math.floor(tabCases.case20.x * 100) / 100) && hello.position.z != tabCases.case20.z){
		hello.position.z -= 0.01;
	}
	if(compteurDeplacement === 2 && (Math.floor(hello.position.z * 100) / 100) === (Math.floor(tabCases.case20.z * 100) / 100)){
		compteurDeplacement = 3;
		hello.rotateY(-1.5);
	}

	if(compteurDeplacement === 3 && (Math.floor(hello.position.x * 100) / 100) != (Math.floor(tabCases.case30.x * 100) / 100) && (Math.floor(hello.position.z * 100) / 100) === (Math.floor(tabCases.case30.z * 100) / 100)){
		hello.position.x += 0.01;
	}
	if(compteurDeplacement === 3 && (Math.floor(hello.position.x * 100) / 100) === (Math.floor(tabCases.case30.x * 100) / 100)){
		compteurDeplacement = 4;
		hello.rotateY(-1.5);
	}
  
	// Route gauche (vers le haut)
	if(compteurDeplacement === 4 && (Math.floor(hello.position.x * 100) / 100) === (Math.floor(tabCases.case0.x * 100) / 100) && hello.position.y === tabCases.case0.y && hello.position.z != tabCases.case0.z){
		hello.position.z += 0.01;
	}
	if(compteurDeplacement === 4 && (Math.floor(hello.position.z * 100) / 100) === (Math.floor(tabCases.case0.z * 100) / 100)){
		compteurDeplacement = 0;
		hello.rotateY(-1.8);
	}
	}
}
