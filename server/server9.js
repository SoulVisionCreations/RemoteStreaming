
// #!/usr/bin/env node
const fs = require('fs')
var count=0;
var WebSocketServer = require('websocket').server;
var http = require('http');
const child_process = require('child_process'); // To be used later for running FFmpeg

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(11119, function() {
    console.log((new Date()) + ' Server is listening on port 11119');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false ,maxReceivedFrameSize: 131072,
    maxReceivedMessageSize: 10 * 1024 * 1024

});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
let connectedClients = []
// wsServer.on('connection', (ws, req) => {
//     console.log('Connected');
//     // add new connected client
//     connectedClients.push(ws);
//     // listen for messages from the streamer, the clients will not send anything so we don't need to filter
//     // ws.on('message', data => {
//     //     // send the base64 encoded frame to each connected ws
//     //     console.log("anm data",data);
//     //     connectedClients.forEach((ws, i) => {
//     //         if (ws.readyState === ws.OPEN) { // check if it is still connected
//     //             ws.send(data); // send
//     //         } else { // if it's not connected remove from the array of connected ws
//     //             connectedClients.splice(i, 1);
//     //         }
//     //     });
//     // });
// });
// const ffmpeg = child_process.spawn('ffmpeg', [
//     '-i', 'pipe:0',
//     '-f', 'webm',
//     '-cluster_size_limit', '2M',
//     '-cluster_time_limit', '5100',
//     '-content_type', 'video/webm',
//     '-r', '30',
//     '-ac', '2',
//     '-acodec', 'libopus',
//     '-b:a', '96K',
//     '-vcodec', 'libvpx',
//     '-b:v', '1M',//'2.5M',
//     '-crf', '60',
//     '-bufsize', '2M',
//     '-g', '10',
//     '-deadline', 'realtime',
//     '-threads', '8',
//     '-keyint_min', '10',
//     //'icecast://admin:hackme@localhost:8000/Earth'
//     // 'test.mkv'
//     // 'udp://@:23000'
//     'udp://127.0.0.1:23000'
//     // 'test.mkv'
// ]);

// const ffmpeg = child_process.spawn('ffmpeg', [
//   '-i', 'pipe:0',
//       '-cluster_size_limit', '2M',
//     '-cluster_time_limit', '5100',
//     '-content_type', 'video/webm',
//     '-r', '30',
//     '-ac', '2',
//     //'-acodec', 'libopus',
//     '-b:a', '96K',
//     '-vcodec', 'libvpx',
//     '-b:v', '1M',//'2.5M',
//     '-crf', '60',
//     '-bufsize', '2M',
//     '-g', '10',
//     '-deadline', 'realtime',
//     '-threads', '8',
//     '-keyint_min', '10',
//   // '-cluster_size_limit', '2M',
//   // '-cluster_time_limit', '5100',
//   // '-content_type', 'video/webm',
//  '-f','hls','-hls_time','4','-hls_playlist_type','event','stream.m3u8'
 
   
//  ]);


// const  ffmpeg = child_process.spawn('ffmpeg', [
//   '-i', 'pipe:0',
//   '-c:v','libvpx','-minrate','1M','-maxrate','1M','-b:v','1M','-c:a','libvorbis','output_'+count+'.webm'

// ]);
// //ffmpeg -y -i http://ip:8080/hdmi -codec copy -map 0 -f segment -segment_time 10 -segment_format mpegts -segment_list_flags +live -segment_list test.m3u8 -segment_list_type m3u8 stream%05d.ts


// ffmpeg.on('close', (code, signal) => {
//     console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
//     //ws.terminate();
//   });
  
//   // Handle STDIN pipe errors by logging to the console.
//   // These errors most commonly occur when FFmpeg closes and there is still
//   // data to write.  If left unhandled, the server will crash.
//   ffmpeg.stdin.on('error', (e) => {
//     console.log('FFmpeg STDIN Error', e);
//   });
  
