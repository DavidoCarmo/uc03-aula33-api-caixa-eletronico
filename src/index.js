import express from 'express'
import  contaRotas  from './rotas/conta.rotas.js'
import mainRotas from './rotas/main.rotas.js'
const app = express()
const port = 5000
 
app.use(express.json())

app.get("/status",mainRotas.status)

app.use('/contas', contaRotas.router )


app.listen(port, () => {
  console.log(`API radando na porta ${port}`)
});
 