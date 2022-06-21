import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.module.min.js';
//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);
//const BSON = require('bson');
//import * as THREE from "./three";
//import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/js/controls/OrbitControls.min.js';
//import  {OrbitControls}  from 'three-orbit-controls';

import { OrbitControls } from "./three/examples/jsm/controls/OrbitControls.js";

//import * as  OrbitControls  from "./OrbitControls.min.js";

function main() {
const canvas = document.querySelector('canvas.webgl');
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ canvas,alpha:true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
//document.addEventListener( 'keydown', onKeyDown );

var scene = new THREE.Scene();

//Add ambient light to make the scene more light
const light = new THREE.AmbientLight( 0xffffff );
const url_base = 'https://picsum.photos/256?random='
let index = 128;

const img_plane = new Image();
img_plane.crossOrigin = "";   // ask for CORS permission
img_plane.src =  './cat.jpg';  

const texture_plane = new THREE.Texture(img_plane);
img_plane.onload = () => { texture_plane.needsUpdate = true };

// plane to display
const geometry_plane = new THREE.PlaneGeometry(600, 500*0.75);
const material=new THREE.MeshLambertMaterial({map:texture_plane,color: 0xFFFFFF});
//material.emissive.set(0x333333);
//material.shininess = 60;
material.transparent=true;
const mesh_plane = new THREE.Mesh(geometry_plane,material);
   // mesh_plane.material.color.setHex(0xff9a00);
scene.add(mesh_plane);

 scene.background = new THREE.Color(1,0,0);
//scene.background=null;
      const aspect = window.innerWidth / window.innerHeight;
    let  camera = new THREE.PerspectiveCamera(45, aspect, 0.01, 1000);
camera.position.set(0, 0, 1000);
scene.add(camera);
scene.add(light);
//const controls = new OrbitControls( camera, renderer.domElement );
let  camera2 = new THREE.PerspectiveCamera(45, aspect, 0.01, 1000);
camera2.position.set(0, 0, 1000);
const controls = new OrbitControls( camera2, document.body );
//controls.update();
// rendering function


function render() {
  requestAnimationFrame(render);
  //controls.update();
  //ws.send(JSON.stringify(controls));
  //console.log(controls.object);
  renderer.render(scene, camera);
};
render() ;
//const myInterval = setInterval(render, 200);


const WS_URL = 'ws://3.111.63.238:11111';
const ws = new WebSocket(WS_URL,'echo-protocol');
// var W3CWebSocket = require('websocket').w3cwebsocket;

// var ws = new W3CWebSocket('ws://192.168.1.2:8082/', 'echo-protocol');
ws.onopen = () => console.log(`Connected to ${WS_URL}`);
let blobArray=[]
//let ct=0
ws.onmessage = message => {
  //scene.add(cubeMesh)
    //    ct++;
     // console.info(typeof(message.data));
      img_plane.src = message.data;
    //  console.log(message);
      //render();
     // ws.send(JSON.stringify(controls.object.position));
     // console.log(controls.object);


}


// function onKeyDown(e) {
//     switch (e.keyCode) {
//         case 81:  //q
//         index--;
//             //console.log(url_base + index + '.jpg');
//             img_plane.src = './cat.jpg';
//            //img_plane.src = url_base + index + '.jpg';

//             break;
//         case 87:  //w
//             index++;
//             //console.log(url_base + index + '.jpg');
//             img_plane.src = './dog.jpg';
//            //img_plane.src = url_base + index + '.jpg';

//             break;
//         default:
//             break;
//     }
// }
const WS_URL2 = 'ws://3.111.63.238:11112';
const ws2 = new WebSocket(WS_URL2,'echo-protocol');
// var W3CWebSocket = require('websocket').w3cwebsocket;

// var ws = new W3CWebSocket('ws://192.168.1.2:8082/', 'echo-protocol');
ws2.onopen = () => console.log(`Connected to ${WS_URL2}`);

//let ct=0
ws2.onmessage = message => {
  
}
function sendorbitcontrol()
{
  ws2.send(JSON.stringify(controls.object.position));
}
setInterval(sendorbitcontrol, 100);

var element1 = document.getElementById("elem_Don");
element1.onclick = function() {
 // console.log("button clicked");
  ws2.send(JSON.stringify({"type":"button","val":"Dimension_on"}))
}
var element2 = document.getElementById("elem_Doff");
element2.onclick = function() {
 // console.log("button clicked");
  ws2.send(JSON.stringify({"type":"button","val":"Dimension_off"}))
}
var element3 = document.getElementById("elem_Brown");
element3.onclick = function() {
 // console.log("button clicked");
  ws2.send(JSON.stringify({"type":"button","val":"Brown"}))
}
var element4 = document.getElementById("elem_Blue");
element4.onclick = function() {
 // console.log("button clicked");
  ws2.send(JSON.stringify({"type":"button","val":"Blue"}))
}



}
main()