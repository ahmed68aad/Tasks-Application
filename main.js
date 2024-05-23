const url = "http://localhost:3000/tasks";
// get data 
async function getTasks(){
    const res =await fetch(url);
    const data =await res.json();
    return  data
}

//display tasks

async function displayTasks(){

    const tasks =await getTasks();
    const row = document.querySelector(".row");

    for (let task of tasks){
        const div = document.createElement("div");
        div.className = `text-center col-lg-4 col-md-6 col-sm-12 my-2`
        div.innerHTML = `
        <div class="py-4 px-4 bg-lght shadow">
         <strong class="fs-5 p-3">${task.title}</strong>
         <p class="p-3">${task.desc}</p>
         <span class="text-success fw-bolder">${task.state}</span>
         <hr>
         <button class = "btn btn-sm btn-primary" onclick="taskDone('${task.id}')">Done</button>
         <button class = "btn btn-sm btn-danger" onclick="deleteTask('${task.id}')">Delete</button>
        </div>
        `
        row.appendChild(div);
    }
}
// add a new task

function addTask(){

    const titleValue = document.querySelector("#title").value;
    const descValue = document.querySelector("#desc").value;

    if(titleValue === "" || descValue===""){
        alert("All inouts are required")
    }
    else{
        fetch(url ,  {
            method : "POST" ,
            body : JSON.stringify({
                title : titleValue,
                desc : descValue,
                state:""
            }),
            headers :{"Content-type" : "application/json ; charset = utf-8"} 
        })
        .then(()=> alert("Task added successfully"))
        .catch((err)=> console.log(err.message))
    }
}

// delete added task
function deleteTask(id){
    fetch(`${url}/${id}`,{
        method :"DELETE"
    })
}

// when a task is done
function taskDone(id){
    fetch (`${url}/${id}`,{
        method: "PATCH",
        body: JSON.stringify({
            state:"Done"
        }),
        headers : {
            "Content-type" : "application/json ;charset=utf-8"
        }
    })
}


document.addEventListener("DOMContentLoaded",displayTasks)
const form =document.querySelector(".form-group")
form.addEventListener("submit" , addTask)