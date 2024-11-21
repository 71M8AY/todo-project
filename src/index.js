import { library } from "./library";
import { Project } from "./projectClass";
import { Note } from "./noteClass";
import { SubNote } from "./subNoteClass";
import { formatter } from "./formatter";
import "./style.css";
import plusImg from "./plus.svg";
import editImg from "./edit.svg";
import deleteImg from "./delete.svg";
import tickImg from "./tick.svg";
import expandImg from "./expand.svg";
import shrinkImg from "./shrink.svg";

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

  projectDiv.firstChild.addEventListener("click", () => {
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
    if (
      check.test(projectDivDialog.children[0].value) &&
      !library.displayLibraryList().includes(projectDivDialog.children[0].value)
    ) {
      projectDivDialog.classList.toggle("display");
      library
        .targetProject(projectDiv.firstChild.textContent)
        .renameProject(projectDivDialog.children[0].value);

      projectDiv.firstChild.textContent = projectDivDialog.children[0].value;
      projectDivDialog.children[0].value = "";
      console.log(library.displayLibraryList());
    }
    projectDivDialog.children[0].focus();
  });
}

// NOTE DIV

function addNoteDiv(title, desc, due, prio) {
  const noteAddDiv = document.createElement("div");

  const noteDialogDiv = document.createElement("dialog");
  noteDialogDiv.className = "addNote";
  noteDialogDiv.classList.add("renameNote");
  noteDialogDiv.appendChild(
    Object.assign(document.createElement("form"), { method: "dialog" })
  );
  noteDialogDiv.children[0].appendChild(
    Object.assign(document.createElement("input"), {
      type: "text",
      value: title,
    })
  );
  noteDialogDiv.children[0].appendChild(
    Object.assign(document.createElement("textarea"), {
      textContent: desc,
      rows: 5,
    })
  );
  noteDialogDiv.children[0].appendChild(document.createElement("div"));
  noteDialogDiv.children[0].children[2].className = "date";
  noteDialogDiv.children[0].children[2].appendChild(
    Object.assign(document.createElement("p"), { textContent: "Due Date:" })
  );
  noteDialogDiv.children[0].children[2].appendChild(
    Object.assign(document.createElement("input"), {
      type: "date",
      value: library.targetProject(activeProject).targetNote(title)._due,
      max: "2027-01-01",
    })
  );
  const renameNoteActions = document.createElement("div");
  renameNoteActions.className = "dialogActions";
  renameNoteActions.classList.add("renameNoteActions");
  renameNoteActions.appendChild(
    Object.assign(document.createElement("input"), {
      type: "image",
      src: tickImg,
    })
  );
  renameNoteActions.appendChild(
    Object.assign(document.createElement("input"), {
      type: "image",
      src: deleteImg,
    })
  );
  noteDialogDiv.appendChild(renameNoteActions);
  noteDiv.appendChild(noteDialogDiv);

  renameNoteActions.children[0].addEventListener("click", (e) => {
    e.preventDefault();
    if (check.test(noteDialogDiv.children[0].children[0].value)) {
      noteDialogDiv.close([
        noteDialogDiv.children[0].children[0].value,
        noteDialogDiv.children[0].children[1].value,
        noteDialogDiv.children[0].children[2].children[1].value,
      ]);
    }

    let tempNoteArr = noteDialogDiv.returnValue.split(",");
    if (tempNoteArr.length > 3) {
      const len = tempNoteArr.slice(1, -1);
      tempNoteArr.splice(2, len.length - 1);
      tempNoteArr[1] = len.join(", ");
    }

    library
      .targetProject(activeProject)
      .targetNote(noteContentDiv.children[0].firstChild.textContent)
      .renameNote(tempNoteArr[0]);
    library
      .targetProject(activeProject)
      .targetNote(tempNoteArr[0])
      .changeDesc(tempNoteArr[1]);
    library
      .targetProject(activeProject)
      .targetNote(tempNoteArr[0])
      .changeDue(tempNoteArr[2]);

    const currentNote = library
      .targetProject(activeProject)
      .targetNote(tempNoteArr[0]);

    noteContentDiv.children[0].firstChild.textContent = currentNote.title;
    description.firstChild.textContent = currentNote.desc;
    dueDate.textContent = formatter(currentNote._due);

    console.log(currentNote);
  });

  renameNoteActions.children[1].addEventListener("click", (e) => {
    e.preventDefault();
    noteDialogDiv.close();
  });

  const noteActionsDiv = document.createElement("div");
  noteActionsDiv.className = "noteActions";
  noteActionsDiv.appendChild(document.createElement("div"));
  noteActionsDiv.firstChild.appendChild(
    Object.assign(document.createElement("img"), {
      src: expandImg,
      alt: "Expand",
    })
  );
  noteActionsDiv.children[0].appendChild(
    Object.assign(document.createElement("img"), {
      src: shrinkImg,
      alt: "Shrink",
    })
  );
  noteActionsDiv.children[0].children[0].classList.add("display");
  noteActionsDiv.children[0].children[1].classList.add("display");
  noteActionsDiv.children[0].children[0].classList.toggle("display");

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

  noteActionsDiv.children[0].children[0].addEventListener("click", () => {
    noteContentDiv.children[1].classList.toggle("expanded");
    noteContentDiv.children[2].classList.toggle("footerBorder");
    noteActionsDiv.children[0].children[0].classList.toggle("display");
    noteActionsDiv.children[0].children[1].classList.toggle("display");
  });

  noteActionsDiv.children[0].children[1].addEventListener("click", () => {
    noteContentDiv.children[1].classList.toggle("expanded");
    noteContentDiv.children[2].classList.toggle("footerBorder");
    noteActionsDiv.children[0].children[0].classList.toggle("display");
    noteActionsDiv.children[0].children[1].classList.toggle("display");
  });

  noteActionsDiv.children[1].addEventListener("click", () => {
    noteDialogDiv.showModal();
  });

  noteActionsDiv.children[2].addEventListener("click", () => {
    library
      .targetProject(activeProject)
      .removeNote(noteContentDiv.children[0].firstChild.textContent);
    noteDiv.removeChild(noteAddDiv);
  });

  const noteContentDiv = document.createElement("div");
  for (let i = 0; i < 3; i++) {
    noteContentDiv.appendChild(document.createElement("div"));
  }

  noteContentDiv.children[0].className = "noteTitle";
  noteContentDiv.children[1].className = "extra";
  noteContentDiv.children[1].classList.add("expanded");
  noteContentDiv.children[1].classList.toggle("expanded");
  noteContentDiv.children[2].className = "noteFooter";
  noteContentDiv.children[2].classList.add("footerBorder");
  noteContentDiv.children[2].classList.toggle("footerBorder");

  noteContentDiv.children[0].appendChild(document.createElement("p"));
  noteContentDiv.children[0].firstChild.textContent = title;

  const description = document.createElement("div");
  description.className = "description";
  description.appendChild(document.createElement("p"));
  description.firstChild.textContent = desc;
  noteContentDiv.children[1].appendChild(description);
  noteContentDiv.children[1].appendChild(
    Object.assign(document.createElement("img"), { src: plusImg })
  );
  noteContentDiv.children[1].children[1].classList.add("addSubNote", "display");
  noteContentDiv.children[1].children[1].classList.toggle("display");
  noteContentDiv.children[1].appendChild(document.createElement("div"));
  noteContentDiv.children[1].children[2].classList.add(
    "subNoteInputDiv",
    "display"
  );
  noteContentDiv.children[1].children[2].appendChild(
    document.createElement("input")
  );
  noteContentDiv.children[1].children[2].appendChild(
    Object.assign(document.createElement("img"), {
      src: tickImg,
      alt: "Accept",
    })
  );
  noteContentDiv.children[1].children[2].appendChild(
    Object.assign(document.createElement("img"), {
      src: deleteImg,
      alt: "Cancel",
    })
  );
  noteContentDiv.children[1].appendChild(document.createElement("div"));
  noteContentDiv.children[1].children[3].className = "extraList";

  noteContentDiv.children[1].children[1].addEventListener("click", () => {
    noteContentDiv.children[1].children[1].classList.toggle("display");
    noteContentDiv.children[1].children[2].classList.toggle("display");
    noteContentDiv.children[1].children[2].children[0].focus();
  });

  noteContentDiv.children[1].children[2].children[2].addEventListener(
    "click",
    () => {
      noteContentDiv.children[1].children[2].firstChild.value = "";
      noteContentDiv.children[1].children[1].classList.toggle("display");
      noteContentDiv.children[1].children[2].classList.toggle("display");
    }
  );

  noteContentDiv.children[1].children[2].children[1].addEventListener(
    "click",
    () => {
      if (
        check.test(noteContentDiv.children[1].children[2].firstChild.value) &&
        !library
          .targetProject(activeProject)
          .targetNote(noteContentDiv.children[0].firstChild.textContent)
          .showSubNotes()
          .includes(noteContentDiv.children[1].children[2].firstChild.value)
      ) {
        console.log(
          library
            .targetProject(activeProject)
            .targetNote(noteContentDiv.children[0].firstChild.textContent)
            .subNotes
        );

        library
          .targetProject(activeProject)
          .targetNote(noteContentDiv.children[0].firstChild.textContent)
          .addSubNote(
            new SubNote(noteContentDiv.children[1].children[2].firstChild.value)
          );

        const listDiv = document.createElement("div");

        listDiv.appendChild(
          Object.assign(document.createElement("input"), { type: "checkbox" })
        );

        listDiv.firstChild.classList.add("display");
        listDiv.firstChild.classList.toggle("display");
        listDiv.appendChild(document.createElement("div"));
        listDiv.children[1].appendChild(
          Object.assign(document.createElement("p"), {
            textContent:
              noteContentDiv.children[1].children[2].firstChild.value,
          })
        );
        listDiv.children[1].firstChild.classList.add("visibility", "crossed");
        listDiv.children[1].firstChild.classList.toggle("visibility");
        listDiv.children[1].firstChild.classList.toggle("crossed");

        listDiv.children[1].appendChild(
          Object.assign(document.createElement("input"), { type: "text" })
        );
        listDiv.children[1].lastChild.classList.add("display");
        listDiv.children[1].lastChild.value =
          listDiv.children[1].firstChild.textContent;

        listDiv.appendChild(document.createElement("div"));
        listDiv.lastChild.className = "subNoteActions";
        listDiv.lastChild.appendChild(
          Object.assign(document.createElement("img"), {
            src: editImg,
            alt: "Edit",
          })
        );
        listDiv.lastChild.appendChild(
          Object.assign(document.createElement("img"), {
            src: tickImg,
            alt: "Accept",
          })
        );
        listDiv.lastChild.appendChild(
          Object.assign(document.createElement("img"), {
            src: deleteImg,
            alt: "Cancel",
          })
        );
        listDiv.lastChild.appendChild(
          Object.assign(document.createElement("img"), {
            src: deleteImg,
            alt: "Delete",
          })
        );

        for (const child of listDiv.lastChild.children) {
          child.classList.add("display");
        }

        listDiv.lastChild.firstChild.classList.toggle("display");
        listDiv.lastChild.lastChild.classList.toggle("display");

        listDiv.lastChild.lastChild.addEventListener("click", () => {
          library
            .targetProject(activeProject)
            .targetNote(noteContentDiv.children[0].firstChild.textContent)
            .removeSubNote(listDiv.children[1].firstChild.textContent);

          noteContentDiv.children[1].children[3].removeChild(listDiv);
        });

        listDiv.lastChild.firstChild.addEventListener("click", () => {
          for (const child of listDiv.lastChild.children) {
            child.classList.toggle("display");
          }
          listDiv.firstChild.classList.toggle("display");
          listDiv.children[1].firstChild.classList.toggle("visibility");
          listDiv.children[1].lastChild.classList.toggle("display");
          listDiv.children[1].lastChild.focus();
        });

        listDiv.lastChild.children[1].addEventListener("click", () => {
          for (const child of listDiv.lastChild.children) {
            child.classList.toggle("display");
          }
          if (
            check.test(listDiv.children[1].lastChild.value) &&
            !library
              .targetProject(activeProject)
              .targetNote(noteContentDiv.children[0].firstChild.textContent)
              .targetSubNote(listDiv.children[1].firstChild.textContent)
              .includes(listDiv.children[1].lastChild.value)
          ) {
            library
              .targetProject(activeProject)
              .targetNote(noteContentDiv.children[0].firstChild.textContent)
              .targetSubNote(listDiv.children[1].firstChild.textContent)
              .renameGoal(listDiv.children[1].lastChild.value);
            listDiv.children[1].firstChild.textContent =
              listDiv.children[1].lastChild.value;
            listDiv.children[1].firstChild.classList.toggle("visibility");
            listDiv.children[1].lastChild.classList.toggle("display");
            listDiv.firstChild.classList.toggle("display");
          }
        });

        listDiv.lastChild.children[2].addEventListener("click", () => {
          for (const child of listDiv.lastChild.children) {
            child.classList.toggle("display");
          }
          listDiv.children[1].firstChild.classList.toggle("visibility");
          listDiv.children[1].lastChild.classList.toggle("display");
          listDiv.firstChild.classList.toggle("display");
        });

        listDiv.firstChild.addEventListener("change", () => {
          let state = library
            .targetProject(activeProject)
            .targetNote(noteContentDiv.children[0].firstChild.textContent)
            .targetSubNote(listDiv.children[1].firstChild.textContent).state;

          library
            .targetProject(activeProject)
            .targetNote(noteContentDiv.children[0].firstChild.textContent)
            .targetSubNote(listDiv.children[1].firstChild.textContent)
            .changeState(!state);

          listDiv.children[1].firstChild.classList.toggle("crossed");
        });

        noteContentDiv.children[1].children[2].firstChild.value = "";
        noteContentDiv.children[1].children[1].classList.toggle("display");
        noteContentDiv.children[1].children[2].classList.toggle("display");
        noteContentDiv.children[1].children[3].appendChild(listDiv);
      }
      noteContentDiv.children[1].children[2].children[0].focus();
    }
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

  priority.firstChild.style.backgroundColor = prio;

  priority.firstChild.addEventListener("change", () => {
    library
      .targetProject(activeProject)
      .targetNote(noteContentDiv.children[0].firstChild.textContent)
      .changePrio(priority.firstChild.value);
    priority.firstChild.style.backgroundColor = priority.firstChild.value;
  });

  noteContentDiv.children[2].appendChild(dueDate);
  noteContentDiv.children[2].appendChild(priority);

  noteAddDiv.appendChild(noteContentDiv);

  noteDiv.appendChild(noteAddDiv);
}

function populateSubNote(subNoteName) {
  const listDiv = document.createElement("div");

  listDiv.appendChild(
    Object.assign(document.createElement("input"), { type: "checkbox" })
  );

  if (
    library
      .targetProject(activeProject)
      .targetNote(noteDiv.lastChild.lastChild.firstChild.firstChild.textContent)
      .targetSubNote(subNoteName).state
  ) {
    listDiv.firstChild.setAttribute("checked", "");
  }

  listDiv.firstChild.classList.add("display");
  listDiv.firstChild.classList.toggle("display");
  listDiv.appendChild(document.createElement("div"));
  listDiv.children[1].appendChild(
    Object.assign(document.createElement("p"), {
      textContent: subNoteName,
    })
  );
  listDiv.children[1].firstChild.classList.add("visibility", "crossed");
  listDiv.children[1].firstChild.classList.toggle("visibility");
  listDiv.children[1].firstChild.classList.toggle("crossed");

  listDiv.children[1].appendChild(
    Object.assign(document.createElement("input"), { type: "text" })
  );
  listDiv.children[1].lastChild.classList.add("display");
  listDiv.children[1].lastChild.value =
    listDiv.children[1].firstChild.textContent;

  listDiv.appendChild(document.createElement("div"));
  listDiv.lastChild.className = "subNoteActions";
  listDiv.lastChild.appendChild(
    Object.assign(document.createElement("img"), {
      src: editImg,
      alt: "Edit",
    })
  );
  listDiv.lastChild.appendChild(
    Object.assign(document.createElement("img"), {
      src: tickImg,
      alt: "Accept",
    })
  );
  listDiv.lastChild.appendChild(
    Object.assign(document.createElement("img"), {
      src: deleteImg,
      alt: "Cancel",
    })
  );
  listDiv.lastChild.appendChild(
    Object.assign(document.createElement("img"), {
      src: deleteImg,
      alt: "Delete",
    })
  );

  for (const child of listDiv.lastChild.children) {
    child.classList.add("display");
  }

  listDiv.lastChild.firstChild.classList.toggle("display");
  listDiv.lastChild.lastChild.classList.toggle("display");

  listDiv.lastChild.lastChild.addEventListener("click", () => {
    library
      .targetProject(activeProject)
      .targetNote(
        listDiv.parentElement.parentElement.parentElement.firstChild.firstChild
          .textContent
      )
      .removeSubNote(listDiv.children[1].firstChild.textContent);

    listDiv.parentElement.removeChild(listDiv);
  });

  listDiv.lastChild.firstChild.addEventListener("click", () => {
    for (const child of listDiv.lastChild.children) {
      child.classList.toggle("display");
    }
    listDiv.firstChild.classList.toggle("display");
    listDiv.children[1].firstChild.classList.toggle("visibility");
    listDiv.children[1].lastChild.classList.toggle("display");
    listDiv.children[1].lastChild.focus();
  });

  listDiv.lastChild.children[1].addEventListener("click", () => {
    for (const child of listDiv.lastChild.children) {
      child.classList.toggle("display");
    }
    library
      .targetProject(activeProject)
      .targetNote(
        listDiv.parentElement.parentElement.parentElement.firstChild.firstChild
          .textContent
      )
      .targetSubNote(listDiv.children[1].firstChild.textContent)
      .renameGoal(listDiv.children[1].lastChild.value);
    listDiv.children[1].firstChild.textContent =
      listDiv.children[1].lastChild.value;
    listDiv.children[1].firstChild.classList.toggle("visibility");
    listDiv.children[1].lastChild.classList.toggle("display");
    listDiv.firstChild.classList.toggle("display");
  });

  listDiv.lastChild.children[2].addEventListener("click", () => {
    for (const child of listDiv.lastChild.children) {
      child.classList.toggle("display");
    }
    listDiv.children[1].firstChild.classList.toggle("visibility");
    listDiv.children[1].lastChild.classList.toggle("display");
    listDiv.firstChild.classList.toggle("display");
  });

  listDiv.firstChild.addEventListener("change", () => {
    let state = library
      .targetProject(activeProject)
      .targetNote(
        listDiv.parentElement.parentElement.parentElement.firstChild.firstChild
          .textContent
      )
      .targetSubNote(listDiv.children[1].firstChild.textContent).state;

    library
      .targetProject(activeProject)
      .targetNote(
        listDiv.parentElement.parentElement.parentElement.firstChild.firstChild
          .textContent
      )
      .targetSubNote(listDiv.children[1].firstChild.textContent)
      .changeState(!state);
    console.log(
      library
        .targetProject(activeProject)
        .targetNote(noteContentDiv.children[0].firstChild.textContent)
        .targetSubNote(listDiv.children[1].firstChild.textContent)
    );

    listDiv.children[1].firstChild.classList.toggle("crossed");
  });

  noteDiv.lastChild.lastChild.children[1].lastChild.appendChild(listDiv);
}

// POPULATE FUNCTION
function populate(divName) {
  for (let item of library.targetProject(divName).notes) {
    addNoteDiv(item.title, item.desc, formatter(item._due), item.prio);
    for (let subnote of item.subNotes) {
      populateSubNote(subnote.goal);
    }
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
  if (
    check.test(projectDialogInput.value) &&
    !library.displayLibraryList().includes(projectDialogInput.value)
  ) {
    library.addProject(new Project(projectDialogInput.value));
    activeProject = projectDialogInput.value;
    addProjectDiv();
    projectDialogInput.value = "";
    projectText.textContent = "Add Project";
    projectDialog.classList.toggle("display");
    projectAddButton.classList.toggle("visibility");
    console.log(library.displayLibraryList());
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
    if (
      check.test(noteDialog.children[0].children[0].value) &&
      !library
        .targetProject(activeProject)
        .showNotes()
        .includes(noteDialog.children[0].children[0].value)
    ) {
      noteDialog.close([
        noteDialog.children[0].children[0].value,
        noteDialog.children[0].children[1].value,
        noteDialog.children[0].children[2].children[1].value,
        noteDialog.children[0].children[3].value,
      ]);
      noteDialog.children[0].children[0].value = "";
      noteDialog.children[0].children[1].value = "";
      noteDialog.children[0].children[2].children[1].value = "";
      noteDialog.children[0].children[3].value = "white";
      noteDialog.children[0].children[3].style.backgroundColor =
        noteDialog.children[0].children[3].value;

      let tempArr = noteDialog.returnValue.split(",");
      if (tempArr.length > 3) {
        const len = tempArr.slice(1, -2);
        tempArr.splice(2, len.length - 1);
        tempArr[1] = len.join(", ");
      }

      library
        .targetProject(activeProject)
        .addNote(new Note(tempArr[0], tempArr[1], tempArr[2], tempArr[3]));

      const lastNote = library
        .targetProject(activeProject)
        .targetNote(tempArr[0]);
      addNoteDiv(
        lastNote.title,
        lastNote.desc,
        formatter(lastNote._due),
        lastNote.prio
      );
    }
    noteDialog.children[0].children[0].focus();
  }
);

projectDialogInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (
      check.test(projectDialogInput.value) &&
      !library.displayLibraryList().includes(projectDialogInput.value)
    ) {
      library.addProject(new Project(projectDialogInput.value));
      activeProject = projectDialogInput.value;
      addProjectDiv();
      projectDialogInput.value = "";
      projectText.textContent = "Add Project";
      projectDialog.classList.toggle("display");
      projectAddButton.classList.toggle("visibility");
    }
    projectDialogInput.focus();
  }
});
