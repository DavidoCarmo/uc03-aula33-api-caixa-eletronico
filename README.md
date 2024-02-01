# API Caixa Eletrônica

Aplicaçao criada durante as aulas de curso
 do programador webe do senac.

Este programa simula as seguintes
 operaçoes de um caixa eletronico:

 - [x] Rota de boas vindas 
 - [] Rota extrato 
 - [x] Rota saldo
 - [x] Rota deposito
 - [] Rota saque

Nao esta contemplado o acesso via cartao e senhae nem salvamento de informacoes em um bancoa de dados.

## regras do negocio

Na rota de deposicao vai receber a conta do parametro e o valor pelo corpo 
de requisicoes validando que o valir precisa sert um numero inteiro se for dinheiro e qualquer valor se for cheque  nao debe permitir depositos de valores negativos

### GET  /conta/:numeor_conta

 A rota de boas vindas ira mostra o nome do cliente  e o numero da conta e saldo atual,baseado no numeoro da conta passado por parametro.

### GET /conta/:numero_conta/extrato
 Na rota do extrato ira retornar a lista de todas as transacoes e o saldo atual, baseado no numero da conta passado por parametro
### GET /conta/:numeor_conta/saldo
 Na rota de saldo ira mostrar o saldo atual calculando apartir das transicoes, baseado no numero     da conta passado por parametro.



```json
{
     "valor":100,
     "tipo_deposito" "DINHEIRO"
}
{
    "valor":100.02,
    "tipo_deposito": "CHEQUE"
}
```

### POST /conta/:numero_conta/saque
Na rota de saque deve receber  a conta por parametro e o valor pelo corpo da requisicao validando que o valor precisa ser um numero inteiro e precisa ser maior do que zero

Exemplo de corpo da requisiçao quando for um saque:

```json
{
    "valor":100
}
```