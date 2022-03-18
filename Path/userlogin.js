const express = require("express")
const router = express.Router()
const check = require("express-validator/check").check
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../Ins/AuthProcessIns").getInstance()
router.post("/login",[
    check("password")
        .notEmpty()
        .withMessage("Password can not be empty"),
    check("username")
        .notEmpty()
        .withMessage("username can not be empty"),
    check("companyID")
        .notEmpty()
        .withMessage("ust be at least 6 chars long")
],function (req,res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.json({errors: errors.mapped()})
    }
    rpcIns.login(req.body["username"],req.body["password"],req.body["companyID"],(result,token)=>{
        if (result === 1){
            res.json({status: 1, message: token})
        }else {
            res.json({status: -1, message: token})
        }
    },(error)=>{
        res.json({status: -1, message: error})
    })
})
module.exports = router
