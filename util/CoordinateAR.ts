enum Direction {
  N = 'N',
  S = 'S',
  W = 'W',
  E = 'E',
}

//config
interface ValidateOptions {
  min: number;
  max: number;
}

const longitude: ValidateOptions = {min: -180, max: 180};
const latitude: ValidateOptions = {min: -90, max: 90};
const minuteOptions: ValidateOptions = {min: 0, max: 59};
const secondOptions: ValidateOptions = {min: 0, max: 59};

const directionOptions = {
  [Direction.N]: latitude,
  [Direction.S]: latitude,
  [Direction.W]: longitude,
  [Direction.E]: longitude,
};

const validate = (options: ValidateOptions, values: number) => {
  const {min, max} = options;
  return values >= min && values <= max ? true : false;
};

const average = (a: number, b: number) => (a + b) / 2;

export class CoordinateAR {
  private constructor(
    private degree: number,
    private minute: number,
    private second: number,
    private direction: Direction,
  ) {}

  static create(
    degree: number = 0,
    minute: number = 0,
    second: number = 0,
    direction: Direction = Direction.N,
  ) {
    if (!validate(directionOptions[direction], degree)) {
      throw new Error('Degree is not valid');
    }
    if (!validate(minuteOptions, minute)) {
      throw new Error('Minute is not valid');
    }
    if (!validate(secondOptions, second)) {
      throw new Error('Second is not valid');
    }
    return new CoordinateAR(degree, minute, second, direction);
  }

  toString() {
    const {degree, minute, second, direction} = this;
    return `${degree}°${minute}′${second}″ ${direction}`;
  }

  toHexString() {
    const {degree, minute, second, direction} = this;
    const sec = second / 3600;
    const min = minute / 60;
    const hexCoordinate = degree + min + sec;
    return `${hexCoordinate}° ${direction}`;
  }

  average(coordinate: CoordinateAR) {
    if (this.direction !== coordinate.direction) {
      return null;
    }
    const degree = average(this.degree, coordinate.degree);
    const minute = average(this.minute, coordinate.minute);
    const second = average(this.second, coordinate.second);
    return new CoordinateAR(degree, minute, second, coordinate.direction);
  }

  static averageFrom(coordinate1: CoordinateAR, coordinate2: CoordinateAR) {
    if (coordinate1.direction !== coordinate2.direction) {
      return null;
    }
    const degree = average(coordinate1.degree, coordinate2.degree);
    const minute = average(coordinate1.minute, coordinate2.minute);
    const second = average(coordinate1.second, coordinate2.second);
    return new CoordinateAR(degree, minute, second, coordinate1.direction);
  }
}

//Test
const coordinate1 = CoordinateAR.create();
console.dir(coordinate1);
const coordinate2 = CoordinateAR.create(68, 24, 56, Direction.N);
console.dir(coordinate2);

console.dir(coordinate2.toString());
console.dir(coordinate2.toHexString());
console.dir(coordinate2.average(coordinate1));
console.dir(CoordinateAR.averageFrom(coordinate1, coordinate2));
