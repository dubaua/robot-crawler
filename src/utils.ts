import { Field, FreeCell, PaintedCell, WallCell } from "./field.type";
import { Robot } from "./robot";

export function createField(fieldWidth: number, fieldHeight: number, wallXPosition: number, gapYPosition: number): Field {
  const field: Field = [];
  for (let y = 0; y < fieldHeight; y++) {
    field[y] = [];
    for (let x = 0; x < fieldWidth; x++) {
      const isXBorder = x === 0 || x === fieldWidth - 1;
      const isYBorder = y === 0 || y === fieldHeight - 1;
      const isXWall = x === wallXPosition && y !== gapYPosition;

      const isWall = isXBorder || isYBorder || isXWall;
      field[y][x] = isWall ? WallCell : FreeCell;
    }
  }
  return field;
}

export function createFieldNodes(field: Field): void {
  const appNode = document.body.querySelector('#app');

  const fieldNode = document.createElement('div');
  fieldNode.classList.add('field');

  field.forEach((row) => {
    const rowNode = document.createElement('div');
    rowNode.classList.add('row');
    row.forEach((cell) => {
      const cellNode = document.createElement('div');
      cellNode.classList.add('cell');
      rowNode.appendChild(cellNode);
    });
    fieldNode.appendChild(rowNode);
  });

  if (appNode) {
    appNode.innerHTML = '';
    appNode.appendChild(fieldNode);
  }
}

export function renderField(field: Field, robot?: Robot): void {
  const fieldNode = document.querySelector('.field');
  const rowNodes = fieldNode!.querySelectorAll('.row');

  rowNodes.forEach((rowNode, y) => {
    const cellNodes = rowNode!.querySelectorAll('.cell');
    cellNodes.forEach((cellNode, x) => {
      const cell = field[y][x];

      if (cell === WallCell) {
        cellNode.classList.add('wall');
      } else if (cell === PaintedCell) {
        cellNode.classList.add('filled');
      } else {
        cellNode.classList.remove('filled');
      }

      if (robot) {
        const isInThisCell = robot.xPosition === x && robot.yPosition === y;
        if (isInThisCell) {
          cellNode.appendChild(robot.node);
          if (robot.isCrushed) {
            robot.node.classList.add('crushed');
          }
        }
      }
    });
  });
}
