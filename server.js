#!/usr/bin/env node
const express = require('express');
const app = express();
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT, 10) || 8080;
const publicDir = process.argv[2] || __dirname + '/public';
const path = require('path');

// library for signing tokens
const jwt = require('jsonwebtoken');
const fs = require('fs');

//
var jwt2 = require('apple-music-jwt');

var keyID = 'VASL8WRP6R';
var teamID = 'KQF8DWCCU8';
const private_key = fs.readFileSync('./apple_private_key.p8').toString(); // read your private key from your file system

var apitoken = jwt2.generate(keyID, teamID, private_key);

app.get('/', function (req, res) {
  res.sendFile(path.join(publicDir, '/index.html'));
});

const team_id = 'KQF8DWCCU8'; // your 10 character apple team id, found in https://developer.apple.com/account/#/membership/
const key_id = 'VASL8WRP6R'; // your 10 character generated music key id. more info https://help.apple.com/developer-account/#/dev646934554
const token = jwt.sign({}, private_key, {
  algorithm: 'ES256',
  expiresIn: '180d',
  issuer: team_id,
  header: {
    alg: 'ES256',
    kid: key_id
  }
});

app.get('/token', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({token: token}));
});

app.use(express.static(publicDir));

console.log('Listening at', publicDir, hostname, port);
app.listen(8080);