//   // FFmpeg outputs all of its messages to STDERR.  Let's log them to the console.
//   ffmpeg.stderr.on('data', (data) => {
//     console.log('FFmpeg STDERR:', data.toString());
//   });
 
         // ffmpeg.stdin.close();



    // const  ffmpeg_hls = child_process.spawn('ffmpeg', [
    //   '-i', 'pipe:0',
    //   '-c:v','libvpx','-minrate','1M','-maxrate','1M','-b:v','1M','-c:a','libvorbis','output3.webm'
    
    // ]);
    //ffmpeg -y -i http://ip:8080/hdmi -codec copy -map 0 -f segment -segment_time 10 -segment_format mpegts -segment_list_flags +live -segment_list test.m3u8 -segment_list_type m3u8 stream%05d.ts
    
    // ffmpeg_hls.on('close', (code, signal) => {
    //   console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
    //   //ws.terminate();
    // });
    
    // // Handle STDIN pipe errors by logging to the console.
    // // These errors most commonly occur when FFmpeg closes and there is still
    // // data to write.  If left unhandled, the server will crash.
    // ffmpeg_hls.stdin.on('error', (e) => {
    //   console.log('FFmpeg STDIN Error', e);
    // });
    
    // // FFmpeg outputs all of its messages to STDERR.  Let's log them to the console.
    // ffmpeg_hls.stderr.on('data', (data) => {
    //   console.log('FFmpeg STDERR:', data.toString());
    // });
    setInterval(function(){console.log(connectedClients.length)},3000);
