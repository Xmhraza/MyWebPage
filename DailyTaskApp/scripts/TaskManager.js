const Tasks = JSON.parse(localStorage.getItem('MyTasks')) || [];
let Points = JSON.parse(localStorage.getItem('MyPoints')) || 0;
let Id = JSON.parse(localStorage.getItem('Id')) || 0;
let dayChoice = 7;

RenderTasks();

function RenderTasks() {
  let todoListHTML = '';
  let todoNextListHTML = '';
  let indexCounter = 1;
  if (Tasks === null) return
  Tasks.forEach((Task) => {
    const { Id, TaskDescription, TaskPoints, TaskDate } = Task;
    let FirstSlot = "";
    let SecondSlot = "";
    if (CheckCurrentDate(TaskDate)) {
      FirstSlot = indexCounter;
      SecondSlot = `<button value="${Id}" class="Complete-todo-button js-complete-todo-button">Completed</button>
      <button value="${Id}" class="delete-todo-button js-delete-todo-button">Delete</button> `
    }
    if (NextWeekTasks(TaskDate, dayChoice)) {
      FirstSlot = TaskDate;
      SecondSlot = `<button value="${Id}" class="delete-todo-button js-delete-todo-button">Delete</button>`
    }

    const html = `
      <div>${FirstSlot}</div>
      <div>${TaskDescription}</div>
      <div>${TaskPoints}</div>
      ${SecondSlot}
    `;
    if (CheckCurrentDate(TaskDate)) {
      todoListHTML += html;
      indexCounter += 1;
    } else if (NextWeekTasks(TaskDate, dayChoice)) {
      todoNextListHTML += html;
    }

  });
  if (document.querySelector('.todo-grid-show'))
    document.querySelector('.todo-grid-show')
      .innerHTML = todoListHTML;
  if (document.querySelector('.Dtask-popup'))
    if (todoListHTML === '') document.querySelector('.Dtask-popup').classList.remove('popup-hidden');
  if (document.querySelector('.todo-upcoming-show'))
    document.querySelector('.todo-upcoming-show')
      .innerHTML = todoNextListHTML;
  if (document.querySelector('.Dtask-popup'))
    if (todoNextListHTML === '') document.querySelector('.Utask-popup').classList.remove('popup-hidden');
  GeneratePoints();

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        let myId = Tasks.findIndex(item => { return item.Id == parseInt(deleteButton.value) });
        Tasks.splice(myId, 1);
        localStorage.setItem('MyTasks', JSON.stringify(Tasks));
        RenderTasks();
      });
    });

  document.querySelectorAll('.js-complete-todo-button')
    .forEach((CompleteButton, index) => {
      CompleteButton.addEventListener('click', () => {
        let myId = Tasks.findIndex(item => { return item.Id == parseInt(CompleteButton.value) });
        Points += parseInt(Tasks[myId].TaskPoints);
        Tasks.splice(myId, 1);
        localStorage.setItem('MyTasks', JSON.stringify(Tasks));
        localStorage.setItem('MyPoints', JSON.stringify(Points));
        RenderTasks();
      });
    });

  GeneratePoints();
}


if (document.querySelector('.Complete-todo-button'))
  document.querySelector('.Complete-todo-button')
    .addEventListener('click', () => {
      GeneratePoints();
    });

document.querySelectorAll('.day-button')
  .forEach((dayButton, index) => {
    dayButton.addEventListener('click', () => {
      dayChoice = parseInt(dayButton.value);
      RenderTasks();
    });
  });


function GeneratePoints() {
  setTimeout(() => {
    if (document.querySelector('.total-points'))
      document.querySelector('.total-points')
        .innerHTML = "Total Points : " + Points;
  }, 30);

}

function CheckCurrentDate(dates) {
  const today = new Date();
  const date = new Date(dates);
  return date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
}

function NextWeekTasks(date, dayNumber) {
  const temp = new Date();
  const dateValue = new Date(date);
  const nextWeek = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + dayNumber);
  if (nextWeek.getDate() >= dateValue.getDate() && !CheckCurrentDate(date) && nextWeek.getMonth() == dateValue.getMonth() &&
    nextWeek.getFullYear() == dateValue.getFullYear()) return true;
  if (nextWeek.getMonth() == dateValue.getMonth() + 1 && (nextWeek.getDate() + daysInThisMonth()) - dateValue.getDate() < dayNumber) return true;
  if (nextWeek.getFullYear() == dateValue.getFullYear() + 1 && nextWeek.getMonth() == 1
    && (nextWeek.getDate() + daysInThisMonth()) - dateValue.getDate() < dayNumber) return true;
  return false;


}

function daysInThisMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}


export function CalculatePoints(ShopValue) {
  Points -= ShopValue
  localStorage.setItem('MyPoints', JSON.stringify(Points));
  RenderTasks();
}

export { Points };

