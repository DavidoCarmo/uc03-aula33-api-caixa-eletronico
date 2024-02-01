import { randomUUID } from 'crypto'

export default  class Transacao{
    constructor (tipo, valor, descricao){
        this.pessoa_id = randomUUID()
        this.tipo = tipo;
        this.valor = valor;
        this.descricao = descricao;
         
    }
}