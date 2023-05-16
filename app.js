const express = require('express');
const cluster = require('cluster');
const dotenv = require('dotenv')
const { get_oneuser, get_allusers, create_user, update_user, delete_user } = require('./controllers');

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.get('/api/users', get_allusers);

app.get('/api/users/:id', get_oneuser);

app.post('/api/users', create_user);

app.put('/api/users/:id', update_user);

app.delete('/api/users/:id', delete_user);

//global error handler
app.use((req, res) => {
    if (req.err) {
        res.status(500).send({ error: req.err })
    }
    else {
        res.status(404).send({ error: "404 page not found !" })
    }
})


if (cluster.isWorker) {
    app.set('port', port + cluster.worker.id);
}

const server = app.listen(app.get('port') || port, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
