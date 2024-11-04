export const library = (function Library() {
  let libraryList = [];

  const add = (item) => {
    libraryList.push(item);
  };

  const remove = (itemName) => {
    const index = libraryList.findIndex((item) => item.name == itemName);
    if (index < 0) {
      throw "No such project exists in the library!";
    }
    console.log(index);
    libraryList.splice(index, 1);
  };

  const displayLibraryList = () => {
    let nameArray = libraryList.map((prj) => prj.name);
    return nameArray;
  };

  return { add, remove, displayLibraryList };
})();
