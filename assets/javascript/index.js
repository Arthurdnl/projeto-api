const botaoDiminuir = document.querySelector("#diminuir")
const botaoAdicionar = document.querySelector("#adicionar")
const quantidade = document.querySelector("#quantidadeProdutos")
const btnComprar = document.querySelector("#comprarReceber")
const btnCadastrar = document.querySelector("#btn-cadastrar");

let quantidadeAtual = 1;

/* Abrir Modal */

btnComprar.addEventListener("click", (event) =>{
    modal.style.display = "block"
});

/* Abrir Modal */

// Cadastrar Pessoa (Enviar dados para o BD)

const nome = document.querySelector('#name')
const email = document.querySelector('#email')
const cep = document.querySelector('#cep')
const cpf = document.querySelector('#cpf')
const password = document.querySelector('#password')


// Botão de Cadastro

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

    if (password.value == "") {
        password.style.border = " 3px solid red"
        password.placeholder = "Senha inválida"
        return
    }else{
        password.style.border = " 3px solid green"
        password.placeholder = ""
    }

    if(cep.value == ""){
        cep.style.border = " 3px solid red"
        cep.placeholder = "CEP inválida"
        return
    }else{
        cep.style.border = " 3px solid green"
        cep.placeholder = ""
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
            cep: cep.value
        })
    
    }).then(response => response.json())
    
    btnCadastrar.innerHTML = "";

    var loadingIcon = document.createElement("i")

    loadingIcon.className = "fa fa-spinner fa-spin"

    btnCadastrar.appendChild(loadingIcon)

    setTimeout(  function a() {
        window.location.href = "../compra.html"}, 3000)
   
});

// Botões 

botaoDiminuir.addEventListener("click", (event) =>{
    if(quantidadeAtual > 1){
        quantidadeAtual--;
        quantidade.value = quantidadeAtual
    }
});

botaoAdicionar.addEventListener("click", (event) =>{
    quantidadeAtual++
    quantidade.value = quantidadeAtual
});

/* Utils */

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

fetch("http://localhost:8080/client/v1")
.then(response => response.json())
.then(data => console.log(data))
