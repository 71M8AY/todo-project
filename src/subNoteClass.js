export class SubNote {
  constructor(goal, state = false) {
    this.goal = goal;
    this.state = state;
  }

  renameGoal(newGoal) {
    this.goal = newGoal;
  }

  changeState(newState) {
    this.state = newState;
  }
}
