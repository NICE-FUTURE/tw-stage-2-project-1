'use strict';
const HTTP = require('http');
const FS = require('fs');
const MONGO_CLIENT = require('mongodb').MongoClient;
const DB_URL = "mongodb://localhost:27017/todolist";

let dbClient;

MONGO_CLIENT.connect(DB_URL, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    dbClient = db.db("todolist");
});

let server = HTTP.createServer(function (request, response) {
    console.log(request.method + ': ' + request.url);
    if (request.url === '/') {
        FS.readFile('index.html', (err, info) => {
            response.write(info);
            response.end();
        });
    } else if (request.url.startsWith('/statics')) {
        FS.readFile(__dirname + request.url, (err, info) => {
            response.write(info);
            response.end();
        });
    } else if (request.url === '/todo') {
        switch (request.method) {
            case 'POST':

                break;
            case 'GET':

                break;
            case 'PUT':

                break;
            case 'DELETE':

                break;
        }
    }
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');