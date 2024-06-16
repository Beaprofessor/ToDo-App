console.log("Welcome to my todo app")

let getTodoButton = document.getElementById('get-todo');
// registration of event Listener and u can do multiple registrations
getTodoButton.addEventListener('click',()=>{
    console.log("Clicked") 
})



// getTodoButton.addEventListener('click',handler())   // Ye tarika ganda hai call karne ka kyuki function mei kuch bhi doge toh wo sabko hi run kardega

// getTodoButton.addEventListener('mouseover',handler)  // isliye aese function name dedo bas 
// function handler (){
//     console.log("Clicked again!!!!!")
// }

// getTodoButton.addEventListener('mouseout',handler1)  
// function handler1(){
//     console.log("Haa aagya bahar")
// }

// getTodoButton.onclick = ()=>{
//     console.log("HalloBall")
// }

function clickBtn(){
    console.log("click")
}