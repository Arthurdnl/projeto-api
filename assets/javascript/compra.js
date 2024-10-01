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
const nome = document.querySelector('#name')
const email = document.querySelector('#email')
const cep = document.querySelector('#cep')
const cpf = document.querySelector('#cpf')
const password = document.querySelector('#password')

let contador = 399.90;
let contador2 = 1;

window.onload= function (params) {
    corpo.style.filter="blur(3px)"
}



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

btnCadastrar.addEventListener("click",(e)=>{

    if (nome.value =="" || validarInput(nome.value) ===   '' ) {
        nome.style.border = " 3px solid red"
        nome.placeholder = "Preencha seu nome"
        return
    }else{
        nome.style.border = " 3px solid green"
        nome.placeholder = ""
    }
   
    if (cpf.value == "" || !validaCPF(cpf.value)) {
        cpf.style.border = " 3px solid red"
        cpf.placeholder = "Preencha seu CPF"
        return
    }else{
        cpf.style.border = " 3px solid green"
        cpf.placeholder = ""
    }


    if (email.value == "" || !isEmailValid(email.value))  {
        email.style.border = " 3px solid red"
        email.placeholder = "Preencha seu email"
        return
    }else{
        email.style.border = " 3px solid green"
        email.placeholder = ""
    }
    
    if (cpf.value.length < 11) {
        console.log("campo CPF não preenchido corretamente.")
        return
    }

    fetch("http://localhost:8080/client/v1",{
        method: "POST",
        headers:{
            'accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
    
            name: nome.value,
            email: email.value,
            password: password.value,
            cpf: cpf.value,
            cep: cep.value,
        })
    
    }).then(response => response.json())
    
    modal.style.display="none"
    corpo.style.filter="blur()"

});

function isEmailValid(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );

    return emailRegex.test(email);
}

const invalidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
];

cpf.addEventListener("input", (event) => {
    let currentValue = cpf.value;
    let formattedValue = currentValue.replace(/[^0-9]/g, '');

    if (event.inputType === "deleteContentBackward") {
        formattedValue = formattedValue.slice(0, -1);
    }

    let newValue = '';
    for (let i = 0; i < formattedValue.length; i++) {
        if (i === 3 || i === 6) {
            newValue += '.';
        }
        if (i === 9) {
            newValue += '-';
        }
        newValue += formattedValue[i];
    }

    cpf.value = newValue;
});

const validaCPF = (cpf) => {

    cpf = cpf.replace(/\D/g, "")

    console.log

    if(cpf.length !== 11){
        console.clear()
        console.error("Campo cpf não foi preenchido corretamente.")
        return
    }

    const proximoDigitoVerificador = (cpfIncompleto) => {
        
        let somatoria = 0

        for (let index = 0; index < cpfIncompleto.length; index++) {

            let digitoAtual = cpfIncompleto.charAt(index)

            let constante = (cpfIncompleto.length + 1 - index)

            somatoria += Number(digitoAtual) * constante

        }

        const resto = somatoria % 11
        return resto < 2 ? "0" : (11 - resto).toString()
    }

    let primeiroDigitoVerificador = proximoDigitoVerificador(cpf.substring(0, 9))
    let segundoDigitoVerificador = proximoDigitoVerificador(cpf.substring(0, 9) + primeiroDigitoVerificador)
    
    let cpfCorreto = cpf.substring(0, 9) + primeiroDigitoVerificador + segundoDigitoVerificador

    if(cpf !== cpfCorreto) {
        console.log("CPF inválido")
        return false
    }

    if (invalidos.includes(cpf)) {
        console.log("CPF inválido")
        return false;
    }
    console.log("CPF Válido")
    return true
}

function validarLetras(input) {
    input.value = input.value.replace(/[^a-zA-Záàâãéèêíïóôõöúçñ\s]/g, '');
}

nome.addEventListener("input",(e)=>{

    validarLetras(nomeCompleto)
    validarInput(nomeCompleto.value)

})

function validarInput(input) {
    let trimmedInput = input.trim();
    if (trimmedInput === '') {
        return '';
    } else {
        return true; 
    }
}
