const Tars = require("@tars/rpc").client
const VerifyRPC = require("../Proxy/TenantProcessProxy").civetTenantCenter
class UserMgmtIns {
    proxy = null
    constructor() {
        Tars.setProperty("locator", "tars.tarsregistry.QueryObj@tcp -h 172.25.0.3 -t 60000 -p 17890")
        this.proxy = Tars.stringToProxy(VerifyRPC.TenantProcessProxy,"civetTenantCenter.TenantUserManagment.TenantProcessObj")
    }
    static getInstance(){
        if(!UserMgmtIns.instance){
            UserMgmtIns.instance = new UserMgmtIns()
        }
        return UserMgmtIns.instance
    }
    queryAll(token,n,p,success,fail){
        let strings = token.split(".")
        let b = new Buffer((strings[1].replace(/-/g, "+").replace(/_/g, "/")), "base64").toString()

        const userinfo = JSON.parse(decodeURIComponent(encodeURIComponent(b)))
        this.proxy.userQueryAll(userinfo["companyID"],n,p).then((data)=>{
            console.log("接口返回值：", data.response.return)
            console.log("接口返回字段：", data.response.arguments.UserMemberList)
            console.log("baohande",data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            success(data.response.arguments.result,data.response.arguments.UserMemberList.value)
        }).catch((e)=>{
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    user_Add(token,username,name,password,email,number,success,fail){
        let strings = token.split(".")
        let b = new Buffer((strings[1].replace(/-/g, "+").replace(/_/g, "/")), "base64").toString()

        const userinfo = JSON.parse(decodeURIComponent(encodeURIComponent(b)))
        let req = new VerifyRPC.UserBasicInfo()
        req.readFromObject({
                username:username,
                password:password,
                name:name,
                email:email,
                number:number,
                role :"0",
                enable:"0",
                createTime:new Date().getTime()
        })
        this.proxy.userAdd(userinfo["companyID"],req).then((data)=>{
            console.log("接口返回值：", data.response.return)
            console.log("baohande",data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            success(data.response.arguments.result)
        }).catch((e)=>{
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    user_del(token,userID,success,fail){
        let strings = token.split(".")
        let b = new Buffer((strings[1].replace(/-/g, "+").replace(/_/g, "/")), "base64").toString()

        const userinfo = JSON.parse(decodeURIComponent(encodeURIComponent(b)))
        this.proxy.userDelete(userinfo["companyID"],userID).then((data)=>{
            console.log("接口返回值：", data.response.return)
            console.log("baohande",data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            success(data.response.arguments.result)
        }).catch((e)=>{
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    user_edit(token,userID,success,fail){
        let strings = token.split(".")
        let b = new Buffer((strings[1].replace(/-/g, "+").replace(/_/g, "/")), "base64").toString()

        const userinfo = JSON.parse(decodeURIComponent(encodeURIComponent(b)))
        this.proxy.userDelete(userinfo["companyID"],userID).then((data)=>{
            console.log("接口返回值：", data.response.return)
            console.log("baohande",data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            success(data.response.arguments.result)
        }).catch((e)=>{
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }


}
exports =module.exports = UserMgmtIns
