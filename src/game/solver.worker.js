import generate from "./generate";
import convert from "./convert";

self.addEventListener("message", solver); // eslint-disable-line no-restricted-globals

function solver(event) {
  const { version, width, height, columnClues, rowClues } = event.data;

  const workingBoard = Array(width * height).fill(0);

  let tookAction = false;

  do {
    tookAction = false;

    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
      const rowValues = workingBoard.slice(rowIndex * width, rowIndex * width + width);
      const rowClue = rowClues[rowIndex];
      const actionsToTake = getActionsForLine(width, rowValues, rowClue);

      if (actionsToTake.length > 0) {
        tookAction = true;
      }

      actionsToTake.forEach(action => {
        workingBoard[rowIndex * width + action.index] = action.type;
      });
    }

    for (let columnIndex = 0; columnIndex < width; columnIndex++) {
      const columnValues = [];

      for (let rowIndex = 0; rowIndex < height; rowIndex++) {
        columnValues.push(workingBoard[rowIndex * width + columnIndex]);
      }

      const columnClue = columnClues[columnIndex];
      const actionsToTake = getActionsForLine(width, columnValues, columnClue);

      if (actionsToTake.length > 0) {
        tookAction = true;
      }

      actionsToTake.forEach(action => {
        workingBoard[action.index * width + columnIndex] = action.type;
      });
    }
  } while (tookAction);

  if (workingBoard.filter(v => v === 0).length > 0) {
    this.postMessage({ version, solvable: false, solution: workingBoard });
  } else {
    this.postMessage({ version, solvable: true, solution: workingBoard });
  }
}

function getActionsForLine(dimension, currentValues, clue) {
  // calculate all the possible combos and map them to arrays of true/false
  const allPossibleCombos = generate(dimension, clue).map(combo => convert(dimension, combo, clue));

  // filter out ones that do not match our current row values
  const onlyMatchingCombos = allPossibleCombos.filter(comboValues => {
    for (let i = 0; i < dimension; i++) {
      if (currentValues[i] == 1 && !comboValues[i]) {
        return false;
      }
      if (currentValues[i] == -1 && comboValues[i]) {
        return false;
      }
    }

    return true;
  });

  // now we find positions which do not vary by summing up all the positions;
  const resultsArray = onlyMatchingCombos.reduce((totals, combo) => {
    for (let i = 0; i < dimension; i++) {
      totals[i] += combo[i] ? 1 : 0;
    }

    return totals;
  }, Array(dimension).fill(0));

  const actionsToTake = [];

  // loop through the results array and find ones which are either always crossed or always filled:
  for (let i = 0; i < resultsArray.length; i++) {
    if (resultsArray[i] == 0 && currentValues[i] == 0) {
      actionsToTake.push({ index: i, type: -1 });
    } else if (resultsArray[i] == onlyMatchingCombos.length && currentValues[i] == 0) {
      actionsToTake.push({ index: i, type: 1 });
    }
  }

  return actionsToTake;
}
