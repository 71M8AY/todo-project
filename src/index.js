import { library } from "./library";
import { Project } from "./projectClass";
import { Note } from "./noteClass";
import { SubNote } from "./subNoteClass";
import "./style.css";
import editImg from "./edit.svg";
import deleteImg from "./delete.svg";
import tickImg from "./tick.svg";

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

  const projectDivDialog = document.createElement("dialog");
  projectDivDialog.appendChild(
    Object.assign(document.createElement("input"), { type: "text" })
  );
  projectDivDialog.appendChild(
    Object.assign(document.createElement("img"), {
      src: tickImg,
      alt: "Accept",
    })
  );
  projectDivDialog.appendChild(
    Object.assign(document.createElement("img"), {
      src: deleteImg,
      alt: "Cancel",
    })
  );

  projectDiv.appendChild(projectActionsDiv);
  libraryDiv.appendChild(projectDiv);
  projectDiv.firstChild.textContent =
    library.displayLibraryList()[library.displayLibraryList().length - 1];
  projectDiv.append(projectDivDialog);

  projectActionsDiv.lastChild.addEventListener("click", () => {
    library.removeProject(projectDiv.firstChild.textContent);
    libraryDiv.removeChild(projectDiv);
  });

  projectActionsDiv.firstChild.addEventListener("click", () => {
    projectDivDialog.showModal();
  });

  projectDivDialog.children[2].addEventListener("click", () => {
    projectDivDialog.close();
  });

  projectDivDialog.children[1].addEventListener("click", () => {
    projectDivDialog.close(projectDivDialog.children[0].value);
    projectDivDialog.children[0].value = "";
    library
      .targetProject(projectDiv.firstChild.textContent)
      .renameProject(projectDivDialog.returnValue);
    projectDiv.firstChild.textContent = projectDivDialog.returnValue;
  });
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
  projectDialogInput.value = "";
  projectText.textContent = "Add Project";
  library.addProject(new Project(projectDialog.returnValue));
  addProjectDiv();
});
