const modal = document.querySelector("#modal");
const corpo = document.querySelector("#corpo");
const btnCadastrar = document.querySelector("#btn-cadastrar");




window.onload= function (params) {
    corpo.style.filter="blur(3px)"

}
btnCadastrar.addEventListener("click",(e)=>{
    modal.style.display="none"
    corpo.style.filter="blur()"
})
