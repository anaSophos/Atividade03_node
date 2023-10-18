
const express =require('express')
const conn = require('./db/conn.js')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const Bank = require('./Bank.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.get('/', (req,res)=>{
    res.render('layouts/main')
})

app.post('/', async(req,res)=>{
    let { valor, banco, meses } = req.body
    valor = parseFloat(valor)
    meses = parseInt(meses)

    const bank = await Bank.findOne({name: banco}).exec()

    const precoComJuros = calcJuros(valor, bank.anual_tax, meses)

    const valorMensal = (precoComJuros / meses).toFixed(2)

    res.render('layouts/main', {isConfirmed:true, infos: {
        bankName : bank.name,
        numParcelas: meses,
        valor: precoComJuros,
        mensal: valorMensal
    }})
})


app.get('/bancos', async(req,res)=>{

    const bancos = await Bank.find().select('-anual_tax').select('-max_install').select('-__v').exec()
    return res.status(200).json(bancos)

})


app.get('/bancos/:id', async (req,res)=>{

    const banco = await Bank.findOne({_id: req.params.id}).exec()

    return res.status(200).json(banco)

})



function calcJuros(valorEntrada, anualTax, months) {
    const decimalTax = anualTax / 100;
    const total = valorEntrada * Math.pow(1 + decimalTax, months);
    return total.toFixed(2);
}



conn()
mongoose.connection.once('open', ()=>{
    console.log('Conectado ao banco!')
    app.listen(3000, ()=>{
        console.log('Rodando na porta 3k!')
    })
})

app.use(express.static('public'))