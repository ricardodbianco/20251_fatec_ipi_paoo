const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())
const palavraChave = 'importante'
const funcoes = {
  ObservacaoCriada: async (observacao) => {
    //1. Atualizar o status da observação
    //se o texto incluir a palavraChave, trocar o status para importante
    //caso contrário, trocar o status para comum
    observacao.status = 
      observacao.status.includes(palavraChave)
      ? 'importante'
      : 'comum'
    //emitir um evento do tipo ObservacaoClassificada, direcionado ao barramentpo
    //use a observacao como "dados"
    //emita o evento com a axios
    await axios.post(
        'http://localhost:10000/eventos',{
          tipo: 'ObservacaoClassificada',
          dados: observacao
        }
    )
  }
}
app.post('/eventos', async (req, res) => {
  try{
    const evento = req.body
    console.log(evento)
    await funcoes[evento.tipo](evento.dados)
    res.end()
  }
  catch(e){}
})
const port = 7000
app.listen(port, () => console.log(`Classificação. Porta ${port}`))