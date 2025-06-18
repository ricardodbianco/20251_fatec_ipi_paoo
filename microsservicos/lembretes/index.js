const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())
let id = 0
const lembretes = {}
 //pegar o texto do corpo da requisição
  //a requisição é o objeto req
  //req tem uma propriedade chamada body
  //o body, por sua vez, é o objeto json enviado a partir da thunder
  // const texto = req.body.texto

//GET /lembretes () => {} (endpoint)
app.get('/lembretes', (req, res) => {
  res.json(lembretes)
})

//POST /lembretes () => {} (endpoint)
app.post('/lembretes', async (req, res) => {
  try{
    id = id + 1
    const { texto, usuarioId } = req.body
    
    //verifica se o usuario existe
    const response = await axios.get(`http://192.168.68.110:5000/usuarios/${usuarioId}`)
    if(!response.data) {
      return res.status(404).json({erro: 'Usuário não encontrado'})
    }
    
    lembretes[id] = {
      id,
      texto,
      usuarioId,
      classificacao: texto.length >= 50 ? 'importante' : 'comum'
    }

    axios.post('http://192.168.68.110:10000/eventos', {
      tipo: 'LembreteCriado',
      dados: {id, texto, usuarioId, classificacao: lembretes[id].classificacao}
    })
    res.status(201).json(lembretes[id])
  }
  catch(error){
    res.status(500).json({erro: 'Erro ao criar lembrete'})
  }
})

//definir o endpoint da figura
//ele deve exibir o evento e encerra o tratamento da requisição com res.end
app.post('/eventos', async (req, res) => {
  try{
    const evento = req.body 
    console.log(evento)
  }
  catch(e){}
  finally{
    res.end()
  }
})

//localhost:porta
const port = 4000
app.listen(port, () => {
  console.log(`Lembretes. Porta ${port}.`)
})
 