wsServer.on('request', function(request){

  


    // const ffmpeg = child_process.spawn('ffmpeg', [
    //     '-i', 'pipe:0',
    //     '-f', 'webm',
    //     '-cluster_size_limit', '2M',
    //     '-cluster_time_limit', '5100',
    //     '-content_type', 'video/webm',
    //     '-r', '30',
    //     '-ac', '2',
    //     '-acodec', 'libopus',
    //     '-b:a', '96K',
    //     '-vcodec', 'libvpx',
    //     '-b:v', '1M',//'2.5M',
    //     '-crf', '60',
    //     '-bufsize', '2M',
    //     '-g', '10',
    //     '-deadline', 'realtime',
    //     '-threads', '8',
    //     '-keyint_min', '10',
    //     //'icecast://admin:hackme@localhost:8000/Earth'
    //     // 'test.mkv'
    //     // 'udp://@:23000'
    //     'udp://127.0.0.1:23000'
    // ]);
    //######################################################

    // const ffmpeg = child_process.spawn('ffmpeg', [
    //     // Facebook requires an audio track, so we create a silent one here.
    //     // Remove this line, as well as `-shortest`, if you send audio from the browser.
    //     '-f', 'lavfi', '-i', 'anullsrc',
        
    //     // FFmpeg will read input video from STDIN
    //     '-i', '-',
        
    //     // Because we're using a generated audio source which never ends,
    //     // specify that we'll stop at end of other input.  Remove this line if you
    //     // send audio from the browser.
    //     '-shortest',
        
    //     // If we're encoding H.264 in-browser, we can set the video codec to 'copy'
    //     // so that we don't waste any CPU and quality with unnecessary transcoding.
    //     // If the browser doesn't support H.264, set the video codec to 'libx264'
    //     // or similar to transcode it to H.264 here on the server.
    //     // '-vcodec', 'copy',
    //     '-vcodec', 'copy',
    //     // AAC audio is required for Facebook Live.  No browser currently supports
    //     // encoding AAC, so we must transcode the audio to AAC here on the server.
    //     //'-acodec', 'aac',
        
    //     // FLV is the container format used in conjunction with RTMP
    //     '-f', 'flv',
        
    //     // The output RTMP URL.
    //     // For debugging, you could set this to a filename like 'test.flv', and play
    //     // the resulting file with VLC.  Please also read the security considerations
    //     // later on in this tutorial.
    //     //rtmpUrl 
    //     "udp://localhost:3005"
    //    //'test.flv'
    //   ]);
      
      // If FFmpeg stops for any reason, close the WebSocket connection.
    //   ffmpeg.on('close', (code, signal) => {
    //     console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
    //     ws.terminate();
    //   });
      
    //   // Handle STDIN pipe errors by logging to the console.
    //   // These errors most commonly occur when FFmpeg closes and there is still
    //   // data to write.  If left unhandled, the server will crash.
    //   ffmpeg.stdin.on('error', (e) => {
    //     console.log('FFmpeg STDIN Error', e);
    //   });
      
    //   // FFmpeg outputs all of its messages to STDERR.  Let's log them to the console.
    //   ffmpeg.stderr.on('data', (data) => {
    //     console.log('FFmpeg STDERR:', data.toString());
    //   });




       
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connectedClients.push(connection);
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            //console.log('Received Message utf: ',JSON.parse( message.utf8Data ));
            
           // console.log('Received utf Message ' + (JSON.parse(message.utf8Data)));
             connection.sendUTF("");
            connectedClients.forEach((ws, i) => {
                if (ws.readyState === ws.OPEN && ws!=connection) { // check if it is still connected
                    //   ws.sendUTF(message.utf8Data);
                     ws.send(message.utf8Data); // send
                } else if (ws!=connection) { // if it's not connected remove from the array of connected ws
                   console.log("removed from here");
                    connectedClients.splice(i, 1);
                }
            });
        }
        else if (message.type === 'binary') {

          //console.log('Received Message: ',message.utf8Data );
          // const  ffmpeg = child_process.spawn('ffmpeg', [
          //   '-i', 'pipe:0',
          //   '-c:v','libvpx','-minrate','1M','-maxrate','1M','-b:v','1M','-c:a','libvorbis','output_'+count+'.webm'
          
          // ]);
          // //ffmpeg -y -i http://ip:8080/hdmi -codec copy -map 0 -f segment -segment_time 10 -segment_format mpegts -segment_list_flags +live -segment_list test.m3u8 -segment_list_type m3u8 stream%05d.ts
          
          
          // ffmpeg.on('close', (code, signal) => {
            //   console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
            //   //ws.terminate();
            // });
            
            // // Handle STDIN pipe errors by logging to the console.
            // // These errors most commonly occur when FFmpeg closes and there is still
            // // data to write.  If left unhandled, the server will crash.
            // ffmpeg.stdin.on('error', (e) => {
            //   console.log('FFmpeg STDIN Error', e);
            // });
            
            // // FFmpeg outputs all of its messages to STDERR.  Let's log them to the console.
            // ffmpeg.stderr.on('data', (data) => {
            //   console.log('FFmpeg STDERR:', data.toString());
            // });



          count++;
            // if(count==1) make_webm(message.binaryData);
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            ffmpeg.stdin.write(message.binaryData);
           // count++;
            
           console.log('Received Binary Message ' + message);
            //fs.writeFile('./Output.txt', (message));
            //fs.writeFileSync('./Output.webm', (message.binaryData));
             connection.sendBytes(message.binaryData);
             //connection.send("hello");
            connectedClients.forEach((ws, i) => {
                if (ws.readyState === ws.OPEN) { // check if it is still connected
                    //ws.terminate();
                     //ws.send(message.toString()); // sendi
                     let obj=message.binaryData;
                    // ffmpeg.stdin.write(JSON.stringify(obj.data));

                     console.log(typeof(obj));
                    // ws.send((JSON.stringify(message)));
                     ws.sendBytes(message.binaryData);
                } else { // if it's not connected remove from the array of connected ws
                    connectedClients.splice(i, 1);
                }
            });

        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.' + reasonCode + description);
        connectedClients.forEach((ws, i) => {
            if(ws===connection)
            {
                console.log("removing");
                connectedClients.splice(i, 1);
            }
           
       }); 
    });
});