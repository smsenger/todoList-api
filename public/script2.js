
// //button pressed, toggles between showing and hiding content
let coll = document.getElementsByClassName("collapsible");
let task = document.getElementsByClassName("item")[0];
// let entry = document.getElementById("item");

//asks for and enters task into box
function taskAlert(taskItems) {
    let txt;
    let todo = prompt("Please enter a task.");
    if(todo == null || todo == "") {
        txt ="User cancelled todo addition.";
    } else {
        let taskItems = taskItems.map( (currentTask) => { 
            return `<div class="outer-div">
            <form>
                <div class="form-row">
                    <div class="col" id="format-form2">
                        <input type="text" class="form-control" id="description" name="item" placeholder="DetailSpace">
                        <input type="submit" value="Add"> 
                    </div>
                </div>
            </form>
    
            <div class="task-item">
                To do: ${currentTask.todo}
            </div>
    
            <div class="button-div1">
                <button type="button" value="click" class="collapsible button button5"><strong>Click</strong> for task
                    details</button>
                <div class="content">
                    <p>
                        ${currentTask.details}
                    </p>
                </div>
            </div>
    
            <div class="button-div2">
                <button type="button" class="delete"><strong>Click</strong> to delete task</button>
            </div>
        </div>
            `

        })
    }
}

$(document).ready(() => {
$('.first-add').click(() => {
    taskAlert();
})
});
   
    
document.addEventListener("DOMContentLoaded", () => { 
    function renderTasks(taskArray) {
        let taskHTMLArray = taskArray.map((currentEvent) => {
            return `<div class="outer-div">
            <form>
                <div class="form-row">
                    <div class="col" id="format-form2">
                        <input type="text" class="form-control" id="description" name="item" placeholder="DetailSpace">
                        <input type="submit" value="Add">
                    </div>
                </div>
            </form>
    
            <div class="task-item">
                To do: ${currentEvent.todo}
            </div>
    
            <div class="button-div1">
                <button type="button" value="click" class="collapsible button button5"><strong>Click</strong> for task
                    details</button>
                <div class="content">
                    <p>
                        ${currentEvent.details}
                    </p>
                </div>
            </div>
    
            <div class="button-div2">
                <button type="button" class="delete"><strong>Click</strong> to delete task</button>
            </div>
        </div>
            `
        })
        return taskHTMLArray.join("");
    }
    function pullDownButton() {
        let i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                let content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    } 

    function getTodos() {
        $.get('/api/todos').then((data) => {
            // task.innerHTML = (`To do: ${$('#task').val()}`);
            // console.log(data);
            $(".Container").html(renderTasks(data))
            pullDownButton();
            // let taskshtml = renderTasks(data);
            // container.innerHTML = taskshtml
        }) 
    } 
    getTodos()
});


    //fn that takes data and renders each task to screen
    // content.innerHTML = $(".description").val();