const express = require("express")
const router = express.Router()
const controller = require("../controller/tarefas")

router.get("/tarefas", controller.getAll)

module.exports = router;