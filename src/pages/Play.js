import React from "react";
import { List } from "immutable";
import queryString from "query-string";
import { Link } from "react-router-dom";

import createClue from "../game/createClue";
import range from "../utils/range";

import {
  Announcement,
  AnnouncementTitle,
  AnnouncementAction,
  Button,
  Titlebar,
  TitlebarLink,
  GameBoard,
  GameBoardRow,
  GameSquare,
  Clue,
  ControlsBox,
  ControlsBoxItem,
  PreviewBox,
  PreviewSvg,
} from "../components";

const width = 15;
const height = 15;

let tf;

function movesReducer(state, action) {
  console.log("move action made", { state, action });

  switch (action.type) {
    case "makeMove": {
      const previousValue = state.board.get(action.index);

      return {
        moves: state.moves.push({
          index: action.index,
          previousValue,
          nextValue: action.value,
        }),
        board: state.board.set(action.index, action.value),
      };
    }

    case "undo": {
      if (state.moves.count() == 0) {
        return state;
      }

      const move = state.moves.last();

      return {
        moves: state.moves.pop(),
        board: state.board.set(move.index, move.previousValue),
      };
    }

    case "clear": {
      return {
        moves: List(),
        board: List(state.board.toJS().fill(0)),
      };
    }

    default: {
      return state;
    }
  }
}

function Play(props) {
  const t1 = performance.now();

  const [solution, setSolution] = React.useState(List(Array(width * height).fill(false)));

  // const [filled, setFilled] = React.useState(
  //   List(Array(width * height).fill(0))
  // );

  const [moveState, dispatchMoveAction] = React.useReducer(movesReducer, {
    moves: List(),
    board: List(Array(width * height).fill(0)),
  });

  const [mode, setMode] = React.useState(1);

  React.useEffect(() => {
    const query = queryString.parse(props.location.search);
    const filledValues = atob(query.game);
    setSolution(List(filledValues.split("").map((v) => parseInt(v))));
  }, [props.location.search]);

  const currentValues = moveState.board.toJS();

  // const oldCurrentValues = Array(width * height)
  //   .fill(0)
  //   .map((_, index) =>
  //     moves
  //       .reverse()
  //       .filter(m => m.index === index)
  //       .map(m => m.value)
  //       .first(0)
  //   );

  // const t3 = performance.now();

  // const x1 = performance.now();

  // const currentValues = Array(width * height).fill(0);

  // console.log("len", moves.count());

  // const totalMoves = moves.count();

  // for (let i = 0; i < totalMoves; i++) {
  //   const move = moves.get(i);

  //   console.log(move);

  //   currentValues[move.index] = move.value;
  // }

  // const x2 = performance.now();
  // console.log(oldCurrentValues, currentValues);

  // console.log(t3 - t2, x2 - x1);

  const columnClues = range(width).map((columnIndex) => {
    const columnValueIndices = range(height).map((rowIndex) => rowIndex * width + columnIndex);

    const clue = createClue(columnValueIndices.map((i) => solution.get(i)));
    const currentValuesClue = createClue(columnValueIndices.map((i) => currentValues[i] === 1));
    const complete = clue.join(";") === currentValuesClue.join(";");

    return { clue, complete };
  });

  const rowClues = range(height).map((rowIndex) => {
    const rowValueIndices = range(width).map((columnIndex) => rowIndex * width + columnIndex);

    const clue = createClue(rowValueIndices.map((i) => solution.get(i)));
    const currentValuesClue = createClue(rowValueIndices.map((i) => currentValues[i] === 1));
    const complete = clue.join(";") === currentValuesClue.join(";");

    return { clue, complete };
  });

  return (
    <React.Fragment>
      <Announcement>
        <AnnouncementTitle>Well done!</AnnouncementTitle>
        <AnnouncementAction>
          <Button onClick={() => dispatchMoveAction({ type: "clear" })}>Play again</Button>
        </AnnouncementAction>
        <AnnouncementAction>
          <Button component={Link} to="/">
            Design new game
          </Button>
        </AnnouncementAction>
      </Announcement>

      <Titlebar>
        <TitlebarLink component={Link} to="/">
          nonogram
        </TitlebarLink>
      </Titlebar>
      <GameBoard>
        <GameBoardRow>
          <PreviewBox>
            <PreviewSvg width={width} height={height} pattern={currentValues.map((v) => v === 1)} />
          </PreviewBox>
          {range(width).map((columnIndex) => (
            <Clue key={columnIndex} variant="column" completed={columnClues[columnIndex].complete}>
              {columnClues[columnIndex].clue}
            </Clue>
          ))}
        </GameBoardRow>
        {range(height).map((rowIndex) => (
          <GameBoardRow key={rowIndex}>
            <Clue variant="row" completed={rowClues[rowIndex].complete}>
              {rowClues[rowIndex].clue}
            </Clue>
            {range(width).map((columnIndex) => {
              const index = rowIndex * width + columnIndex;
              const value = currentValues[index];

              return (
                <GameSquare
                  key={`${rowIndex}-${columnIndex}`}
                  filled={value === 1}
                  crossed={value === -1}
                  onClick={() => {
                    console.log(value);

                    if (value === 0) {
                      dispatchMoveAction({
                        type: "makeMove",
                        index,
                        value: mode,
                      });
                    } else if (value === mode) {
                      dispatchMoveAction({
                        type: "makeMove",
                        index,
                        value: 0,
                      });
                    }
                  }}
                />
              );
            })}
          </GameBoardRow>
        ))}
      </GameBoard>
      <ControlsBox>
        <ControlsBoxItem>
          <Button onClick={() => dispatchMoveAction({ type: "clear" })}>Clear</Button>
        </ControlsBoxItem>
        <ControlsBoxItem>
          <Button onClick={() => dispatchMoveAction({ type: "undo" })}>Undo</Button>
        </ControlsBoxItem>
        <ControlsBoxItem>
          <Button onClick={() => setMode(1)} primary={mode === 1}>
            Fill
          </Button>
        </ControlsBoxItem>

        <ControlsBoxItem>
          <Button onClick={() => setMode(-1)} primary={mode === -1}>
            Cross
          </Button>
        </ControlsBoxItem>
      </ControlsBox>
    </React.Fragment>
  );
}

export default Play;
