
// //button pressed, toggles between showing and hiding content
let coll = document.getElementsByClassName("collapsible");
let task = document.getElementsByClassName("item")[0];

document.addEventListener("DOMContentLoaded", () => {
    function renderTasks(taskArray) {
        let taskHTMLArray = taskArray.map((currentEvent) => {
            return `
            <div class="outer-div">
            <div>
                <form action="/api/todo/${currentEvent.id}?form=true&_method=put" method="POST" id="edit">
                    <input class="edit-input" type="text" name="todo" value="${currentEvent.todo}">
                    <button class="edit-button" type="submit" id="submit">Edit</button>
                </form>
            </div>
            <form action="/api/detail/${currentEvent.id}?form=true&_method=put" method="POST">
                <div class="form-row">
                    <div class="col" id="format-form2">
                        <input type="text" class="edit-input" name="details" placeholder="Add details here!">
                        <button class="edit-button" type="submit">Add</button>
                    </div>
                </div>
            </form>
    
            <div class="button-div1">
                <button type="button" value="click" class="collapsible button button5"><strong>Click</strong> for task
                    details</button>
                <div class="content">
                    <p>
                        ${currentEvent.details}
                    </p>
                </div>
            </div>
    
            
                <form class="button-div2" action="api/todo/${currentEvent.id}?form=true&_method=delete" method="POST">
                    <button type="submit" class="delete"><strong>Click</strong> to delete task</button>
                </form>
            
        </div>
            `
        })
        return taskHTMLArray.join("");
    }
    function pullDownButton() {
        let i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
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
        $.get('/api/todo').then((data) => {
            $(".Container").html(renderTasks(data))
            pullDownButton();
        })
    }
    getTodos()
});


    //fn that takes data and renders each task to screen
    // content.innerHTML = $(".description").val();