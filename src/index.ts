import { v4 as uuidv4 } from "uuid";

// console.log(uuidv4());

//Selects the element on the page
//<Interface> allows typescript to customize which methods appear in the autocompletion window

//Interface for the task
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const taskList = document.querySelector<HTMLUListElement>("#list");
const taskForm = document.getElementById(
  "#new-task-form"
) as HTMLFormElement | null;
const taskInput = document.querySelector<HTMLInputElement>("#new-task-title");

//Loads tasks into the array
const tasks: Task[] = loadTasks();
tasks.forEach(addNewListItem);

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  //Checks if the input is null or an empty string
  if (taskInput?.value == "" || taskInput?.value == null) return;
  const newTask: Task = {
    id: uuidv4(),
    title: taskInput.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  saveTasks();
  console.log(tasks);

  addNewListItem(newTask);
  taskInput.value = "";
});

//Function the adds the children to the list element
function addNewListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
    console.log(tasks);
  });

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  taskList?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON === null) return [];
  return JSON.parse(taskJSON);
}
