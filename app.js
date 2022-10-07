const express = require("express")
const app = express()

require("dotenv").config()

const Datastore = require('nedb')

const database = new Datastore("database.db")
database.loadDatabase()

app.use(express.static('public'))
app.use(express.json({"limit":"1mb"}))

let port = 3000 || process.env.port

let numer = 0;
database.find({},(err,info)=>{
    if(err){
        return
    }
    else{
        numer = info.length
    }
})


app.get("/data",(req,res)=>{
    console.log("New request")
    let data = {people:[],text:[],numer:[]}
    database.find({},(err,info)=>{
        if (err){
            response.end()
            return
        }
        else{
            if(info.length>2){
            for(let i =0;i<info.length-1;i++){
                
                for(let j =0;j<info.length-1;j++){
                    if(info[j].value < info[j+1].value){
                        let temp = info[j]
                        info[j] = info[j+1]
                        info[j+1] = temp
                    }
                   
                }
              
            }
           // console.log(info)
        
        }
            for(let i =0;i<info.length;i++){
                data.people.push(info[i].name)
                data.text.push(info[i].tekst)
            }
           // console.log(data)
            res.json(data)
        }
    })
})

app.post("/post",(req, res)=>{
console.log(req.body)
let data = req.body
data.value = numer
database.insert(data)
numer++
res.json({stat:"success"})
})


app.listen(port,()=>{
    console.log(`app running on port : ${port}`)
})