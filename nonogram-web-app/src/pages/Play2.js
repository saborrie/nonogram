import React from "react";
import queryString from "query-string";
import { List } from "immutable";
import { Link } from "react-router-dom";
import createClue from "../game/createClue";

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
  PreviewSvg
} from "nonogram-components";

import range from "../utils/range";
import compareArray from "../utils/compareArray";

function movesReducer(state, action) {
  switch (action.type) {
    case "makeMove": {
      const previousValue = state.board.get(action.index);

      return {
        moves: state.moves.push({
          index: action.index,
          previousValue,
          nextValue: action.value
        }),
        board: state.board.set(action.index, action.value)
      };
    }

    case "undo": {
      if (state.moves.count() == 0) {
        return state;
      }

      const move = state.moves.last();

      return {
        moves: state.moves.pop(),
        board: state.board.set(move.index, move.previousValue)
      };
    }

    case "clear": {
      return {
        moves: List(),
        board: List(state.board.toJS().fill(0))
      };
    }

    default: {
      return state;
    }
  }
}

function getClueStates({ board, width, height, rowClues, columnClues }) {
  const columnClueStates = range(width).map(columnIndex => {
    const values = range(height).map(rowIndex => board.get(rowIndex * width + columnIndex) === 1);
    return compareArray(columnClues[columnIndex], createClue(values));
  });

  const rowClueStates = range(height).map(rowIndex => {
    const values = range(width).map(columnIndex => board.get(rowIndex * width + columnIndex) === 1);
    return compareArray(rowClues[rowIndex], createClue(values));
  });

  const isComplete = !columnClueStates.filter(s => s === false).length && !rowClueStates.filter(s => s === false).length;

  return { rowClueStates, columnClueStates, isComplete };
}

function useGame(config) {
  const { width, height, rowClues, columnClues } = config;

  const [{ board, moves }, dispatch] = React.useReducer(movesReducer, null, () => ({
    board: List(Array(width * height).fill(0)),
    moves: List()
  }));

  const clear = () => dispatch({ type: "clear" });
  const undo = () => dispatch({ type: "undo" });
  const makeMove = (index, value) => dispatch({ type: "makeMove", index, value });

  console.log("useGame", { board, moves, width, height, rowClues, columnClues });

  const { rowClueStates, columnClueStates, isComplete } = React.useMemo(() => {
    return getClueStates({ board, width, height, rowClues, columnClues });
  }, [board]);

  return {
    //state and config
    width,
    height,
    board,
    moves,
    rowClues,
    columnClues,
    rowClueStates,
    columnClueStates,
    isComplete,

    //actions
    clear,
    undo,
    makeMove
  };
}

function Play2(props) {
  const config = React.useMemo(() => {
    const query = queryString.parse(props.location.search);
    const config = JSON.parse(atob(query.game));
    return config;
  });

  const { width, height, board, rowClues, columnClues, rowClueStates, columnClueStates, isComplete, clear, undo, makeMove } = useGame(config);

  const [mode, setMode] = React.useState(1);

  return (
    <React.Fragment>
      <Announcement open={isComplete}>
        <AnnouncementTitle>Well done!</AnnouncementTitle>
        <AnnouncementAction>
          <Button onClick={clear}>Play again</Button>
        </AnnouncementAction>
        <AnnouncementAction>
          <Button component={Link} to="/">
            Design new game
          </Button>
        </AnnouncementAction>
      </Announcement>

      <Titlebar>
        <TitlebarLink component={Link} to="/">
          stupid squares
        </TitlebarLink>
      </Titlebar>
      <GameBoard>
        <GameBoardRow>
          <PreviewBox>
            <PreviewSvg width={width} height={height} pattern={board.toJS().map(v => v === 1)} />
          </PreviewBox>
          {range(width).map(columnIndex => (
            <Clue key={columnIndex} variant="column" completed={columnClueStates[columnIndex]}>
              {columnClues[columnIndex]}
            </Clue>
          ))}
        </GameBoardRow>
        {range(height).map(rowIndex => (
          <GameBoardRow key={rowIndex}>
            <Clue variant="row" completed={rowClueStates[rowIndex]}>
              {rowClues[rowIndex]}
            </Clue>
            {range(width).map(columnIndex => {
              const index = rowIndex * width + columnIndex;
              const value = board.get(index);

              return (
                <GameSquare
                  key={`${rowIndex}-${columnIndex}`}
                  filled={value === 1}
                  crossed={value === -1}
                  onClick={() => {
                    console.log(value);

                    if (value === 0) {
                      makeMove(index, mode);
                    } else if (value === mode) {
                      makeMove(index, 0);
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
          <Button onClick={clear}>Clear</Button>
        </ControlsBoxItem>
        <ControlsBoxItem>
          <Button onClick={undo}>Undo</Button>
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

export default Play2;
