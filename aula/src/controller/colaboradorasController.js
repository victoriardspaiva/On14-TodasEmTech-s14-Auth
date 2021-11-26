const colaboradoras = require("../models/colaboradoras")
const secret = process.env.SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const getAll = (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1];
  console.log('Meu header:', token);
  if (!token) {
    return res.status(401).send('erro no header');
  }
  
  colaboradoras.find(function (err, colaboradoras) {
    res.status(200).send(colaboradoras)
  })

  jwt.verify(token, secret, function (erro) {
    if (erro) {
      return res.status(403).send('Não autorizado!')
    }
  }) // falta isso no readme

};

const postColaboradora = (req, res) => {  
  let colaboradora = new colaboradoras(req.body);
  
  // ajustar isso
  let newSenha = bcrypt.hashSync(req.body.password, 10)  
  colaboradora.password = newSenha
  
  console.log(colaboradora);
  colaboradora.save(function (err) {
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(colaboradora.toJSON());
  })
};

module.exports = {
  getAll,
  postColaboradora,
}
