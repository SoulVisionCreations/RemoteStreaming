/*
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
*  See LICENSE in the source repository root for complete license information.
*/

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
const port = 8888; // process.env.PORT || 3000;

// Configure morgan module to log all requests.
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);
app.use(morgan('dev'));

// Set the front-end folder to serve public assets.
//app.use(express.static('jsa'))

// Set up a route for index.html.
let list_port=[11111,11112,11113]
let list_portcopy=[11121,11122,11123]
//now a map of port/portcopy and id
let mapid=new Map()
let mapport=new Map()
setInterval(function () {
    console.log(mapport);
  }, 3000);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/jsa/index.html'));
});


app.get('/getavailableport', (req, res) => {
    
    console.log(req.params);
    console.log(req.query);
    // id = uuidv4();
    let id=req.query.id;
    //have to get available ports at this id
    let p1,p2;
    for (index = 0; index < list_port.length; index++) {
        if(mapport.get(list_port[index])==undefined)
        {
            p1=list_port[index];
            break;
        }
    } 
    for (index = 0; index < list_portcopy.length; index++) {
        if(mapport.get(list_portcopy[index])==undefined)
        {
            p2=list_portcopy[index];
            break;
        }
    } 
   
    if(p1==undefined || p2==undefined)
    {
        result = {"status":"failure"}
        res.json(result)
    }

    mapid.set(id,[p1,p2]);
    mapport.set(p1,id);
    mapport.set(p2,id);

    result = {"port1":p1,"port2":p2,"status":"success"}
    res.json(result)
    // res.sendFile(path.join(__dirname + '/jsa/index.html'));
    // res.send(req.params)
  });

  app.get('/closeport', (req, res) => {
    
    console.log(req.params);
    console.log(req.query);
    // id = uuidv4();
    id=req.query.id;
    //have to close port at this id
    let p=mapid.get(id);
    mapport.delete(p[0]);
    mapport.delete(p[1]);
    mapid.delete(id);
    result = {"status":"success"}
    res.json(result)
    // res.sendFile(path.join(__dirname + '/jsa/index.html'));
    // res.send(req.params)
  });

// Start the server.
 // app.listen(port);

var httpsServer = https.createServer(credentials, app);

// // httpServer.listen(8080);
 httpsServer.listen(port);
console.log('Listening on port ' + port + '...');
