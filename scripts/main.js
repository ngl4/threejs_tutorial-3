// create a scene object
var scene = new THREE.Scene();

//create a camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 4, 0);

//create a renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3d-image").appendChild(renderer.domElement);

//create a 3D object
var geometry = new THREE.SphereBufferGeometry(2, 60, 60);

//NEW: load texture
var texture = new THREE.TextureLoader().load(
  "assets/rock_01_diffusion.jpg"
);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 1);

//load an environmental map
var envMap = new THREE.CubeTextureLoader().setPath('assets/')
.load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);

//apply envMap to scene
scene.background = envMap;

//create a basic material (self-illuminated material) - MeshBasicMaterial
//map: the main color map of a material

//MeshLambertMaterial: good for stone or untreated wood, best for non-shiny surfaces
// var material = new THREE.MeshLambertMaterial({ map: texture });

//MeshPhongMaterial: use per-pixel shading model and more accurate than lambert materials
//they have options for shininess, specular color, reflectivity,
//best for shiny surfaces with specular highlighting
// var material = new THREE.MeshPhongMaterial({ map: texture, specular: 0x333333, reflectivity: 1.0 });

//MeshPhysicalMaterial: most accurate shading material
//requires more computation per frame, but gives great realistic results
var material = new THREE.MeshPhysicalMaterial({ map: texture, envMap: envMap, metalness: 1.5, roughness: 0.1 });


//create a mesh
var object = new THREE.Mesh(geometry, material);
//add it to the scene
scene.add(object);

//render the scene
var animate = function() {
  requestAnimationFrame(animate);
  object.rotation.x += 0.001;
  object.rotation.y += 0.003;

  renderer.render(scene, camera);
};
animate();

//add an ambient light
//(general light on the entire scene with no direction)
var light = new THREE.AmbientLight(0xffeecc, 0.4);
scene.add(light);

//add a directional light
//(cast an even light from a specific direction without any falloff)
//(emulate light source like the sun)
var light = new THREE.DirectionalLight(0xffdd99, 1.9);
scene.add(light);
light.position.set(-10, 10, 0);