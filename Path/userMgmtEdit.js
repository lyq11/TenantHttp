const express = require("express")
const router = express.Router()
const check = require("express-validator/check").check
const validationResult = require("express-validator/check").validationResult

router.post("/user/login", [
    check("password")
        .notEmpty()
        .withMessage("Password can not be empty"),
    check("username")
        .notEmpty()
        .withMessage("username can not be empty"),
    check("vercode")
        .notEmpty()
        .isLength({min: 6})
        .withMessage("ust be at least 6 chars long")
], function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({errors: errors.mapped()})
    }
})
module.exports = router
