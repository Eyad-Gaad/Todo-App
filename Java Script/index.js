document.addEventListener("DOMContentLoaded",function(e){

//HTML DOM Selection , Regular Expression , ApiKey And Global todoList Array Declerations.

let spinner = document.getElementById("spinner");
let input = document.getElementById("input");
let warnMessage = document.getElementById("nonValid_input");
let form = document.querySelector("form");
let search = document.getElementById("search");
let display = document.getElementById("display");
const RJX = /^.{1,200}$/;
const urlBase = `https://todos.routemisr.com/api/v1/todos/`;
const ApiKey = `6765a2fb60a208ee1fde8067`;
let todoList;

//Spinner For Load Content.

function load(){
    spinner.classList.remove("d-none");
}

//Hide Spinner After Load Content.

function noLoad(){
    spinner.classList.add("d-none");
}

// API GET Request Method.

async function getData(){
    load();
    let request = await fetch(`${urlBase}${ApiKey}`);
    let response = await request.json();
    todoList = response.todos;
    displayData(todoList);
    noLoad();
    search.value = null;
}
getData();

// Display Todo in HTML Document Function.

function displayData(todos){
    let temp = ``;
    todos.forEach(todo => {
        temp+=`<div class="d-flex border-bottom border-1 border-black px-2 pb-3">
                <div class="col-9 col-md-10 col-xl-11">
                <h2 class="sans fs-5 m-0 col-12">${todo.title}</h2>
                </div>
                <div class="col-3 col-md-2 col-xl-1 d-flex justify-content-around align-items-center">${!todo.completed ? `<i onclick="putData('${todo._id}')" class="fs-5 fa-solid fa-pen"></i>` : `<i class="fs-5 fa-solid fa-circle-check text-success"></i>`}<i onclick="deleteData('${todo._id}')" class="fs-5 fa-solid fa-trash-can text-danger"></i></div>
            </div>`;
    });
    display.innerHTML = temp;
}

// Search Todo Function.

function searchData(searchValue){
  let search_todo  = todoList.filter(element => {
        return element.title.toLowerCase().startsWith(searchValue.toLowerCase())
    });
    displayData(search_todo);
}

// API POST Request Method.

async function postData(title){
    load();
     await fetch(urlBase,{
        method : `post`,
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            "title":`${title}`,
            "apiKey":`${ApiKey}`
        })
    });
    getData();
}

// API PUT Request Method.

async function putData(id){
    load();
     await fetch(urlBase,{
        method : `put`,
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            "todoId":`${id}`
        })
    });
    getData();
}
window.putData = putData; //Global Function.


// API DELETE Request Method.

async function deleteData(id){
    load();
     await fetch(urlBase,{
        method : `delete`,
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            "todoId":`${id}`
        })
    });
    getData();
}
window.deleteData = deleteData; //Global Function.

// Form Submit Event For POST Todo.

form.addEventListener("submit",function(e){
    e.preventDefault();
    if(RJX.test(input.value)){
        postData(input.value);
        input.value = null;
        warnMessage.classList.add("d-none");
    }
    else{
        warnMessage.classList.remove("d-none");
    }

})

// Input Event For Search Todo. 

search.addEventListener("input",function(e){
    searchData(this.value);
})

})