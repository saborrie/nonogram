import React from "react";
import { List } from "immutable";
import { Link } from "react-router-dom";
import { Button, Titlebar, TitlebarLink, GameBoard, GameBoardRow, GameSquare, Clue, ControlsBox, ControlsBoxItem, PreviewBox, PreviewSvg } from "nonogram-components";

import createClue from "../game/createClue";
import SolverWorker from "../game/solver.worker";
import range from "../utils/range";

const width = 15;
const height = 15;

function Design() {
  const [filled, setFilled] = React.useState(List(Array(width * height).fill(false)));

  const [solverWorker, setSolverWorker] = React.useState(null);
  const [solvable, setSolvable] = React.useState(true);
  const [solution, setSolution] = React.useState(Array(width * height));

  React.useEffect(() => {
    let worker = new SolverWorker();
    worker.addEventListener("message", event => {
      setSolvable(event.data.solvable);
      setSolution(event.data.solution);
    });
    setSolverWorker(worker);
  }, []);

  const columnClues = range(width).map(columnIndex => createClue(range(height).map(rowIndex => filled.get(rowIndex * width + columnIndex))));
  const rowClues = range(height).map(rowIndex => createClue(range(width).map(columnIndex => filled.get(rowIndex * width + columnIndex))));

  React.useEffect(() => {
    if (!solverWorker) {
      return;
    }

    solverWorker.postMessage({
      width,
      height,
      columnClues,
      rowClues
    });
  }, [solverWorker, filled.join("")]);

  return (
    <React.Fragment>
      <Titlebar>
        <TitlebarLink>stupid squares</TitlebarLink>
      </Titlebar>
      <GameBoard>
        <GameBoardRow>
          <PreviewBox>
            <PreviewSvg width={width} height={height} pattern={filled.toJS()} />
          </PreviewBox>
          {range(width).map(columnIndex => (
            <Clue key={columnIndex} variant="column">
              {columnClues[columnIndex]}
            </Clue>
          ))}
        </GameBoardRow>
        {range(height).map(rowIndex => (
          <GameBoardRow key={rowIndex}>
            <Clue variant="row">{rowClues[rowIndex]}</Clue>
            {range(width).map(columnIndex => {
              const index = rowIndex * width + columnIndex;
              const value = filled.get(index);
              const warning = solution[index] === 0;

              return (
                <GameSquare
                  key={`${rowIndex}-${columnIndex}`}
                  filled={value}
                  warning={warning}
                  onClick={() => {
                    setFilled(filled.set(index, !value));
                  }}
                />
              );
            })}
          </GameBoardRow>
        ))}
      </GameBoard>

      <ControlsBox>
        <ControlsBoxItem>
          <Button onClick={() => setFilled(List(Array(width * height).fill(false)))}>Clear</Button>
        </ControlsBoxItem>
        <ControlsBoxItem>
          <Button
            disabled={!solvable}
            component={Link}
            to={`/play?game=${btoa(
              filled
                .toJS()
                .map(a => (a ? 1 : 0))
                .join("")
            )}`}
            target="_blank"
          >
            Play
          </Button>
        </ControlsBoxItem>

        <ControlsBoxItem>
          <Button
            disabled={!solvable}
            component={Link}
            to={`/play2?game=${btoa(
              JSON.stringify({
                width,
                height,
                columnClues,
                rowClues
              })
            )}`}
            target="_blank"
          >
            Play V2
          </Button>
        </ControlsBoxItem>
      </ControlsBox>
      <ControlsBox>{!solvable && <p>Fix the ambiguous squares!</p>}</ControlsBox>
    </React.Fragment>
  );
}

export default Design;
