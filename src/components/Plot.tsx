import * as React from 'react';
import {LineChart} from './LineChart';

interface Point {
  x: number;
  y: number;
}

const getPoints = (
  func: (x: number) => number,
  min: number,
  max: number,
  interval: number = 0.1,
): Point[] => {
  const points = [];
  for (let x = min; x <= max; x += interval) {
    const y = func(x);
    points.push({x, y});
  }
  return points;
};

interface PlotProps {
  func: (x: number) => number;
  min: number;
  max: number;
  interval: number;
  width: number;
  height: number;
}

export const Plot = ({func, min, max, width, height, interval}: PlotProps) => {
  const points = getPoints(func, min, max, interval);
  return (
    <>
      <LineChart points={points} width={width} height={height} />
    </>
  );
};
