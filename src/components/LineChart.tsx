import * as React from 'react';
import {Svg, Polyline, Line, Circle} from 'react-native-svg';
import {Point} from 'react-native-svg/lib/typescript/elements/Shape';

export interface LineChartProps {
  points: Point[];
  width: number;
  height: number;
}

const getExtremeValues = (points: Point[]) => {
  let extremeX = 0;
  let extremeY = 0;
  points.map(({x, y}) => {
    const absX = Math.abs(x);
    const absY = Math.abs(y);
    extremeX = extremeX < absX ? absX : extremeX;
    extremeY = extremeY < absY ? absY : extremeY;
  });
  return {extremeX, extremeY};
};

const pointsToSVGPattern = (
  points: Point[],
  startX: number,
  startY: number,
  scaleX: number,
  scaleY: number,
) => {
  let pointsStr = '';
  points.forEach(({x, y}) => {
    pointsStr += `${x * scaleX + startX},${y * scaleY + startY} `;
  });
  return pointsStr;
};

export const LineChart = ({
  points,
  width: screenWidth,
  height: screenHeight,
}: LineChartProps) => {
  const padding = 4;
  const startY = screenHeight / 2;
  const startX = screenWidth / 2;
  const {extremeX, extremeY} = getExtremeValues(points);
  const scaleX = -startX / extremeX + padding;
  const scaleY = -startY / extremeY + padding;
  const chartPointsSvg = pointsToSVGPattern(
    points,
    startX,
    startY,
    scaleX,
    scaleY,
  );
  return (
    <Svg height={screenHeight} width={screenWidth}>
      <Line
        x1={startX}
        y1={0}
        x2={startX}
        y2={screenHeight}
        stroke="blue"
        strokeWidth="3"
      />
      <Line
        x1={0}
        y1={startY}
        x2={screenWidth}
        y2={startY}
        stroke="blue"
        strokeWidth="3"
      />
      <Circle cx={startX} cy={startY} r={3} fill={'red'}></Circle>
      <Circle cx={startX - scaleX} cy={startY} r={3} fill={'red'}></Circle>
      <Circle cx={startX} cy={startY + scaleY} r={3} fill={'red'}></Circle>

      <Polyline
        points={chartPointsSvg}
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
    </Svg>
  );
};
