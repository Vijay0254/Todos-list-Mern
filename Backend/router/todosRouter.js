const express = require("express")
const router = express.Router()
const { todosPostController, todosGetController, todosPutController, todosDeleteController } = require("../controller/todosController")

router.post("/", todosPostController)
router.get("/", todosGetController)
router.put("/:id", todosPutController)
router.delete("/:id", todosDeleteController)

module.exports = router