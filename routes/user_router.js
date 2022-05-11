'use strict' //untuk menjalankan hanya pada file ini

const express = require("express")
const userController = require('../controllers/user_ctrl')
const router = new express.Router();

router.get("/getAll", userController.getAll)
router.get("/getId/:id", userController.getId)
router.post("/add", userController.add)
router.put("/update/:id", userController.update)
router.delete("/delete/:id", userController.delete)

module.exports  = router