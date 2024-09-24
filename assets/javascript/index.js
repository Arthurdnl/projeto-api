const botaoDiminuir = document.querySelector("#diminuir")
const botaoAdicionar = document.querySelector("#adicionar")
const quantidade = document.querySelector("#quantidadeProdutos")

let quantidadeAtual = 0;

botaoDiminuir.addEventListener("click", (event) =>{
    if(quantidadeAtual > 0){
        quantidadeAtual--;
        quantidade.value = quantidadeAtual
    }
});

botaoAdicionar.addEventListener("click", (event) =>{
    quantidadeAtual++
    quantidade.value = quantidadeAtual
});