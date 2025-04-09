const express = require('express')
const {v4: uuidv4} = require('uuid')
const app = express()
app.use(express.json())

/*
{
  1: [
    {
      lembreteId: 1,
      id: 1001,
      texto: 'Comprar abacate'
    },
  ]
}
*/
const observacoesPorLembrete = {}

//POST /lembretes/1/observacoes
//POST /lembretes/2/observacoes
app.post('/lembretes/:id/observacoes', (req, res) => {
  const idObs = uuidv4()
  const { texto } = req.body
  const observacoesDoLembrete = observacoesPorLembrete[req.params.id] || []
  observacoesDoLembrete.push({
    id: idObs,
    lembreteId: req.params.id,
    texto
  })
  observacoesPorLembrete[req.params.id] = observacoesDoLembrete
  res.status(201).json(observacoesDoLembrete)
})

//GET /lembretes/1/observacoes
//GET /lembretes/2/observacoes
app.get('/lembretes/:id/observacoes', function(req, res){
  res.json(observacoesPorLembrete[req.params.id] || [])
})

const port = 5000
app.listen(port, () => {
  console.log(`Observações. Porta ${port}.`)
})