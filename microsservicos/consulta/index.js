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
  LembreteCriado: (lembrete) => {
    baseConsolidada[lembrete.id] = lembrete
  },
  ObservacaoCriada: (observacao) => {
    const observacoes = baseConsolidada[observacao.lembreteId]['observacoes'] || []
    observacoes.push(observacao)
    baseConsolidada[observacao.lembreteId]['observacoes'] = observacoes
  },
  
}
//endpoint para obtenção da base consolidada (o front end usa)
app.get('/lembretes', (req, res) => {
  //devolver a base consolidada como json, use o objeto res
  res.json(baseConsolidada)
})
//endpoint para receber eventos (o barramento usa)
app.post('/eventos', (req, res) => {
  const evento = req.body
  console.log(evento)
  funcoes[evento.tipo](evento.dados)
  res.end()
})

const port = 6000
app.listen(port, () => console.log(`Consulta. Porta ${port}.`))