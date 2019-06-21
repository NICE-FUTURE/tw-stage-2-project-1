'use strict';
const HTTP = require('http');
const FS = require('fs');
const MONGO_CLIENT = require('mongodb').MongoClient;
const DB_URL = "mongodb://localhost:27017/todolist";

let dbClient;

MONGO_CLIENT.connect(DB_URL, {useNewUrlParser: true}, function (err, db) {
    if (err) throw err;
    console.log("数据库已连接!");
    dbClient = db.db("todolist");
});

function pushTodolist(response, data) {
    if (data.opt === "todo") {
        dbClient.collection("todo").insertOne({'data': data.data}, (err, result) => {
            if (err) throw err;
            console.log("insert one todo successfully.");
            response.end();
        });
    }
    else if (data.opt === "done") {
        dbClient.collection("done").insertOne({'data': data.data}, (err, result) => {
            if (err) throw err;
            dbClient.collection("todo").deleteOne({'data': data.data}, (err, result)  => {
                if (err) throw err;
                console.log("done one from todo succesfully.");
                response.end();
            });
        });
    }
    else if (data.opt === "delete") {
        dbClient.collection("todo").deleteOne({'data': data.data}, (err, result)  => {
            if (err) throw err;
            console.log("delete one from todo succesfully.");
            response.end();
        });
    }
    else if (data.opt === "clear") {
        dbClient.collection("done").deleteMany({}, (err, result)  => {
            if (err) throw err;
            console.log("delete all from done succesfully.");
            response.end();
        });
    }
    else if (data.opt === "reset") {
        dbClient.collection("done").deleteOne({'data': data.data}, (err, result)  => {
            if (err) throw err;
            dbClient.collection("todo").insertOne({'data': data.data}, (err, result)  => {
                if (err) throw err;
                console.log("reset one from done succesfully.");
                response.end();
            });
        });
    }
}

function pullTodolist(response) {
    dbClient.collection("todo").find({}, {'projection': {'_id': 0}}).toArray((todoErr, todos) => {
        if (todoErr) throw err;
        dbClient.collection("done").find({}, {'projection': {'_id': 0}}).toArray((doneErr, dones) => {
            if (doneErr) throw err;
            response.end(JSON.stringify(
                {'todo': todos.map((ele)=>{return Object.values(ele)[0]}),
                 'done': dones.map((ele)=>{return Object.values(ele)[0]})}
            ));
        });
    });
}

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
         // Set CORS headers
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        let data = "";
        switch (request.method) {
            case 'POST':
                console.log("post!");
                break;
            case 'GET':
                console.log("get!");
                pullTodolist(response);
                break;
            case 'PUT':
                data = "";
                console.log("put!");
                request.on("data", (chunk)=>{
                    data += chunk;
                });
                request.on("end", () => {
                    data = JSON.parse(data);
                    pushTodolist(response, data);
                });
                break;
            case 'DELETE':
                console.log("delete!");
                break;
            case 'OPTIONS':
                response.writeHead(200);
                response.end();
                break;
        }
    }
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');