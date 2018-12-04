import { NUM_ROWS, NUM_COLS } from '../constants.js';
import { getRandomInt } from '../utils/math-utils.js';
import ReactionTimerGridView from './ReactionTimerGridView.js';

class ReactionTimerGame {
  constructor() {
    this.view = null;
    this.activeCells = [];
    this.currentStartTime = null;
    this.currentEndTime = null;
    this.calculateOrder = 0;
  }

  handleRoundStart() {
    this.calculateOrder = 0;
    const delay = getRandomInt(500, 3000);
    setTimeout(this.startCycle.bind(this), delay);
  }

  startCycle() {
    this.currentStartTime = new Date().getTime(); // milliseconds
    for (let i = 0; i < 2; i += 1) {
      if (this.activeCells.length > 0) {
        const activeCell = this.activeCells.pop();
        this.view.deactivateCell(activeCell[0], activeCell[1]);
      }
    }
    for (let j = 0; j < 2; j += 1) {
      this.triggerRandomCell();
    }
  }

  triggerRandomCell() {
    const randomRowIndex = getRandomInt(0, NUM_ROWS);
    const randomColIndex = getRandomInt(0, NUM_COLS);
    this.activeCells.push([randomRowIndex, randomColIndex]);
    this.view.activateCell(randomRowIndex, randomColIndex);
  }

  handleActiveCellSelected(activeCell) {
    this.view.deactivateCell(activeCell[0], activeCell[1]);
    this.calculateTime();
  }

  calculateTime() {
    this.currentEndTime = new Date().getTime();
    if (this.calculateOrder === 0) {
      console.log(`1st reaction ${this.currentEndTime - this.currentStartTime}`);
      this.calculateOrder += 1;
    } else {
      console.log(`2nd reaction ${this.currentEndTime - this.currentStartTime}\n---`);
    }
  }

  //handleRoundStartCallback() {
  //  this.calculateOrder = 0;
  //  this.view.registerRoundStartCallback(this.handleRoundStart.bind(this));
  //}

  init() {
    this.view = new ReactionTimerGridView();

    this.view.registerActiveCellSelectedCallback(this.handleActiveCellSelected.bind(this));
    this.view.registerRoundStartCallback(this.handleRoundStart.bind(this));

    this.view.initDomAndListeners();
    this.view.drawGrid();
  }
}

export default ReactionTimerGame;
