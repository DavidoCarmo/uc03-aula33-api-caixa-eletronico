import { randomUUID } from 'crypto'

export default class Conta{
    constructor(nome_pessoa,agencia, numero_conta,tipo_conta,transacoes){
        this.pessoa_id = randomUUID();
        this.nome_pessoa = nome_pessoa; //objeto pessoa
        this.agencia = agencia;
        this.numero_conta = numero_conta;
        this.tipo_conta = tipo_conta;
        this.transacoes = transacoes || [];//lisat de objetos de trasacao
        this.saldo = 0
    }
}