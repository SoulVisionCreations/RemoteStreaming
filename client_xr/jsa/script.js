import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.module.min.js";
//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);
//const BSON = require('bson');
//import * as THREE from "./three";
//import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/js/controls/OrbitControls.min.js';
//import  {OrbitControls}  from 'three-orbit-controls';

import { OrbitControls } from "./three/examples/jsm/controls/OrbitControls.js";
//const { v4: uuidv4 } = require('uuid');
//import * as  OrbitControls  from "./OrbitControls.min.js";
//import {v4 as uuidv4} from 'uuid';
function main() {
  const canvas = document.querySelector("canvas.webgl");
  const width = window.innerWidth;
  const height = window.innerHeight;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  //document.addEventListener( 'keydown', onKeyDown );

  var scene = new THREE.Scene();

  //Add ambient light to make the scene more light
  const light = new THREE.AmbientLight(0xffffff);
  const url_base = "https://picsum.photos/256?random=";
  let index = 128;

  const img_plane = new Image();
  img_plane.crossOrigin = ""; // ask for CORS permission
  img_plane.src = "./cat.jpg";

  const texture_plane = new THREE.Texture(img_plane);
  img_plane.onload = () => {
    texture_plane.needsUpdate = true;
  };

  // plane to display
  const geometry_plane = new THREE.PlaneGeometry(900, 900 * 0.75);
  const material = new THREE.MeshLambertMaterial({
    map: texture_plane,
    color: 0xffffff,
  });
  //material.emissive.set(0x333333);
  //material.shininess = 60;
  material.transparent = true;
  const mesh_plane = new THREE.Mesh(geometry_plane, material);
  // mesh_plane.material.color.setHex(0xff9a00);
  scene.add(mesh_plane);

  //scene.background = new THREE.Color(1,0,0);
  //scene.background=null;
  const aspect = window.innerWidth / window.innerHeight;
  let camera = new THREE.PerspectiveCamera(45, aspect, 0.01, 1000);
  camera.position.set(0, 0, 1000);
  scene.add(camera);
  scene.add(light);
  //const controls = new OrbitControls( camera, renderer.domElement );
  let camera2 = new THREE.PerspectiveCamera(45, aspect, 0.01, 1000);
  camera2.position.set(0, 0, 1000);
  const controls = new OrbitControls(camera2, document.body);
  //controls.update();
  // rendering function

  function render() {
    requestAnimationFrame(render);
    //controls.update();
    //ws.send(JSON.stringify(controls));
    //console.log(controls.object);
    renderer.render(scene, camera);
  }
  function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
  render();
  //const myInterval = setInterval(render, 200);
  let id=create_UUID();
  let p1,p2;
  fetch('https://amanraj.bond:8888/getavailableport?id='+id)
  .then(response => response.json())
  .then(data => {console.log(data);p1=data.port1;p2=data.port2;


  fetch('https://amanraj.bond:80/launch?skuId='+skuId+'&port1='+p1+'&port2='+p2+'&id='+id)
  .then(response => response.json())
  .then(data => console.log(data));

console.log("available ports",p1,p2);
  const WS_URL1 = "wss://amanraj.bond:"+p1+"/?id="+id;
  const ws1 = new WebSocket(WS_URL1, "echo-protocol");
  
  ws1.onopen = () => console.log(`Connected to ${WS_URL1}`);
  let blobArray = [];
  //let ct=0
  let count = 0;
  let start;
  let end;
  let pcount = 0;
  let c = 0;
  ws1.onmessage = (message) => {
    if (count === 0) {
      start = Date.now();
    }
    // console.info("ch", canvas.style.visibility);

    //if (canvas.style.visibility == "visible" && notconnected) wsconnect();
    //if(!notconnected)mediaRecorder.requestData();
    end = Date.now();

    if (end - start >= 1000) {
      console.info("time ", end - start, count - pcount);
      start = end;
      pcount = count;
    }
    count++;
    console.log("rec");
    //console.log("received data is ",message.data.length);
    // console.log(message.data);

    //var string = LZString.decompressFromUTF16(message.data);
    // console.log(string);
    // console.log("decoded  data len is ",string.length);
    img_plane.src = message.data;
    //ws1.send("hi");
  };
  
  const WS_URL = "wss://amanraj.bond:"+p2+"/?id="+id;
  const ws = new WebSocket(WS_URL, "echo-protocol");
  // var W3CWebSocket = require('websocket').w3cwebsocket;

  // var ws = new W3CWebSocket('ws://192.168.1.2:8082/', 'echo-protocol');
  ws.onopen = () => console.log(`Connected to ${WS_URL}`);

  //let ct=0
  ws.onmessage = (message) => {};
  function sendorbitcontrol() {
    ws.send(JSON.stringify(controls.object.position));
  }
  setInterval(sendorbitcontrol, 100);

  var element1 = document.getElementById("elem_Don");
  element1.onclick = function () {
    // console.log("button clicked");
    ws.send(JSON.stringify({ type: "button", val: "Dimension_on" }));
  };
  var element2 = document.getElementById("elem_Doff");
  element2.onclick = function () {
    // console.log("button clicked");
    ws.send(JSON.stringify({ type: "button", val: "Dimension_off" }));
  };
  var element3 = document.getElementById("elem_Brown");
  element3.onclick = function () {
    // console.log("button clicked");
    ws.send(JSON.stringify({ type: "button", val: "Brown" }));
  };
  var element4 = document.getElementById("elem_Blue");
  element4.onclick = function () {
    // console.log("button clicked");
    ws.send(JSON.stringify({ type: "button", val: "Blue" }));
  };




});
}
main();
