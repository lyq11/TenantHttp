const express = require("express")
const router = express.Router()
const rpcIns = require("../Ins/UserMgmtIns").getInstance()
const check = require("express-validator/check").check
const validationResult = require("express-validator/check").validationResult
router.post("/mgmt",
    [
        check("number")
            .notEmpty()
            .isNumeric()
            .withMessage("number can not be empty"),
        check("pages")
            .notEmpty()
            .isNumeric()
            .withMessage("pages can not be empty"),
    ],
    function (req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({errors: errors.mapped()})
        }
        console.log(req.header("x-token"))
        if (req.header("x-token") === undefined || req.header("x-token") === "") {
            res.json({status: -1, message: "Query fail"})
        } else {
            rpcIns.queryAll(req.header("x-token"), req.body["number"], req.body["pages"], (result, token) => {
                if (result === 1) {
                    res.json({status: 1, message: token})
                } else {
                    res.json({status: -1, message: token})
                }
            }, (error) => {
                res.json({status: -1, message: error})
            })
        }
    })
module.exports = router
