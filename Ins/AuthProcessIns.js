const Tars = require("@tars/rpc").client
const TarsRPC = require("../Proxy/ProcessProxy").civetTenantCenter
const VerifyRPC = require("../Proxy/VerifyProxy").civetTenantCenter
class AuthProcessIns {
    proxy = null
    proxt2 =null
    constructor() {
        Tars.setProperty("locator", "tars.tarsregistry.QueryObj@tcp -h 172.25.0.3 -t 60000 -p 17890")
        this.proxy = Tars.stringToProxy(TarsRPC.ProcessProxy,"civetTenantCenter.TenantUserAuthProcess.ProcessObj")
        this.proxt2 = Tars.stringToProxy(VerifyRPC.VerifyProxy,"civetTenantCenter.TenantUserAuthTars.VerifyObj")
    }
    static getInstance(){
        if(!AuthProcessIns.instance){
            AuthProcessIns.instance = new AuthProcessIns()
        }
        return AuthProcessIns.instance
    }
    verify(token,path,success,fail){
        let req = new VerifyRPC.VeifyReq()
        req.readFromObject({
            token:token,
            verifyHeaders:{"rights":path}
        })
        this.proxt2.verify(req).then((data)=>{
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
    logout(token,success,fail){
        this.proxy.logout(token).then((data)=>{
            console.log("接口返回值：", data.response.return)
            console.log("接口返回字段：", data.response.arguments.result)
            console.log("baohande",data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            console.log("STRING:", data.response.arguments.token)
            success(data.response.arguments.result,data.response.arguments.token)
        }).catch((e)=>{
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    login(username,password,company,success,fail){
        let newReq = new TarsRPC.UserAuthDataInfo()
        newReq.readFromObject({
            username:username,
            password:password,
            companyID:company,
            logintype:"web"
        })
        this.proxy.login(newReq).then((data)=>{
            console.log("接口返回值：", data.response.return)
            console.log("接口返回字段：", data.response.arguments.result)
            console.log("baohande",data.response.arguments)
            console.log("接口返回字段：", data.response.arguments.token)
            console.log("调用耗时", data.response.costtime)
            console.log("STRING:", data.response.arguments.token)
            success(data.response.arguments.result,data.response.arguments.token)``
        }).catch((e)=>{
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
}
exports =module.exports = AuthProcessIns