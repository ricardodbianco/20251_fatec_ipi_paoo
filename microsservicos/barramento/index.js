const express = require ('express')
const axios = require('axios')
const app = express()
app.use(express.json())

app.post('/eventos', (req, res) => {
  const evento = req.body
  console.log(evento)
  //1. usando a axios, enviar o evento para o mss de lembretes
  axios.post('http://localhost:4000/eventos', evento)
  //2. usando a axios, enviar o evento para o mss de observações
  axios.post('http://localhost:5000/eventos', evento)
  //3. encerrar com a função end do objeto res
  res.end()
})

//colocar o barramento em execução na porta 10000. mostre um log dizendo que ele subiu nessa porta
const port = 10000
app.listen(port, () => console.log(`Barramento. Porta ${port}.`))