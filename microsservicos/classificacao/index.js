const axios = require('axios')
const express = require('express')
const { GoogleGenAI, Type } = require('@google/genai')
const app = express()
app.use(express.json())
const ai = new GoogleGenAI({ apiKey: "xxxxx" });
const classificacoes = {}

const palavraChave = 'importante'
const verdadeiro = 'true'
const funcoes = {
  ObservacaoCriada: async (observacao) => {
    //1. Atualizar o status da observação
    //se o texto incluir a palavraChave, trocar o status para importante
    //caso contrário, trocar o status para comum
    console.log(observacao.status.includes(palavraChave))
    observacao.status = observacao.texto.includes(palavraChave) ? 'importante' : 'comum'
      console.log(observacao)
    try{
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Verificar se o texto a seguir: "${observacao.texto}" possui temas ilícitos, indesejado ou semelhantes.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                apropriado: {
                  type: Type.BOOLEAN,
                  description: 'o conteúdo é apropriado? true ou false',
                },
              },
            },
          },
      });

      console.log(response.text);
      observacao.apropriado = response.text.includes(verdadeiro) ? true : false
      
      if(observacao.apropriado === true && observacao.status === 'importante' ||  observacao.status === 'comum' ){
        await axios.post(
          'http://192.168.1.218:10000/eventos',{
            tipo: 'ObservacaoClassificada',
            dados: observacao
          }
        )  

      }        
    }
    catch(err){
    console.error("Gemini não conseguiu", err)
    }
    

  },
  LembreteCriado: async (lembrete) =>{
    //classifica lembrete de acordo com o tamanho do texto
    const classificacao = lembrete.texto.length >= 50 ? 'importante' : 'comum'
    classificacoes[lembrete.id] = {
      id: lembrete.id,
      texto: lembrete.texto,
      classificacao: classificacao,
      apropriado: lembrete.apropriado
    }
    console.log(`Lembrete ${lembrete.id} classificado como ${classificacao}`)
        try{
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Verificar se o texto a seguir: "${lembrete.texto}" possui temas ilícitos, indesejado ou semelhantes.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                apropriado: {
                  type: Type.BOOLEAN,
                  description: 'o conteúdo é apropriado? true ou false',
                },
              },
            },
          },
      });

      console.log(response.text);
      lembrete.apropriado = response.text.includes(verdadeiro) ? true : false
      
      if(lembrete.apropriado === true && classificacao === 'importante' ||  classificacao.status === 'comum' ){
        await axios.post(
          'http://192.168.68.110:10000/eventos',{
            tipo: 'LembreteClassificado',
            dados: classificacoes[lembrete.id], lembrete
          }
        )  

      }        
    }
    catch(err){
    console.error("Gemini não conseguiu", err)
    }
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
    
    for(const id in lembretes) {
      const lembrete = lembretes[id]
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
