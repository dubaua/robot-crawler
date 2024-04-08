import { Field, PaintedCell, WallCell } from "./field.type";

export class Robot {
  public node: Element;
  public isCrushed = false;
  public isFinished = false;
  public isForwardDirection = false;
  public isReachedBackwardBorder = false;
  public isReachedForwardBorder = false;
  public isSearchingWaySide = false;

  constructor(public field: Field, public xPosition: number, public yPosition: number) {
    this.node = document.createElement('div');
    this.node.classList.add('robot');
  }

  public determineMainDirection(): void {
    if (!this.isTopCellFree) {
      this.isReachedBackwardBorder = true;
      this.isForwardDirection = true;
    }
    if (!this.isBottomCellFree) {
      this.isReachedForwardBorder = true;
      this.isForwardDirection = false;
    }

    if (this.isReachedBackwardBorder && this.isReachedForwardBorder) {
      this.determineSidewayDirection();
    }
  }

  public determineSidewayDirection(): void {
    if (!this.isSearchingWaySide) {
      this.isReachedBackwardBorder = false;
      this.isReachedForwardBorder = false;
      this.isSearchingWaySide = true;

      this.determineMainDirection();
    }
  }

  public resetDirection(): void {
    this.isSearchingWaySide = false;
    this.isForwardDirection = false;
    this.isReachedBackwardBorder = false;
    this.isReachedForwardBorder = false;
  }

  public move(): void {
    if (this.isSearchingWaySide && this.isReachedForwardBorder && this.isReachedBackwardBorder && !this.isRightCellFree) {
      console.log('Stuck or finished');
      this.isFinished = true;
      return;
    }

    if (this.isSearchingWaySide && this.isRightCellFree) {
      this.moveRight();
    } else {
      if (this.isBottomCellFree && this.isForwardDirection) {
        this.moveBottom();
      } else if (this.isTopCellFree && !this.isForwardDirection) {
        this.moveTop();
      }
    }
  }

  public next(): void {
    if (!this.isFinished) {
      if (!this.isSearchingWaySide) {
        this.paintCell();
      }
      this.determineMainDirection();
      this.move();
    }
  }

  public paintCell(): void {
    this.field[this.yPosition][this.xPosition] = PaintedCell;
  }

  public moveLeft() {
    this.xPosition--;
    this.resetDirection();
  }

  public moveRight() {
    this.xPosition++;
    this.resetDirection();
  }

  public moveTop() {
    this.yPosition--;
  }

  public moveBottom() {
    this.yPosition++;
  }

  public get leftCell() {
    return this.field[this.yPosition][this.xPosition - 1];
  }

  public get rightCell() {
    return this.field[this.yPosition][this.xPosition + 1];
  }

  public get topCell() {
    return this.field[this.yPosition - 1][this.xPosition];
  }

  public get bottomCell() {
    return this.field[this.yPosition + 1][this.xPosition];
  }

  public get isLeftCellFree() {
    return this.leftCell !== WallCell;
  }

  public get isRightCellFree() {
    return this.rightCell !== WallCell;
  }

  public get isTopCellFree() {
    return this.topCell !== WallCell;
  }

  public get isBottomCellFree() {
    return this.bottomCell !== WallCell;
  }

  public checkIfCrushed(): void {
    if (this.field[this.yPosition][this.xPosition] === WallCell) {
      this.isCrushed = true;
    }
  }
}
