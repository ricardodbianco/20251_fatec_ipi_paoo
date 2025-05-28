const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())
/*
{
  1: {
    id: 1,
    texto: "Ver um filme",
    observacoes: [
      {
        id: 1001,
        texto: "Entre 04 e 08h",
        lembreteId: 1
      },
      {
        id: 1002,
        texto: "Fazer pipoca",
        lembreteId: 1
      }
    ]
  },
  2: {
    id: 2,
    texto: "Fazer feira"
  }
}
*/
const baseConsolidada = {}

const funcoes = {
  LembreteCriado: async (lembrete) => {
    baseConsolidada[lembrete.id] = lembrete
  },
  ObservacaoCriada: async (observacao) => {
    const observacoes = baseConsolidada[observacao.lembreteId]['observacoes'] || []
    observacoes.push(observacao)
    baseConsolidada[observacao.lembreteId]['observacoes'] = observacoes
  },
  ObservacaoAtualizada: async (observacao) => {
    //atualizar a base consolidada
    const observacoes = baseConsolidada[observacao.lembreteId]['observacoes']
    const indice = observacoes.findIndex(o => o.id === observacao.id)
    observacoes[indice] = observacao
  }
  
}
//endpoint para obtenção da base consolidada (o front end usa)
app.get('/lembretes', (req, res) => {
  //devolver a base consolidada como json, use o objeto res
  res.json(baseConsolidada)
})
//endpoint para receber eventos (o barramento usa)
app.post('/eventos', async (req, res) => {
  try{
    const evento = req.body
    console.log(evento)
    await funcoes[evento.tipo](evento.dados)
  }
  catch(e){}
  finally{
    res.end()
  }
})

const port = 6000
app.listen(port, async () => {
  console.log(`Consulta. Porta ${port}.`)
  const resp = await axios.get('http://localhost:10000/eventos')
  resp.data.forEach((eventoPerdido) => {
    try{
      funcoes[eventoPerdido.tipo](eventoPerdido.dados)
    }
    catch(e){}
  })
})