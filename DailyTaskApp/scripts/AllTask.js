const Tasks = JSON.parse(localStorage.getItem('MyTasks')) || [];

RenderAllTasks();

function RenderAllTasks() {
    let todoListHTML = '';

    if (Tasks === null) return
    Tasks.forEach((Task) => {
        const { TaskDescription, TaskPoints, TaskDate } = Task;
        const html = `
      <div class="border">${TaskDescription}</div>
      <div class="border">${TaskPoints}</div>
      <div class="border">${TaskDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button> 
    `;
        todoListHTML += html;
    });

    if (document.querySelector('.todo-all-show')) {
        document.querySelector('.todo-all-show')
            .innerHTML = todoListHTML;
    }

    if (document.querySelector('.date-input')) {
        var date = new Date();
        document.querySelector('.date-input').value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
        '-' + date.getDate().toString().padStart(2, 0);
    }

    document.querySelectorAll('.js-delete-todo-button')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                Tasks.splice(index, 1);
                localStorage.setItem('MyTasks', JSON.stringify(Tasks));
                RenderAllTasks();
            });
        })

}

if (document.querySelector('.add-button'))
    document.querySelector('.add-button')
        .addEventListener('click', () => {
            if (CheckDate(document.querySelector('.date-input').value)) {
                document.querySelector('.popup').classList.remove('popup-hidden')
            } else {
                AddTask(document.querySelector('.task-description'), document.querySelector('.Points'), document.querySelector('.date-input'), Tasks);
                localStorage.setItem('MyTasks', JSON.stringify(Tasks));
                document.querySelector('.popup').classList.add('popup-hidden')
                RenderAllTasks();
            }

        });

function AddTask(Value1, Value2, Value3, Task) {
    console.log(Value1, Value2);
    const Id = Date.now();
    const inputElement = Value1;
    const TaskDescription = inputElement.value;
    const inputElement2 = Value2;
    const TaskPoints = inputElement2.value;
    const inputElement3 = Value3;
    const TaskDate = inputElement3.value;
    Task.push({ Id, TaskDescription, TaskPoints, TaskDate })
    inputElement.value = "";
    inputElement2.value = 1;

}

function CheckDate(dates) {
    const today = new Date();
    const date = new Date(dates);
    if (date.getFullYear() < today.getFullYear()) return true;
    else if (date.getFullYear() > today.getFullYear()) return false;
    if (date.getMonth() < today.getMonth()) return true;
    else if (date.getMonth() > today.getMonth()) return false;;
    if (date.getDate() < today.getDate() ) return true;
    return false;
}