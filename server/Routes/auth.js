const express = require("express");
const router = express.Router();
const { myaccount, list, login, register, update } = require("../Controllers/user") 
const { auth } = require("../Middleware/auth")
router.get("/list",list)
router.get("/my_account/:id",auth,myaccount);
router.post("/login",login)
router.post("/register",register)
router.put("/auth/:id",update)
module.exports = router;
