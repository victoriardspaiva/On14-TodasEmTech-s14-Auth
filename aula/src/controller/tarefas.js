const tarefas = require("../models/tarefas")
const secret = process.env.SECRET
const jwt = require('jsonwebtoken')

const getAll = (req, res) => {
    const authHeader = req.get('authorization');
    const token = authHeader.split(' ')[1];
    console.log('Meu header:', token);
    if (!token) {
        return res.status(401).send('erro no header');
    }

    tarefas.find(function (err, tarefas) {
        res.status(200).send(tarefas)
    })

    jwt.verify(token, secret, function (erro) {
        if (erro) {
            return res.status(403).send('Não autorizado!')
        }
    }) 
};

module.exports = { getAll }