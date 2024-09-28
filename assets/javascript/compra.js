const modal = document.querySelector("#modal");
const corpo = document.querySelector("#corpo");
const btnCadastrar = document.querySelector("#btn-cadastrar");
const btnComprar = document.querySelector("#btnComprar")
const botaoAdicionar = document.querySelector("#botaoAdicionar")
const botaoSubtrair = document.querySelector("#botaoSubtrair")
const valorAtual = document.querySelector("#valorAtual")
const campoPrecoUm = document.querySelector("#campoPrecoUm")
const campoPrecoDois = document.querySelector("#campoPrecoDois")
const inputCEP = document.querySelector("#inputCEP")
const cidade = document.querySelector("#cidade")
const bairro = document.querySelector("#bairro")
const rua = document.querySelector("#rua")
const quantidadeAtualDoProduto = document.querySelector("#quantidadeAtualDoProduto")

let contador = 399.90;
let contador2 = 1;

window.onload= function (params) {
    corpo.style.filter="blur(3px)"
}

btnCadastrar.addEventListener("click",(e)=>{
    modal.style.display="none"
    corpo.style.filter="blur()"
});

btnComprar.addEventListener("click", (event) =>{
    modal.style.display = "block"
});

botaoAdicionar.addEventListener("click", (event) =>{
        contador += 399.90;
        valorAtual.innerHTML =  `<b>R$${contador.toFixed(2).replace('.', ',')}</b>`;
        campoPrecoUm.innerHTML =  `<b>R$${contador.toFixed(2).replace('.', ',')}</b>`;
        campoPrecoDois.innerHTML =  `<b>R$${contador.toFixed(2).replace('.', ',')}</b>`;
        contador2++;
        quantidadeAtualDoProduto.textContent = contador2;
});

botaoSubtrair.addEventListener("click", (event) =>{
    if(contador > 399.90){
        contador -= 399.90;
        valorAtual.innerHTML =  `<b>R$${contador.toFixed(2).replace('.', ',')}</b>`;
        campoPrecoUm.innerHTML =  `<b>R$${contador.toFixed(2).replace('.', ',')}</b>`;
        campoPrecoDois.innerHTML =  `<b>R$${contador.toFixed(2).replace('.', ',')}</b>`;
    }
    if(contador2 > 1){
        contador2--;
        quantidadeAtualDoProduto.textContent = contador2;
    }
});


document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        let url = "https://viacep.com.br/ws/" + inputCEP.value + "/json";
        
        let request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
                
        let endereco = JSON.parse(request.response);
        cidade.innerHTML = endereco.localidade;
        rua.innerHTML = endereco.logradouro;
        bairro.innerHTML = endereco.bairro;
    }
});