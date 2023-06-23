// Get references to the input field and the button
const inputField = document.getElementById('input-field-input');
const button = document.getElementById('input-field-button');
const todoList = document.querySelector('.todoList');
const deleteAllItems = document.getElementById('clear_all');

// Listen for changes to the input field
inputField.addEventListener('input', function() {
    // Check if the input field is empty
    if (inputField.value.trim() != '') {
        // If the input field is not empty, enable the button
        button.disabled = false;
        button.classList.remove('disabled');  // Referring to Bootstrap's 'disabled' class
    } else {
        // If the input field is empty, disable the button
        button.disabled = true;
        button.classList.add('disabled');
    }
});

showTasks()

//If user clicks on the add button
button.onclick = () => {
    //getting local storage
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
    if (getLocalStorage == null) {
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(inputField.value);
    //Sets up local storage item with Key and Value
    //Transforms JS object into a JSON string
    localStorage.setItem("New Todo", JSON.stringify(listArr));

    //calling showTasks function when active button is being clicked on
    showTasks(); 
}

//Adds task to to-do list
function showTasks(){
    // Get tasks from local storage or initialize to empty array
    let listArr = JSON.parse(localStorage.getItem("New Todo") || '[]');

    // Clear the todoList container
    todoList.innerHTML = '';

    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length; //.length = len() in Python for lists -> passing the length value in pendingNumber 

    if(listArr.length > 0) {
        // If the length of the list is bigger than 0, enable the button
        deleteAllItems.disabled = false;
        deleteAllItems.classList.remove('disabled');  // Referring to Bootstrap's 'disabled' class
    } else {
        // If the list is empty, disable the button
        deleteAllItems.disabled = true;
        deleteAllItems.classList.add('disabled');
    }

    listArr.forEach((task,index) => {
        // Create a new div element
        let div = document.createElement('div');
        div.className = 'input-group';
    
        // Create the HTML for the task
        let html = 
            `<div class="input-group-text">
                <input class="form-check-input mt-0" type="radio" value="" aria-label="Radio button for following text input">
             </div>
                <input type="text" class="form-control" placeholder="${task}" aria-label="Text input with radio button">
                <button class="btn btn-danger ${index}" type="button" id="button-addon" onclick="deleteTask()"> Delete </button>
            `;

        // Set the inner HTML of the div
        div.innerHTML = html;

        // Add the div to the todo list
        todoList.appendChild(div);
        });
        //Keeps input field blank once task has been added
        inputField.value= " ";
}

//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage)
    listArr.splice(index,1) //deletes the particular item, as referred to by the index. 1 = remove one element exactly
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

//clear all function
deleteAllItems.onclick = () => {
    //returns an empty array in local storage
    listArr = [];
    //update local storage item
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    //show to-do list
    showTasks();
}