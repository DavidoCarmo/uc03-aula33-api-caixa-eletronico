
const { request } = require('http')
const express = require('express')
const { randomUUID } = require('crypto')

const app = express()
const port = 5000

app.use(express.json())
let contas = [
    {
        "id": randomUUID,
    "nome": "Davi",
    "numero_conta":"12345-6",
    "agencia":"1234",
    "saldo": 0,
},
{
    "id": randomUUID,
    "nome": "Murilo",
    "numero_conta":"5432-1",
    "agencia":"1234",
    "saldo": 0,
},
{
    "id": randomUUID,
    "nome": "Eberto",
    "numero_conta":"1313-0",
    "agencia":"1234",
    "saldo": 0,
},
];

app.get("/status", (request, response) => {
  response.send({ "status": "ok" })
})


//Rota Boas Vindas 
app.get('/conta/:numero_conta',(request,response) =>{
    const {numero_conta} = request.params;
    
    const contaEncontrada = contas.find(
        (conta) => conta.numero_conta === numero_conta )
        
        
        if(contaEncontrada) {
            //retornar os dados do conta
            response.send({
                "nome": contaEncontrada.nome,
                "numero_conta":contaEncontrada.numero_conta,
                "saldo":contaEncontrada.saldo
            })
        } else {
            response.status(404).send({
                "error":"conta nao encontrada"
            })
        }

    })
    app.listen(port, () => {
      console.log(`API rodando na porta ${port}`)
    })