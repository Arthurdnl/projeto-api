/* Variáveis referentes aos campos do arquivo HTML */

var nameField = document.querySelector(".message-name");
var emailField = document.querySelector(".messagem-email");
var cepField = document.querySelector(".messagem-cep");



window.addEventListener("load", (event) =>{

    displayData(nameField, emailField, cepField);
});

async function displayData(nameField, emailField, cepField) {
    
    try{
        
        const response = await fetch("http://localhost:8080/client/v1");

        if (!response.ok) {
            throw new Error("A Busca falhou...");
        };

        const data = await response.json();

        console.log(data);

        console.log(data[data[data.length - 1]]);

        nameField.textContent = data[data.length - 1].name;
        emailField.textContent = data[data.length - 1].email;
        cepField.textContent = data[data.length - 1].cep;
    }

    catch(error){
        console.error(error)
    }
}