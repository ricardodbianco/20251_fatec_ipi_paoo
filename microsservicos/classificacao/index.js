const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const classificacoes = {}
let ultimoEventoProcessado = 0

const palavraChave = 'importante'
const funcoes = {
  ObservacaoCriada: async (observacao) => {
    //1. Atualizar o status da observação
    //se o texto incluir a palavraChave, trocar o status para importante
    //caso contrário, trocar o status para comum
    console.log(observacao.status.includes(palavraChave))
    observacao.status = observacao.texto.includes(palavraChave) ? 'importante' : 'comum'
      console.log(observacao)
    //emitir um evento do tipo ObservacaoClassificada, direcionado ao barramentpo
    //use a observacao como "dados"
    //emita o evento com a axios
    await axios.post(
        'http://192.168.68.110:10000/eventos',{
          tipo: 'ObservacaoClassificada',
          dados: observacao
        }
    )
  },
  LembreteCriado: async (lembrete) =>{
    //classifica lembrete de acordo com o tamanho do texto
    const classificacao = lembrete.texto.length >= 50 ? 'importante' : 'comum'
    classificacoes[lembrete.id] = {
      id: lembrete.id,
      texto: lembrete.texto,
      classificacao: classificacao
    }
    console.log(`Lembrete ${lembrete.id} classificado como ${classificacao}`)
    
    await axios.post(
        'http://192.168.68.110:10000/eventos',{
          tipo: 'LembreteClassificado',
          dados: classificacoes[lembrete.id]
        }
    )
  }
}

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

//recupera eventos perdidos
const recuperarEventosPerdidos = async () => {
  try {
    const response = await axios.get('http://192.168.68.110:4000/lembretes')
    const lembretes = response.data
    
    for(const [id, lembrete] of Object.entries(lembretes)) {
      if(!classificacoes[id]) {
        await funcoes.LembreteCriado(lembrete)
      }
    }
  } catch (error) {
    console.error('Erro ao recuperar eventos perdidos:', error)
  }
}

//recupera eventos perdidos ao iniciar o serviço
recuperarEventosPerdidos()

const port = 7000
app.listen(port, () => console.log(`Classificação. Porta ${port}`))
