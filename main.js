const express = require("express")
const path = require("path")
const router = require("./router.js")
const PORT = 3000

const app = express()

app.use(express.json())
app.use(router)

app.listen(PORT, ()=> {
    console.log("server is running on port " + PORT)
})