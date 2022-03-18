const express = require("express")
const router = express.Router()
const check = require("express-validator/check").check
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../Ins/UserMgmtIns").getInstance()
router.post("/mgmt/add", [
    check("password")
        .notEmpty()
        .isLength({min: 6})
        .withMessage("Password can not be empty"),
    check("username")
        .notEmpty()
        .withMessage("username can not be empty"),
    check("email")
        .notEmpty()
        .isEmail()
        .withMessage("ust be at least 6 chars long"),
    check("number")
        .notEmpty()
        .isLength({min: 6})
        .withMessage("ust be at least 6 chars long"),
    check("name")
        .notEmpty()
        .isLength({min: 6})
        .withMessage("ust be at least 6 chars long")
], function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({errors: errors.mapped()})
    }
    console.log(req.header("x-token"))
    if (req.header("x-token") === undefined || req.header("x-token") === "") {
        res.json({status: -1, message: "Query fail"})
    } else {
        rpcIns.user_Add(req.header("x-token"), req.body["username"], req.body["name"], req.body["password"], req.body["email"],req.body["number"],  (result) => {
            if (result === 1) {
                res.json({status: 1, message: "add success"})
            } else {
                res.json({status: -1, message: "add fail"})
            }
        }, (error) => {
            res.json({status: -1, message: error})
        })
    }
})
module.exports = router
