const express = require('express')
const app = express()
app.use(express.json())

let id= 0
const usuarios = {}

// GET /usuarios - ele lista todos os usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios)
})

// POST /usuarios - cadastra um usuario novo
app.post('/usuarios', (req, res) =>{
    id = id + 1
    const {nome, idade, endereco} = req.body

    usuarios[id] = {
        id,
        nome,
        idade,
        endereco
    }
    res.status(201).json(usuarios[id])
})

const port = 8000
app.listen(port, () =>{
    console.log(`Usuarios. Porta ${port}.`)
})