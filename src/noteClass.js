export class Note {
  constructor(title, desc, prio = 3, due = "Indefinite") {
    this.title = title;
    this.desc = desc;
    this.prio = prio;
    this.due = due;
    this.subNotes = [];
  }

  addSubNote(subNote) {
    this.subNotes.push(subNote);
  }

  removeSubNote(subNote) {
    const index = this.subNotes.findIndex((note) => note.goal === subNote);
    if (index < 0) {
      throw new Error("Goal doesn't exist!");
    }
    this.subNotes.splice(index, 1);
  }

  renameNote(newTitle) {
    this.title = newTitle;
  }

  changeDesc(newDesc) {
    this.desc = newDesc;
  }

  changePrio(newPrio) {
    this.prio = newPrio;
  }

  changeDue(newDue) {
    this.due = newDue;
  }
}
