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

fetch("http://localhost:8080/client/v1")
.then(response => response.json())
.then(data => console.log(data))
