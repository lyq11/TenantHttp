const express = require("express")
const router = express.Router()
const check = require("express-validator/check").check
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../Ins/UserMgmtIns").getInstance()
router.post("/mgmt/del", [
    check("userID")
        .notEmpty()
        .isNumeric()
        .withMessage("Password can not be empty")
], function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({errors: errors.mapped()})
    }
    console.log(req.header("x-token"))
    if (req.header("x-token") === undefined || req.header("x-token") === "") {
        res.json({status: -1, message: "Query fail"})
    } else {
        rpcIns.user_del(req.header("x-token"), req.body["userID"],  (result) => {
            if (result === 1) {
                res.json({status: 1, message: "del success"})
            } else {
                res.json({status: -1, message: "del fail"})
            }
        }, (error) => {
            res.json({status: -1, message: error})
        })
    }
})
module.exports = router
