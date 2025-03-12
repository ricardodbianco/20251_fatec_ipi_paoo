const valores = [1, 2, 3, 4]
const res = valores.reduce((ac, v) => ac + v)

// const nomes = ['Ana Paula', 'Antonio', 'Rodrigo', 'Alex', 'Cristina']
//produzir um novo vetor contendo a letra inicial de cada nome
// const peloMenosUmComecaComA = nomes.some(n => n.toLowerCase().startsWith('a'))
// console.log(peloMenosUmComecaComA)
// const todosComecamComA = nomes.every(nome => nome.startsWith("A") || nome.startsWith("a"))
// console.log(todosComecamComA)
//['A', 'A', 'R', 'A', 'C']
// const resultante = nomes.map(nome => nome.charAt(0))
// console.log(resultante)
// const resultante = []
// for(let i = 0; i < nomes.length; i++){
//     resultante.push(nomes[i].charAt(0))
// }
// console.log(resultante)

//produza um novo vetor contendo somente os nomes que começam com A
// const resultante = nomes.filter(function(nome){ return nome[0] === 'A' || nome[0] === 'a'})
// console.log(resultante)
// const resultante = []
// for (let i = 0; i < nomes.length; i++){
//     if(nomes[i][0] === 'A' || nomes[i][0] == 'a')
//         resultante.push(nomes[i])
// }
// console.log(resultante)
//closure
// function eAgora(){
//     let cont = 1
//     function f1(){
//         console.log(cont)
//     }
//     cont++
//     function f2(){
//         console.log(cont)
//     }
//     cont++
//     return {f1, f2}
// }

// const resultadoDaEAgora = eAgora()
// resultadoDaEAgora.f1()
// resultadoDaEAgora.f2()

// function saudacoesFactory(saudacao, nome){
//     return function(){
//         console.log(`${saudacao}, ${nome}`)
//     }
// }

// const olaJoao = saudacoesFactory('Olá', 'João')
// olaJoao()

// function ola(){
//     let nome = "João"
//     return function(){
//         console.log('Olá, ' + nome)
//     }
// }
// const resultadoDaOla = ola()
// resultadoDaOla()

// function f(){
//     let nome = 'João'
//     function g(){
//         let a
//         console.log(nome)
//     }
//     g()
// }
// f()

// function f(funcao){ //highest order function
//     funcao()
// }

// function g(){ //highest order function
//     //1. Definir a função
//     function outraFuncao(){
//         console.log("Fui criada por g")
//     }
//     //2. Devolver a funcao outraFuncao
//     return outraFuncao
// }
//f(g())
// f(g)()



// const resultadoDaG = g()
// resultadoDaG()

//como chamar a outraFuncao sem guardar o resultado da g em uma constante nem em uma variavel)
// g()()()



// f(function(){
//     console.log("Sendo passada para f")
// })

// const umaFuncao = function(){
//     console.log("Fui armazenada em uma constante")
// }
// umaFuncao()

// public class Pessoa{
//     public void andar(){
//         System.out.println("Andando")
//     }

//     public void teste(){
//         var metodoAndar = andar;    
//     }
// }

//funções regulares: function
//arrow function: () => {}
// const ehPar = (n) => {
//     console.log(n)
//     return n % 2 === 0
// }
// console.log(ehPar(7))
// const dobro = valor => valor * 2
// console.log(dobro(7))
// const t3 = () => {return 2 + 2}
// console.log(t3())
// const t2 = a => console.log('Sou a t2 exibindo o valor ' + a)
// t2(1)
// const t1 = n => {console.log(n)}
// t1(1)

// const triplo = function(n = 5){
//     return n * 3    
// }
// console.log(triplo())
// console.log(triplo(4))
// console.log(triplo(null))
// console.log(Number(null))
// console.log(triplo(2, 78, 2, 2, 2, 2, 2))
// const dobro = function(n){
//     return n * 2
// }
// console.log(dobro(5))
// function soma(a, b){
//     console.log(`a: ${a}`)
//     console.log(`b: ${b}`)
//     return a + b
// }
// const res = soma(2, 3)
// console.log(res)
// console.log(soma(1))    

//funções, código 1.6.1
//definição
// function hello(){
//     console.log('oi')
// }
// //chamada da função
// hello(undefined)

// function hello(nome){
//     console.log('Oi, ' + nome)
// }
// hello('Pedro')

//vetores
//declaração
// v1 = []
// console.log(v1.length)
// v1[0] = 3.4
// console.log(v1.length)
// v1[10] = 2
// console.log(v1.length)
// v1[2] = "abc"
// console.log(v1.length)

// console.log(v1)

// for(let i = 0; i < v1.length; i++){
//     console.log(v1[i])
// }

//comparação com == e ===
// console.log([] == [])
// console.log([] == false)
// console.log(null == undefined)
// console.log(null == null)
// console.log(1 == [1])
// console.log(true == '2')
// console.log(true == '1')
// console.log(true == 1)
// console.log(1 === '1')
// console.log(1 === 1)
// console.log(1 == '1')
// console.log(1 == 1)


//coerção
// const n1 = 2
// const n2 = '3'
// //coerção implícita
// const n3 = n1 + n2
// console.log(n3)
// //coerção explícita
// const n4 = n1 + Number(n2)
// console.log(n4)

//pq não usar o var
// var idade = 18
// console.log('Oi, ' + nome)
// //içamento (hoist)
// if(idade >= 18){
//     let nome = 'João'
//     console.log('Parabéns, ' + nome + '. Você pode dirigir')
// }
// console.log("Até mais, " + nome)
// var linguagem = "Javascript"
// console.log ("Aprendendo " + linguagem)
// var linguagem = "Java"
// console.log("Aprendendo " + linguagem)
//declarando variáveis
// var a = 2
// console.log(a)
// a = 3
// console.log(a)

// let b
// console.log(b)
// const c
// c = 2
// let a = 2
// console.log(a)
// a = 3
// console.log(a)


//declarando constantes
// const idade = 27
//Java: String nome = "José";
// const nome = 'José'
// console.log(nome)
// nome = 'Pedro'
// console.log(nome)
