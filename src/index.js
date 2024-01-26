const express = require('express')
const { request } = require('http')

const app = express()
const port = 5000
app.use(express.jason())

app.get("/status",(request,response) => {
    response.send({"status": "ok"})
})

app.listen(port,() =>{
    console.log (`API rodando na porta${port}`)
})