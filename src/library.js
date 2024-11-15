import { Project } from "./projectClass";
import { Note } from "./noteClass";
import { SubNote } from "./subNoteClass";

export const library = (function Library() {
  let libraryList = [];

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

  return { addProject, removeProject, targetProject, displayLibraryList };
})();

library.addProject(new Project("Build a car"));
library.addProject(new Project("Go shopping"));
library.addProject(new Project("Start a fire"));
console.log(library.displayLibraryList());
library
  .targetProject("Go shopping")
  .addNote(new Note("Buy veggies", "Gotta buy lots of green", 2));
console.log(library.targetProject("Go shopping"));

library
  .targetProject("Go shopping")
  .targetNote("Buy veggies")
  .addSubNote(new SubNote("Green veggies", false));
