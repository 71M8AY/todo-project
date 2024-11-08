export class Project {
  constructor(name) {
    this.name = name;
    this.notes = [];
  }

  addNote(note) {
    this.notes.push(note);
  }

  removeNote(noteName) {
    const index = this.notes.findIndex((note) => note.title === noteName);
    if (index < 0) {
      throw new Error("Note doesn't exist!");
    }
    this.notes.splice(index, 1);
  }

  renameProject(newName) {
    this.name = newName;
  }

  showNotes() {
    let array = this.notes.map((note) => note.title);
    return array;
  }

  targetNote(noteName) {
    const index = this.notes.findIndex((note) => note.title === noteName);
    if (index < 0) {
      throw new Error("Note doesn't exist!");
    }
    return this.notes[index];
  }
}
