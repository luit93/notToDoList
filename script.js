const taskList = [];
const badList = [];
const hrPerWeek = 168;
const handleOnSubmit = (e) => {
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hr = +frmData.get("hr");
  if (hr < 1) return;
  const newTask = {
    task,
    hr,
  };

  const ttlHrs = taskList.reduce((subTtl, row) => (subTtl += row.hr), 0);
  if (hr < 1) return;
  if (hrPerWeek < ttlHrs + hr) {
    return alert("not enough hrs left this week");
  }
  taskList.push(newTask);
  //   console.log(task, hr);
  displayTask();
  totalTaskHours();
};

console.log(taskList);

const displayTask = () => {
  let str = "";
  taskList.map((item, index) => {
    str += `
        <li>
          <div class="items">
            <span class="item">
              <input type="checkbox" />
              <label for="">${item.task}</label>
            </span>
            <span class="hrs">${item.hr}hr/wk</span>
            <button onclick="markNotToDo(${index})">Mark not to do</button>
            <button onclick="deleteItem(${index})">Delete</button>
          </div>
        </li>`;
  });
  //   elm.innerHTML =
  document.getElementById("task-list").innerHTML = str;
};

const dislayBadTaskList = () => {
  let str = "";
  badList.map((item, index) => {
    str += `
        <li>
          <div class="items">
            <span class="item">
              <input type="checkbox" />
              <label for="">${item.task}</label>
            </span>
            <span class="hrs">${item.hr}</span>
            <button onclick="markToDo(${index})">delete</button>
          </div>
        </li>`;
  });
  //   elm.innerHTML =
  document.getElementById("bad-list").innerHTML = str;
  totalBadHours();
};
//1. attach onclick to mark not to do button

// 2. remove item from taskList
const markNotToDo = (position) => {
  const itm = taskList.splice(position, 1)[0];
  console.log(itm, taskList);
  badList.push(itm);
  displayTask();
  dislayBadTaskList();
};

// 4. loop through badList and create<li> string
// 5. grab the badList  <ul> and pass the str from step 3 as innerhtml

const markToDo = (position) => {
  const itm = badList.splice(position, 1)[0];
  console.log(itm, badList);
  taskList.push(itm);
  displayTask();
  dislayBadTaskList();
};

const totalTaskHours = () => {
  const ttlHrs = taskList.reduce((subTtl, row) => (subTtl += row.hr), 0);

  document.getElementById("totalHrs").innerText = ttlHrs;
};

const totalBadHours = () => {
  const ttlHrs = badList.reduce((subTtl, row) => (subTtl += row.hr), 0);

  document.getElementById("badTotalHrs").innerText = ttlHrs;
};

// to delete an item from task array

const deleteItem = (i) => {
  const deletedValue = taskList.splice(i, 1)[0];
  displayTask();
  totalTaskHours();
  alert(deletedValue.task + "has been deleted");
};
