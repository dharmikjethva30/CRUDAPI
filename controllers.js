const cluster = require("cluster")
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');

const users = []

process.on("message", (message) => {

    if (message.action == "post") {
        users.push(message.body)
    }
    else if (message.action == "put") {
        users[message.useri] = message.body
    }
    else if (message.action == "delete") {
        users.splice(message.useri, 1)
    }
})

const get_allusers = async (req, res) => {

    res.status(200).send(users);

}

const get_oneuser = async (req, res) => {
    const uid = req.params.id
    if (!validator.isUUID(uid)) {
        res.status(400).send("invalid id")
        return
    }

    const useri = users.findIndex(user => user.id === uid)
    if (users[useri]) {
        res.status(200).send(users[useri])
    }
    else {
        res.status(404).send("user not found")
    }
}


const create_user = async (req, res) => {
    const uid = uuidv4()
    const user_data = req.body
    if (!user_data.username || !user_data.age || !user_data.hobbies) {
        res.status(400).send("invalid data")
        return
    }

    let newuser = {
        id: uid,
        username: user_data.username,
        age: user_data.age,
        hobbies: user_data.hobbies
    }
    users.push(newuser)
    if (cluster.worker) {
        process.send({
            action: "post",
            body: newuser
        })
    }
    res.status(201).send(newuser)
}

const update_user = async (req, res) => {
    const uid = req.params.id
    if (!validator.isUUID(uid)) {
        res.status(400).send("invalid id")
        return
    }

    const useri = users.findIndex((user) => user.id === uid)

    if (useri !== -1) {
        var user_data = req.body
        var newName = user_data.username || users[useri].username
        var newAge = user_data.age || users[useri].age
        var newHobbies = user_data.hobbies || users[useri].hobbies

        users[useri] = {
            id: uid,
            username: newName,
            age: newAge,
            hobbies: newHobbies
        }
        if (cluster.worker) {
            process.send({
                action: "put",
                useri: useri,
                body: users[useri]
            })
        }
        res.status(200).send(users[useri])
    }
    else {
        res.status(404).send("user not found")
    }
}


const delete_user = async (req, res) => {
    const uid = req.params.id
    if (!validator.isUUID(uid)) {
        res.status(400).send("invalid id")
        return
    }

    const useri = users.findIndex((user) => user.id === uid)

    if (useri !== -1) {
        users.splice(useri, 1)
        if (cluster.worker) {
            process.send({
                action: "delete",
                useri: useri
            })
        }
        res.status(204).send()
    } else {
        res.status(404).send("user not found")
    }
}

module.exports = { get_oneuser, get_allusers, create_user, update_user, delete_user }