const express = require("express");
const router = express.Router();
const { create,data,update,del,updatePosition} = require("../Controllers/task") 
const { auth } = require("../Middleware/auth")
router.post("/task/create",create)
router.get("/task/data",auth,data)
router.get("/task/data/:id",auth,data)
router.put("/task/update/:id",auth,update)
router.put("/task/updatePosition",auth,updatePosition)
router.delete("/task/del/:id",auth,del)
module.exports = router;
