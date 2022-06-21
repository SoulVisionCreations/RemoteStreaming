
      






        
//         const videoSourceBuffer = myMediaSource
//   .addSourceBuffer('video/mp4; codecs="avc1.64001e"');
      

var canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
var scene = new THREE.Scene()

// Object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// Renderer
const WS_URL = 'ws://localhost:11111';
const ws = new WebSocket(WS_URL,'echo-protocol');
// var W3CWebSocket = require('websocket').w3cwebsocket;

// var ws = new W3CWebSocket('ws://192.168.1.2:8082/', 'echo-protocol');
ws.onopen = () => console.log(`Connected to ${WS_URL}`);
let blobArray=[]
ws.onmessage = message => {
  //scene.add(cubeMesh)
      console.info(message);
      //var img = document.querySelector('img');
      //img.src=message.data;
      const texture = new THREE.TextureLoader().load('./cat.jpg' );
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: '#ff0000',
       // map:texture
     })
     const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
     scene.add(cubeMesh)
  //    var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
  //     map:new THREE.TextureLoader('./cat.jpg')
  // });
  // img.map.needsUpdate = true; //ADDED

  // // plane
  // var plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200),img);
  // plane.overdraw = true;
  // scene.add(plane);
  
     // console.log(texture);
      
// texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
//         let material = new THREE.MeshLambertMaterial({map: texture});
//         let cubeSize = 150;
//         let cubeMesh = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
// var cube = new THREE.Mesh(cubeMesh, material);
//scene.background=texture;

renderer.render(scene, camera)



}
