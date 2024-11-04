import { Project, Notes } from "./projects";

export const library = (function Library() {
  let libraryList = [];

  const addProject = (item) => {
    libraryList.push(item);
  };

  const removeProject = (itemName) => {
    const index = libraryList.findIndex((item) => item.name == itemName);
    if (index < 0) {
      throw "No such project exists in the library!";
    }
    console.log(index);
    libraryList.splice(index, 1);
  };

  //   const renameProject = (itemName, newName) => {
  //     const index = libraryList.findIndex((item) => item.name == itemName);
  //     libraryList[index].name = newName;
  //   };

  const displayLibraryList = () => {
    let nameArray = libraryList.map((prj) => prj.name);
    return nameArray;
  };

  return { addProject, removeProject, displayLibraryList };
})();
