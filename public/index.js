let chek = false
let information;
let username;
let leter = ""
let ppl ;
let num = 0
let num2 =0
let send = document.createElement("button")
send.innerHTML ="Send"
let input = document.createElement("input")

window.onload = async ()=>{

    if (localStorage.getItem("name") != null){ 
    document.getElementById("name").value = localStorage.getItem("name") 
    nameme()    
    }


let request_data = await fetch("/data")
let info = await request_data.json()
ppl = info.people
information = info.text
}




async function  getData (){
    let request_data = await fetch("/data")
    let info = await request_data.json()
    num2 = info.text.length
    information = info.text
    ppl = info.people
    if(num2>num ){
        chek = true
    }
    
    num = information.length
    while (document.getElementById("list").childNodes.length >0){
            document.getElementById("list").childNodes.forEach((element)=>{
            document.getElementById("list").removeChild(element)
    })  
  }
  load()

    }

function nameme(){
    if(document.getElementById("name").value != "" && document.getElementById("name").value.length <= 25){
        username = document.getElementById("name").value
    document.getElementById("name").remove()
    document.getElementById("btn").remove()
    document.getElementById("parabola").append(input)
    document.getElementById("parabola").append(send)
    
if (localStorage.getItem("name") == null){
    
        localStorage.setItem("name",username)
        }
    
    send.addEventListener("click",()=>{
        if (input.value != ""){
           post()
            console.log("Send")
        }
    },true)
    }
    
}

async function  post (){
    let a = input.value
    if (a == "" ){
      
        return
    }
    if(a.length > 100){
      console.log("Should send less than 100 letters") 
        return
    }

    const data = {
    name:username,
    tekst:input.value
}
    
    
    input.value = ""
    let options = {
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }
    let response = await fetch("/post",options)
    const info = await response.json()

}





function load(){
  
    if(information.length != 0){
for(let i =0;i<information.length;i++){
    let li = document.createElement("li")
    li.innerHTML =  ppl[i] + " : " +information[i]
    document.getElementById("list").append(li)
    document.getElementById("list").append(document.createElement("br"))
}
}
}


setTimeout(load,1000)
setInterval(getData, 1000);


input.addEventListener("keydown",e =>{
    if(e.keyCode == "13"){
        post()
    }
},true)
