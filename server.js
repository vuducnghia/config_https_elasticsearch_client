var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/nginx/ssl/server.key', 'utf8');
var certificate = fs.readFileSync('/etc/nginx/ssl/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate, passphrase:'n123'};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(8080);
httpsServer.listen(8443, function(){
    console.log ('https');
});

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile('index.html');
})

var server = app.listen(8083, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)

})