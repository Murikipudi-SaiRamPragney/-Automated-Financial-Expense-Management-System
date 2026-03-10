function register(){

let username=document.getElementById("regUser").value
let password=document.getElementById("regPass").value

let user={
username:username,
password:password
}

localStorage.setItem("user",JSON.stringify(user))

alert("Account Created Successfully")

window.location="login.html"

}

function login(){

let username=document.getElementById("username").value
let password=document.getElementById("password").value

let storedUser=JSON.parse(localStorage.getItem("user"))

if(storedUser && username==storedUser.username && password==storedUser.password){

window.location="dashboard.html"

}
else{

alert("Invalid Login")

}

}

function logout(){
window.location="login.html"
}

function goAddExpense(){
window.location="addexpense.html"
}

function goHistory(){
window.location="history.html"
}

function goDashboard(){
window.location="dashboard.html"
}

function addExpense(){

let title=document.getElementById("title").value
let amount=document.getElementById("amount").value

let expenses=JSON.parse(localStorage.getItem("expenses")) || []

expenses.push({
title:title,
amount:amount
})

localStorage.setItem("expenses",JSON.stringify(expenses))

alert("Expense Added")

}

function loadHistory(){

let expenses=JSON.parse(localStorage.getItem("expenses")) || []

let table=document.getElementById("expenseList")

if(!table) return

table.innerHTML=""

expenses.forEach(e=>{

let row=`<tr>
<td>${e.title}</td>
<td>₹ ${e.amount}</td>
</tr>`

table.innerHTML+=row

})

}

loadHistory()