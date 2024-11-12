import { library } from "./library";
import { Project } from "./projectClass";
import { Note } from "./noteClass";
import { SubNote } from "./subNoteClass";
import "./style.css";
import editImg from "./edit.svg";
import deleteImg from "./delete.svg";
import tickImg from "./tick.svg";

// VARIABLES
const projectDialog = document.querySelector(".addProject");
const projectDialogInput = document.querySelector(".addProject > input");
const projectDialogCancel = document.querySelector(
  ".addProjectActions > img:last-child"
);
const projectDialogAccept = document.querySelector(
  ".addProjectActions > img:first-child"
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

  const projectDivDialog = document.createElement("div");
  projectDivDialog.classList.add("display", "renameProject");
  projectDivDialog.appendChild(
    Object.assign(document.createElement("input"), { type: "text" })
  );
  const projectDivDialogActions = document.createElement("div");
  projectDivDialogActions.className = "renameActions";

  projectDivDialogActions.appendChild(
    Object.assign(document.createElement("img"), {
      src: tickImg,
      alt: "Accept",
    })
  );
  projectDivDialogActions.appendChild(
    Object.assign(document.createElement("img"), {
      src: deleteImg,
      alt: "Cancel",
    })
  );
  projectDivDialog.appendChild(projectDivDialogActions);

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
    projectDivDialog.classList.toggle("display");
    projectDivDialog.children[0].focus();
  });

  projectDivDialogActions.lastChild.addEventListener("click", () => {
    projectDivDialog.classList.toggle("display");
  });

  projectDivDialogActions.firstChild.addEventListener("click", () => {
    projectDivDialog.classList.toggle("display");
    library
      .targetProject(projectDiv.firstChild.textContent)
      .renameProject(projectDivDialog.children[0].value);

    projectDiv.firstChild.textContent = projectDivDialog.children[0].value;
    projectDivDialog.children[0].value = "";
  });
}

// EVENT LISTENERS
projectAddButton.classList.add("visibility");
projectAddButton.classList.toggle("visibility");

projectAddButton.addEventListener("click", () => {
  projectText.textContent = "";
  projectDialog.classList.toggle("display");
  projectAddButton.classList.toggle("visibility");
  projectDialogInput.focus();
});

projectDialogCancel.addEventListener("click", () => {
  projectText.textContent = "Add Project";
  projectDialogInput.value = "";
  projectDialog.classList.toggle("display");
  projectAddButton.classList.toggle("visibility");
});

projectDialogAccept.addEventListener("click", () => {
  library.addProject(new Project(projectDialogInput.value));
  addProjectDiv();
  projectDialogInput.value = "";
  projectText.textContent = "Add Project";
  projectDialog.classList.toggle("display");
  projectAddButton.classList.toggle("visibility");
});
