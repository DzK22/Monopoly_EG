loaderPion('citroen C4', () => {
  deplacement('citroen C4', 'case1');
});
// loaderPion('montgolfiere', null);
// loaderPion('citroen C4', null);
// loaderPion('montgolfiere', () => {
//   deplacement('montgolfiere');
// });


loaderMaisonPro('M1_1_1');
loaderMaisonPro('M1_1_2');
loaderMaisonPro('M1_1_3');
loaderMaisonPro('M1_1_4');

//deplacement('citroen C4');


var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();

render();