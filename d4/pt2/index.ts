import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(
  testInput ? 'inputTest.txt' : 'input.txt',
  'utf8',
);
const data: string[] = rawData.split('\n');
const testNumbers =
  '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1';
const realNumbers =
  '49,48,98,84,71,59,37,36,6,21,46,30,5,33,3,62,63,45,43,35,65,77,57,75,19,44,4,76,88,92,12,27,7,51,14,72,96,9,0,17,83,64,38,95,54,20,1,74,69,80,81,56,10,68,42,15,99,53,93,94,47,13,29,34,60,41,82,90,25,85,78,91,32,70,58,28,61,24,55,87,39,11,79,50,22,8,89,26,16,2,73,23,18,66,52,31,86,97,67,40';
const numbersString = testInput ? testNumbers : realNumbers;
const drawnNumbers = numbersString.split(',');

type Board = {
  [row: number]: { [column: number]: { value: number; isChecked: boolean } };
  winState: { hasWon: boolean; drawNum: number; winStep: number };
};

const boardList: Board[] = [];
let board: Board = {
  winState: { hasWon: false, drawNum: 0, winStep: 0 },
};
let k = 0; // This keeps track of local board row...
for (let i = 0; i < data.length; i++) {
  const row = data[i].split(' ').filter((s) => s !== '');

  if (row.length === 0) {
    boardList.push(board);
    board = {
      winState: { hasWon: false, drawNum: 0, winStep: 0 },
    };
    k = 0;
    continue;
  }

  board[k] = {};
  for (let j = 0; j < row.length; j++) {
    board[k][j] = { value: +row[j], isChecked: false };
  }
  k++;
}

boardList.push(board);

const markBoard = (val: number, board: Board) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j].value === val) {
        board[i][j].isChecked = true;
      }
    }
  }
};

const checkWin = (board: Board) => {
  // check row win
  for (let i = 0; i < 5; i++) {
    const isFullRow = Object.values(board[i]).every((item) => item.isChecked);
    if (isFullRow) {
      return true;
    }
  }

  // check column win
  for (let j = 0; j < 5; j++) {
    let columnCount = 0;
    for (let i = 0; i < 5; i++) {
      if (board[i][j].isChecked) {
        columnCount++;
      }
    }
    if (columnCount === 5) {
      return true;
    }
  }

  return false;
};

const sumNums = (board: Board) => {
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (!board[i][j].isChecked) {
        sum += +board[i][j].value;
      }
    }
  }

  return sum;
};

let lastBoardToWin: Board = {} as any;
for (let d = 0; d < drawnNumbers.length; d++) {
  for (let i = 0; i < boardList.length; i++) {
    if (!boardList[i].winState.hasWon) {
      markBoard(+drawnNumbers[d], boardList[i]);
      if (checkWin(boardList[i])) {
        boardList[i].winState.hasWon = true;
        boardList[i].winState.drawNum = +drawnNumbers[d];
        boardList[i].winState.winStep = d;
        lastBoardToWin = boardList[i];
      }
    }
  }
}

console.log(sumNums(lastBoardToWin));
console.log(lastBoardToWin.winState.drawNum);
console.log(sumNums(lastBoardToWin) * +lastBoardToWin.winState.drawNum);
