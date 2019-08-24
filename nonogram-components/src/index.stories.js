import React from "react";
import { storiesOf } from "@storybook/react";
import makestyles from "@material-ui/styles/makeStyles";

import AppWrapper from "./AppWrapper";
import Titlebar from "./Titlebar";
import TitlebarLink from "./TitlebarLink";
import GameBoard from "./GameBoard";
import GameBoardRow from "./GameBoardRow";
import GameSquare from "./GameSquare";
import Clue from "./Clue";
import ControlsBox from "./ControlsBox";
import PreviewBox from "./PreviewBox";
import PreviewSvg from "./PreviewSvg";
import Button from "./Button";

import Announcement from "./Announcement";
import AnnouncementTitle from "./AnnouncementTitle";
import AnnouncementAction from "./AnnouncementAction";

const useStyles = makestyles(theme => ({
  buttonArea: {
    outline: "1px solid red",
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

function GameStory(props) {
  const { complete } = props;
  const classes = useStyles();

  return (
    <AppWrapper>
      <Announcement open={complete}>
        <AnnouncementTitle>Well Done!</AnnouncementTitle>
        <AnnouncementAction>
          <Button>Play again</Button>
        </AnnouncementAction>
        <AnnouncementAction>
          <Button>Design new game</Button>
        </AnnouncementAction>
      </Announcement>
      <Titlebar>
        <TitlebarLink onClick={() => alert("button clicked")}>
          stupid squares
        </TitlebarLink>
      </Titlebar>
      <GameBoard>
        <GameBoardRow>
          <PreviewBox>
            <PreviewSvg
              width={15}
              height={15}
              pattern={Array(15 * 15)
                .fill(false)
                .map((o, i) => i % 2 == 0)}
            />
          </PreviewBox>
          {Array(15)
            .fill(0)
            .map((o, i) => (
              <Clue variant="column" completed={i == 12}>
                1
              </Clue>
            ))}
        </GameBoardRow>
        {Array(15).fill(
          <GameBoardRow>
            <Clue variant="row">1</Clue>
            {Array(15)
              .fill(0)
              .map((o, i) => (
                <GameSquare filled={i == 12} crossed={i == 2} />
              ))}
          </GameBoardRow>
        )}
      </GameBoard>

      <ControlsBox>
        <Button>hello</Button>
      </ControlsBox>
    </AppWrapper>
  );
}

storiesOf("Pages|Game", module)
  .add("Default", () => <GameStory />)
  .add("Complete", () => <GameStory complete />);
