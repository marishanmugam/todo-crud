window.addEventListener('load', ()=> {
     todos = JSON.parse(localStorage.getItem('todos')) || [];
    

let todoForm = document.querySelector('#todo-form');

todoForm.addEventListener('submit',(e) => {
    e.preventDefault();
     if(e.target.elements.textbox.value==='')
     {
        alert('Text Field can`t empty');
     }
     else
     {

     
    const todo = {
        inputData : e.target.elements.textbox.value,
        done : false
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
    e.target.reset();
    displayTodos();
}
}) 
displayTodos();
});

const displayTodos = () => {
    let todoList = document.querySelector('#todolist');
    todoList.innerHTML =''

    todos.forEach(todo => {
        let todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        let label = document.createElement('label');
        let input = document.createElement('input');
        let content = document.createElement('div');
        let actions  = document.createElement('div');
        let editBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        input.type ='checkbox';
        input.checked = todo.done;
       
        content.classList.add('todo-content');
        actions.classList.add('actions');
        editBtn.classList.add('editBtn');
        deleteBtn.classList.add('deleteBtn');

        content.innerHTML = `<input type='text' value=${todo.inputData} readonly>`;

        editBtn.innerHTML = 'Edit'; 
        deleteBtn.innerHTML = 'Delete';

        label.appendChild(input);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

       
        if(todo.done)
        {
            todoItem.classList.add('completed');
        }
        input.addEventListener('change', ch => {
            todo.done = ch.target.checked;
            localStorage.setItem('todos',JSON.stringify(todos))

            if(todo.done)
            {
            
                todoItem.classList.add('completed');
            }
            else
            {

                todoItem.classList.remove('completed');
            }
            displayTodos();
        })

        editBtn.addEventListener('click',(edit) => {
            let editdata = content.querySelector('input');
            editdata.removeAttribute('readonly')
            editdata.focus();
            editdata.addEventListener('blur', (edit) => {

                todo.inputData = edit.target.value;
                localStorage.setItem('todos', JSON.stringify(todos))
            })
        })

        deleteBtn.addEventListener('click', (del) => {
            todos = todos.filter(t => t != todo);
           console.log(todos.filter(t => t != todo));
            localStorage.setItem('todos',JSON.stringify(todos));
            displayTodos();
       
        }) ;
    }) 
}