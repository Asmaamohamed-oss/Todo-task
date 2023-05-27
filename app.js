const addForm = document.querySelector("#addForm")
const tassks = document.querySelector("#tasks")
const taskObj = {
    isCompleted:false
}

addForm.addEventListener("submit",function(e){
    e.preventDefault();
    const errs = {}
    const titleInput = addForm.elements.title.value.trim();
    const descInput = addForm.elements.textarea.value.trim();

    if(!titleInput.length){
        errs.title = "title is empty";
    }else if(titleInput.length < 5 || titleInput.length > 20){
        errs.title = "title must be between 5 and 20 characters";
    }else{
        errs.title = ""
        addForm.elements.title.nextElementSibling.classList.add("d-none")
    }
    /////////////////////////////////////////////////////////////////////
    if(!descInput.length){
        errs.desc = "Description is empty";
    }else if(descInput.length < 5 || titleInput.length > 300 ){
        errs.desc = "description must be between 5 and 300 characters";
    }else{
        errs.desc = "";
        addForm.elements.textarea.nextElementSibling.classList.add("d-none")
    }

    ///////////////Check Errors//////////////////////
    if(errs.title){
        checkErr(errs.title , addForm.elements.title)
    }else if(errs.desc){
        checkErr(errs.desc , addForm.elements.textarea)
    }else{
        drawUi(titleInput,descInput)
    }

})


function  checkErr(err , inputEle){
    inputEle.nextElementSibling.innerText = err;
    inputEle.nextElementSibling.classList.remove("d-none")
}

function  drawUi(titleInput,descInput){
    taskObj.titel = titleInput
    taskObj.desc = descInput
    const task = 
    `<div class="task not-completed">
    <h4>Title: ${taskObj.titel}</h4>
    <p>${taskObj.desc}</p>
        <button class="btn-success btn btn-completed">Complete</button>
        <button class="btn-danger btn btn-delted">Delete</button>
    </div>`
    tassks.innerHTML += task

    addForm.elements.title.value = ""
    addForm.elements.textarea.value = ""
}


tassks.addEventListener("click",function(e){
    if(e.target.classList.contains("btn-completed")){
        const taskParent = e.target.parentElement;
        if(taskObj.isCompleted == false){
            e.target.innerText = "Dismiss";
            taskObj.isCompleted = true;
            taskParent.classList.remove("not-completed")
            taskParent.classList.add("completed")
        }else{
            e.target.innerText = "Complete"
            taskObj.isCompleted = false;
            taskParent.classList.remove("completed")
            taskParent.classList.add("not-completed")
        }
    }

    if(e.target.classList.contains("btn-delted")){
        const taskParent = e.target.parentElement
        taskParent.remove()
    }
})