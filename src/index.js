import { library } from "./library";
import { Project } from "./projectClass";
import "./style.css";
import editImg from "./edit.svg";
import deleteImg from "./delete.svg";

// VARIABLES
const projectDialog = document.querySelector("#addProject");
const projectDialogInput = document.querySelector("#addProject > form > input");
const projectDialogCancel = document.querySelector(
  "#addProject > form > div > img:first-child"
);
const projectDialogAccept = document.querySelector(
  "#addProject >  form > div > input:last-child"
);
const projectAddButton = document.querySelector(".add > img");
const projectText = document.querySelector(".add > p");
const projectEditButton = document.querySelector(".actions > img:first-child");
const projectDeleteButton = document.querySelector(".actions > img:last-child");

// PROJECT DIV

function addProjectDiv() {
  const libraryDiv = document.querySelector(".projects");
  const projectDiv = document.createElement("div");
  projectDiv.appendChild(document.createElement("p"));
  const projectActionsDiv = document.createElement("div");
  projectActionsDiv.className = "actions";
  projectActionsDiv.appendChild(
    Object.assign(document.createElement("img"), {
      src: editImg,
      alt: "Edit",
    })
  );
  projectActionsDiv.appendChild(
    Object.assign(document.createElement("img"), {
      src: deleteImg,
      alt: "Delete",
    })
  );
  projectDiv.appendChild(projectActionsDiv);
  libraryDiv.appendChild(projectDiv);
  projectDiv.firstChild.textContent =
    library.displayLibraryList()[library.displayLibraryList().length - 1];
}

// EVENT LISTENERS

projectAddButton.addEventListener("click", () => {
  projectText.textContent = "";
  projectDialog.showModal();
});

projectDialogCancel.addEventListener("click", () => {
  projectText.textContent = "Add Project";
  projectDialog.close();
});

projectDialogAccept.addEventListener("click", () => {
  projectDialog.close(projectDialogInput.value);
  projectText.textContent = "Add Project";
  library.addProject(new Project(projectDialog.returnValue));
  addProjectDiv();
});
