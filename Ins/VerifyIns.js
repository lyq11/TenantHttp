const Tars = require("@tars/rpc").client
const VerifyRPC = require("../Proxy/VerifyProxy").civetTenantCenter
class AuthProcessIns {
    proxy = null
    constructor() {
        Tars.setProperty("locator", "tars.tarsregistry.QueryObj@tcp -h 172.25.0.3 -t 60000 -p 17890")
        this.proxy = Tars.stringToProxy(VerifyRPC.VerifyProxy,"civetTenantCenter.TenantUserAuthTars.VerifyObj")
    }
    static getInstance(){
        if(!AuthProcessIns.instance){
            AuthProcessIns.instance = new AuthProcessIns()
        }
        return AuthProcessIns.instance
    }
    // eslint-disable-next-line max-params
    verify(token,path,success,fail){
        let req = new VerifyRPC.VeifyReq()
        req.readFromObject({
            token:token,
            verifyHeaders:{"paths":path}
        })
        this.proxy.verify(req).then((data)=>{
            console.log("接口返回值：", data.response.return)
            console.log("接口返回字段：", data.response.arguments.rsp)
            console.log("baohande",data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            success(data.response.arguments.rsp)
        }).catch((e)=>{
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
}
exports =module.exports = AuthProcessIns