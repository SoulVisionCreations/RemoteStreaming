/*
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
*  See LICENSE in the source repository root for complete license information.
*/
var tools = require('./launchchrome');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
var https = require('https');
var fs = require('fs');
const { randomUUID } = require('crypto');
var privateKey  = fs.readFileSync('ssl2/privkey1.pem', 'utf8');
var certificate = fs.readFileSync('ssl2/fullchain1.pem', 'utf8');

const { v4: uuidv4 } = require('uuid');

var credentials = {key: privateKey, cert: certificate};
//initialize express.
const app = express();

// Initialize variables.
const port = 80; // process.env.PORT || 3000;

// Configure morgan module to log all requests.
app.use(morgan('dev'));

// Set the front-end folder to serve public assets.
app.use(express.static('jsa'))

// Set up a route for index.html.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/jsa/index.html'));
});


app.get('/launch', (req, res) => {
    
    console.log(req.params);
    console.log(req.query);
    // id = uuidv4();
    id=req.query.id;
    let p1=req.query.port1,p2=req.query.port2
    tools.launch(req.query.skuId,id,p1,p2)
    result = {"id":id,"status":"success"}
    res.json(result)
    // res.sendFile(path.join(__dirname + '/jsa/index.html'));
    // res.send(req.params)
  });

app.get('/close', (req, res) => {
    
    console.log(req.params);
    console.log(req.query);
//fetch to matchmaker
    let id=req.query.id
    tools.closebrowser(id)
    
    https.get('https://amanraj.bond:8888/closeport?id='+id, (resp) => {
        let data = '';
      
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          //console.log(JSON.parse(data).explanation);
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });




    result = {"status":"success"}
    res.json(result);
    // res.sendFile(path.join(__dirname + '/jsa/index.html'));
    // res.send(req.params)
  });

// Start the server.
 // app.listen(port);

var httpsServer = https.createServer(credentials, app);

// // httpServer.listen(8080);
 httpsServer.listen(port);
console.log('Listening on port ' + port + '...');
