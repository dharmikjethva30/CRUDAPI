const cluster = require("cluster");
const http = require("http");
const os = require("os");
const express = require("express");
const dotenv = require('dotenv')

cluster.setupPrimary({
    exec: "./app.js"
});

dotenv.config()
const app = express();
const port = process.env.PORT || 4000;

const no_of_cpus = os.cpus().length;
const workers = [];

for (let i = 0; i < no_of_cpus; i++) {
    workers[i] = cluster.fork();
}

cluster.on("message", (worker, data) => {
    for (let i = 0; i < workers.length; i++) {
        if ((worker.id - 1) != i) {
            workers[i].send(data);
        }
    }
});


let lastWorker = 0;


//middlewares
app.use((req, res, next) => {
    lastWorker = (lastWorker + 1) % no_of_cpus;
    req.currentWorker = workers[lastWorker];
    console.log(`forawrded to ${port + req.currentWorker.id}`);
    next();
});

app.use((req, res) => {
    const request = http.request({
        host: '127.0.0.1',
        port: port + req.currentWorker.id,
        method: req.method,
        path: req.url,
        headers: req.headers
    }, response => {
        res.writeHead(response.statusCode, response.headers);
        response.pipe(res);
    });

    req.pipe(request);
});

app.listen(port, () => {
    console.log("Server running on multiple instances");
});
