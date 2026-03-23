const express = require("express")
const Excel = require("exceljs")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(__dirname))

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"Cadastro_de_responsavel.html"))
})

app.post("/cadastro", async (req,res)=>{

console.log("Dados recebidos:", req.body)

const dados=req.body

const workbook=new Excel.Workbook()

let sheet

try{

await workbook.xlsx.readFile("cadastros.xlsx")
sheet=workbook.getWorksheet(1)

}catch{

sheet=workbook.addWorksheet("Cadastros")

sheet.addRow([
"Responsável",
"Email",
"CPF",
"Telefone",
"Endereço",
"Vencimento",
"Criança",
"Idade",
"Escola"
])

}

sheet.addRow([
dados.nome,
dados.email,
dados.cpf,
dados.telefone,
dados.endereco,
dados.vencimento,
dados.crianca,
dados.idade,
dados.escola
])

await workbook.xlsx.writeFile("cadastros.xlsx")

console.log("Cadastro salvo no Excel")

res.send("ok")

})

app.listen(3000,()=>{
console.log("Servidor rodando em http://localhost:3000")
})



