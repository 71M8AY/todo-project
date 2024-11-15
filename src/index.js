import { library } from "./library";
import { Project } from "./projectClass";
import { Note } from "./noteClass";
import { SubNote } from "./subNoteClass";
import "./style.css";
import editImg from "./edit.svg";
import deleteImg from "./delete.svg";
import tickImg from "./tick.svg";

// VARIABLE
const check = /^[a-zA-Z0-9_]/;
let activeProject = "";
const noteDiv = document.querySelector(".notes");
const noteDialogBtn = document.querySelector("#addNoteBtn");
const noteDialog = document.querySelector(".addNote");
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

  projectDiv.addEventListener("click", () => {
    activeProject = projectDiv.firstChild.textContent;
    noteDiv.textContent = "";
    populate(activeProject);
    noteDialogBtn.classList.remove("visibility");
  });

  projectActionsDiv.lastChild.addEventListener("click", (e) => {
    e.stopPropagation();
    library.removeProject(projectDiv.firstChild.textContent);
    libraryDiv.removeChild(projectDiv);
    if (library.displayLibraryList().length === 0) {
      activeProject = "";
      noteDialogBtn.classList.add("visibility");
    }
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
    console.log(library.displayLibraryList());
  });
}

// NOTE DIV

function addNoteDiv(title, desc, due, prio) {
  const noteAddDiv = document.createElement("div");
  const noteActionsDiv = document.createElement("div");
  noteActionsDiv.className = "noteActions";
  noteActionsDiv.appendChild(
    Object.assign(document.createElement("img"), {
      src: editImg,
      alt: "Edit",
    })
  );
  noteActionsDiv.appendChild(
    Object.assign(document.createElement("img"), {
      src: deleteImg,
      alt: "Delete",
    })
  );

  noteAddDiv.appendChild(noteActionsDiv);

  noteActionsDiv.children[0].addEventListener("click", () => {});

  const noteContentDiv = document.createElement("div");
  for (let i = 0; i < 3; i++) {
    noteContentDiv.appendChild(document.createElement("div"));
  }

  noteContentDiv.children[0].className = "noteTitle";
  noteContentDiv.children[1].className = "extra";
  noteContentDiv.children[2].className = "noteFooter";

  noteContentDiv.children[0].appendChild(document.createElement("p"));
  noteContentDiv.children[0].firstChild.textContent = title;

  const description = document.createElement("div");
  description.className = "description";
  description.appendChild(document.createElement("p"));
  description.firstChild.textContent = desc;
  noteContentDiv.children[1].appendChild(description);
  noteContentDiv.children[1].appendChild(
    Object.assign(document.createElement("div"), { class: "extraList" })
  );

  const dueDate = document.createElement("div");
  dueDate.className = "dueDate";
  dueDate.textContent = due;
  const priority = document.createElement("div");
  priority.className = "priority";
  priority.value = prio;
  priority.appendChild(document.createElement("select"));
  for (let i = 0; i < 4; i++) {
    priority.firstChild.appendChild(document.createElement("option"));
  }
  priority.firstChild.children[0].value = "red";
  priority.firstChild.children[1].value = "yellow";
  priority.firstChild.children[2].value = "green";
  priority.firstChild.children[3].value = "white";

  priority.firstChild.addEventListener("change", () => {
    priority.firstChild.style.backgroundColor = priority.firstChild.value;
  });

  noteContentDiv.children[2].appendChild(dueDate);
  noteContentDiv.children[2].appendChild(priority);

  noteAddDiv.appendChild(noteContentDiv);

  noteDiv.appendChild(noteAddDiv);
}

// POPULATE FUNCTION
function populate(divName) {
  for (let item of library.targetProject(divName).notes) {
    addNoteDiv(item.title, item.desc, item._due, item.prio);
  }
}

// EVENT LISTENERS
window.addEventListener("load", () => {
  noteDialogBtn.classList.add("visibility");
});

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
  if (check.test(projectDialogInput.value)) {
    library.addProject(new Project(projectDialogInput.value));
    activeProject = projectDialogInput.value;
    addProjectDiv();
    projectDialogInput.value = "";
    projectText.textContent = "Add Project";
    projectDialog.classList.toggle("display");
    projectAddButton.classList.toggle("visibility");
  }
  projectDialogInput.focus();
});

// NOTE DIALOG

noteDialog.children[0].children[3].addEventListener("change", () => {
  noteDialog.children[0].children[3].style.backgroundColor =
    noteDialog.children[0].children[3].value;
});

noteDialogBtn.addEventListener("click", (e) => {
  e.preventDefault();
  noteDialog.showModal();
  noteDialog.children[0].children[0].focus();
});

noteDialog.children[0].children[4].children[1].addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    noteDialog.close();
  }
);

noteDialog.children[0].children[4].children[0].addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    if (check.test(noteDialog.children[0].children[0].value)) {
      noteDialog.close([
        noteDialog.children[0].children[0].value,
        noteDialog.children[0].children[1].value,
        noteDialog.children[0].children[2].children[1].value,
        noteDialog.children[0].children[3].value,
      ]);
      noteDialog.children[0].children[0].value = "";
      noteDialog.children[0].children[1].value = "";
      noteDialog.children[0].children[2].children[1].value = "";
      noteDialog.children[0].children[3].value = "";

      const tempArr = noteDialog.returnValue.split(",");
      library
        .targetProject(activeProject)
        .addNote(new Note(tempArr[0], tempArr[1], tempArr[2], tempArr[3]));

      const lastNote = library
        .targetProject(activeProject)
        .targetNote(tempArr[0]);
      addNoteDiv(lastNote.title, lastNote.desc, lastNote._due, lastNote.prio);
    }
    noteDialog.children[0].children[0].focus();
  }
);
