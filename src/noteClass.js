export class Note {
  constructor(title, desc, due, prio) {
    this.title = title;
    this.desc = desc;
    this.prio = prio;
    this.due = due;
    this.subNotes = [];
  }

  set due(newDueDate) {
    if (newDueDate === "") {
      this._due = "Indefinite";
    } else {
      this._due = newDueDate;
    }
  }

  addSubNote(subNote) {
    this.subNotes.push(subNote);
  }

  showSubNotes() {
    let array = this.subNotes.map((subNote) => subNote.goal);
    return array;
  }

  targetSubNote(subNoteName) {
    const index = this.subNotes.findIndex(
      (subNote) => subNote.goal === subNoteName
    );
    if (index < 0) {
      throw new Error("Subnote doesn't exist!");
    }
    return this.subNotes[index];
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
    if (newDue === "") {
      this._due = "Indefinite";
    } else {
      this._due = newDue;
    }
  }
}
