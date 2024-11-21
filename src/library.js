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
