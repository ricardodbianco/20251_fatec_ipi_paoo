const express = require('express')
const app = express()
app.use(express.json())

//endpoint para obtenção da base consolidada (o front end usa)
app.get('/lembretes', (req, res) => {

})
//endpoint para receber eventos (o barramento usa)
app.post('/eventos', (req, res) => {

})

const port = 6000
app.listen(port, () => console.log(`Consulta. Porta ${port}.`))