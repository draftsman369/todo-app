import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const appConfigs = {
  databaseURL: "https://todo-app-75714-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appConfigs);
const database = getDatabase(app);
const todoListInDB = ref(database, "todo-list");

const inputField = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");

addButton.addEventListener("click", function() {
  let inputValue = inputField.value;
  push(todoListInDB, inputValue);
  alert("Task added successfully!");
  clearInputField();
});

function clearInputField() {
  inputField.value = "";
}
