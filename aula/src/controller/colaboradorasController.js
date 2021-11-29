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

const login = async(req, res) => {
  try {
    const user = colaboradoras.findOne({ email: req.body.email })

    if (!user) {
      return res.status(422).send({ message: `Email não encontrado!` })
    }
    const checkPassword = await bcr
       ypt.compare(req.body.password, user.password)

    if (!checkPassword) {
      res.status(422).send({ message: `Senha incorreta!` })
    }

    const token = jwt.sign({ id: user._id }, secret)

    res.status(200).json({
      message: `Token deu bom!`,
      token
    })

  } catch (e) {
    res.status(500).json({
      message: e.message
    })
  }
}

module.exports = {
  getAll,
  postColaboradora,
  login
}
