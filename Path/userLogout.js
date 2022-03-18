const express = require("express")
const router = express.Router()
const rpcIns = require("../Ins/AuthProcessIns").getInstance()

router.post("/logout",function (req, res) {
        console.log(req.header("x-token"))
        if (req.header("x-token") === undefined || req.header("x-token") === ""){
                res.json({status: -1, message: "logout fail"})
        }else{
                rpcIns.logout(req.header("x-token"),(result,token)=>{
                        if (result === 1){
                                res.json({status: 1, message: token})
                        }else {
                                res.json({status: -1, message: token})
                        }
                },(error)=>{
                        res.json({status: -1, message: error})
                })
        }

})
module.exports = router
