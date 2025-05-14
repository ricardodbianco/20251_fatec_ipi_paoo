const express = require ('express')
const axios = require('axios')
const app = express()
app.use(express.json())

app.post('/eventos', (req, res) => {
  const evento = req.body
  console.log(evento)
  axios.post('http://localhost:4000/eventos', evento)
  axios.post('http://localhost:5000/eventos', evento)
  axios.post('http://localhost:6000/eventos', evento)
  axios.post('http://localhost:7000/eventos', evento)
  res.end()
})

//colocar o barramento em execução na porta 10000. mostre um log dizendo que ele subiu nessa porta
const port = 10000
app.listen(port, () => console.log(`Barramento. Porta ${port}.`))