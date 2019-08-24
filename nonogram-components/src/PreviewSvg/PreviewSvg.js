import React from "react";
import PropTypes from "prop-types";

import { useTheme } from "@material-ui/core/styles";

function PreviewSvg(props) {
  const { width, height, pattern } = props;

  const theme = useTheme();

  const squareSize = (120 - 4) / Math.max(width, height);
  const fillColour = theme.palette.primary.main;

  return (
    <svg width={width * squareSize} height={height * squareSize}>
      {Array(height)
        .fill(0)
        .map((row, rowIndex) =>
          Array(width)
            .fill(0)
            .map((square, columnIndex) => {
              const x = columnIndex * squareSize;
              const w = (columnIndex + 1) * squareSize - x;

              const y = rowIndex * squareSize;
              const h = (rowIndex + 1) * squareSize - y;

              const fill = pattern[rowIndex * width + columnIndex];

              return (
                <rect
                  key={`${rowIndex}-${columnIndex}`}
                  width={w}
                  height={h}
                  x={x}
                  y={y}
                  style={{
                    stroke: fill ? fillColour : "transparent",
                    fill: fill ? fillColour : "transparent"
                  }}
                />
              );
            })
        )}
    </svg>
  );
}

PreviewSvg.propTypes = {
  /** The number of squares wide */
  width: PropTypes.number,
  /** The number of squares tall */
  height: PropTypes.number,
  /** The pattern of squares to show as filled */
  pattern: PropTypes.arrayOf(PropTypes.bool)
};

export default PreviewSvg;
