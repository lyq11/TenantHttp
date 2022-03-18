const mid = require("../Ins/VerifyIns").getInstance()
function checkToken(req, res, next) {
    console.log(req.route.path)
    if (req.headers["x-token"]){
        mid.verify(req.headers["x-token"],req.route.path,(data)=>{
            console.log(data)
            if (data){
                if (data.ret === 0){
                    next()
                }
                else {
                    res.json({status: -1, message: data.context})
                }
            }else{
                res.json({status: -2, message: "验证错误"})
            }
        },()=>{
            res.json({status: -3, message: "接口错误"})
        })

    }else{
        res.json({status: -4, message: "参数错误"})
    }
}
exports = module.exports = checkToken