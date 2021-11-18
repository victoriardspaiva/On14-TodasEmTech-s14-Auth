const colaboradoras = require("../models/colaboradoras")
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const getAll = (req, res) => {
  const authHearder = req.get('authorization')
  const token = authHearder.split(' ')[1];
  console.log(req.url);
  console.log(token);

  if (!token) {
    return res.status(401).send("Erro no header")
  }

  jwt.verify(token, SECRET, function (erro) {
    if (erro) {
      return res.status(403).send('Não autorizado!')
    }

    colaboradoras.find(function (err, colaboradoras) {
      res.status(200).send(colaboradoras)
    })
  })
}

const postColaboradora = (req, res) => {
  const senhaHash = bcrypt.hashSync(req.body.password, 10)
  req.body.password = senhaHash

  let colaboradora = new colaboradoras(req.body);
  colaboradora.save(function (err) {
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
};

module.exports = {
  getAll,
  postColaboradora,
}
