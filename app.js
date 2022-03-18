const express = require("express")
const app = express()
const userLogin = require("./Path/userlogin")
const userLogout = require("./Path/userLogout")
const userMgmt = require("./Path/userMgmt")
const userMgmtAdd = require("./Path/userMgmtAdd")
const userMgmtDel = require("./Path/userMgmtDel")
const bodyParser = require("body-parser")

const checkToken = require("./middleware/verify_mid")
app.all("/user/hello", checkToken)
app.all("/user/mgmt",checkToken)
app.all("/user/mgmt/add",checkToken)
app.all("/user/mgmt/del",checkToken)
app.get("/user/hello", (req, res) => {
  res.send("hello tars")
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



app.use("/user", userLogin,userLogout,userMgmt,userMgmtAdd,userMgmtDel)
app.use(function (req, res, next) {
  res.status(404).send("404 Not Found")
})

const hostname = process.env.IP || "0.0.0.0"
const port = process.env.PORT || 3002

app.listen(port, hostname,()=>{
    console.log(`server listening at ${hostname}:${port}`)
})