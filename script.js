// CPF
document.addEventListener("DOMContentLoaded",()=>{

let cpf=document.getElementById("cpf")

if(cpf){
cpf.addEventListener("input",e=>{

let v=e.target.value.replace(/\D/g,'')

if(v.length>3) v=v.replace(/(\d{3})(\d)/,'$1.$2')
if(v.length>7) v=v.replace(/(\d{3})(\d)/,'$1.$2')
if(v.length>11) v=v.replace(/(\d{3})(\d{1,2})$/,'$1-$2')

e.target.value=v
})
}

let tel=document.getElementById("telefone")

if(tel){
tel.addEventListener("input",e=>{

let v=e.target.value.replace(/\D/g,'')

if(v.length>2) v=v.replace(/(\d{2})(\d)/,'($1) $2')
if(v.length>9) v=v.replace(/(\d{5})(\d)/,'$1-$2')

e.target.value=v
})
}

})

function proximo(){

let dados={
nome:document.getElementById("nome").value,
email:document.getElementById("email").value,
cpf:document.getElementById("cpf").value,
telefone:document.getElementById("telefone").value,
endereco:document.getElementById("endereco").value,
vencimento:document.getElementById("vencimento").value
}

localStorage.setItem("responsavel",JSON.stringify(dados))

window.location.href="crianca.html"

}

async function finalizar(){

let resp = JSON.parse(localStorage.getItem("responsavel"))

let dados = {
nome: resp.nome,
email: resp.email,
cpf: resp.cpf,
telefone: resp.telefone,
endereco: resp.endereco,
vencimento: resp.vencimento,
crianca: document.getElementById("crianca").value,
idade: document.getElementById("idade").value,
escola: document.getElementById("escola").value
}

await fetch("/cadastro",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(dados)
})

alert("Cadastro realizado!")

}
