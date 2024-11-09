import { library } from "./library";
import "./style.css";

// VARIABLES

const projectDialog = document.querySelector("#addProject");
const projectDialogCancel = document.querySelector(
  "#addProject > div > img:first-child"
);
const projectAddButton = document.querySelector(".add > img");
const projectText = document.querySelector(".add > p");
const projectEditButton = document.querySelector(".actions > img:first-child");
const projectDeleteButton = document.querySelector(".actions > img:last-child");

const libraryDiv = document.querySelector(".library");
const projectDiv = document.createElement("div");
projectDiv.className = "add";
projectDiv.appendChild(document.createElement("p"));
projectDiv.appendChild(document.createElement("img"));
projectDiv.appendChild(document.createElement("img"));

// EVENT LISTENERS

projectAddButton.addEventListener("click", () => {
  projectText.textContent = "";
  projectDialog.showModal();
});

projectDialogCancel.addEventListener("click", () => {
  projectText.textContent = "Add Project";
  projectDialog.close();
});
