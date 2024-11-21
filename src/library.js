import { Note } from "./noteClass";
import { Project } from "./projectClass";
import { SubNote } from "./subNoteClass";

export const library = (function Library() {
  let libraryList = [];

  window.addEventListener("DOMContentLoaded", () => {
    for (const item of JSON.parse(localStorage.getItem("libraryArray"))) {
      libraryList.push(new Project(item.name));
      for (const note of item.notes) {
        libraryList[libraryList.length - 1].addNote(
          new Note(note.title, note.desc, note._due, note.prio)
        );
        for (const subNote of note.subNotes) {
          libraryList[libraryList.length - 1].notes[
            libraryList[libraryList.length - 1].notes.length - 1
          ].addSubNote(new SubNote(subNote.goal, subNote.state));
        }
      }
    }
    console.log(library.libraryList);
  });

  const addProject = (item) => {
    libraryList.push(item);
  };

  const removeProject = (itemName) => {
    const index = libraryList.findIndex((item) => item.name === itemName);
    console.log(index);
    libraryList.splice(index, 1);
  };

  const targetProject = (projectName) => {
    const index = libraryList.findIndex((item) => item.name === projectName);
    return libraryList[index];
  };

  const displayLibraryList = () => {
    let nameArray = libraryList.map((prj) => prj.name);
    return nameArray;
  };

  return {
    addProject,
    removeProject,
    targetProject,
    displayLibraryList,
    libraryList,
  };
})();
