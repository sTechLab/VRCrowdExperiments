/**
 * UserID and Condition Generator
 *
 * @flow
 * @format
 */

const COLORS = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'purple',
  'brown',
  'pink',
  'grey',
  'cyan',
  'white',
  'black',
  'navy',
];

const ANIMALS = [
  'cat',
  'dog',
  'bird',
  'horse',
  'lion',
  'snake',
  'bear',
  'wolf',
  'tiger',
  'deer',
  'goat',
  'otter',
  'duck',
  'goose',
  'shark',
  'owl',
  'sloth',
  'monkey',
  'rabbit',
  'spider',
  'chicken',
];

const DIGITS = '0123456789';

function cap(string: string): string {
  // capitalize first letter
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateUserID(): string {
  //  randomly generate a color + animal + number combination user ID
  let randColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  let randAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  let randDigit = DIGITS.charAt(Math.floor(Math.random() * DIGITS.length));

  let userID = cap(randColor) + cap(randAnimal) + randDigit;
  return userID;
}

export function generateCondition(N: number): number {
  // randomly generate a condition out of N conditions
  let random_condition: number = Math.floor(Math.random() * N);
  return random_condition;
}

// *************************************************
// helper functions for study 3, generate list of poses based on condition
type Pose = 'idle' | 'up';
export function mapToCnt(condition: string): number {
  switch (condition) {
    case 'Zero':
      return 0;
    case 'Low':
      return 2;
    case 'Medium':
      return 4;
    case 'High':
      return 8;
    default:
      return 0;
  }
}

export function generateUniqueIndex(N: number, n: number): Array<number> {
  let arr = [];
  while (arr.length < n) {
    let rand = Math.floor(Math.random() * N);
    if (arr.indexOf(rand) > -1) {
      continue;
    } else {
      arr[arr.length] = rand;
    }
  }
  return arr;
}

export function assignPoses(condition: string, N: number): Array<Pose> {
  let ups = generateUniqueIndex(N, mapToCnt(condition));
  let poses = [];
  for (let i = 0; i < N; i++) {
    if (ups.indexOf(i) > -1) {
      // poses.push('up');
      poses.push('idle'); //make every pose idle now
    } else {
      poses.push('idle');
    }
  }
  return poses;
}

/**
* Randomize array element order in-place.
* Using Durstenfeld shuffle algorithm.
*/
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function assignLocations(N: number): Array<number> {
  let arr = Array.from(new Array(N), (x, i) => i);
  return shuffleArray(arr);
}

const DIRECTIONS = ['front', 'left', 'right', 'back'];
export function assignOrientation(): string {
  let i = Math.floor(Math.random() * DIRECTIONS.length);
  return DIRECTIONS[i];
}

export function assignOrientationMap(
  N: number,
  condition: string,
): Array<string> {
  let orientations = [];
  let ups = generateUniqueIndex(N, mapToCnt(condition));
  for (let i = 0; i < N; i++) {
    if (ups.indexOf(i) > -1) {
      orientations.push('back'); //make every pose idle now
    } else {
      orientations.push('front');
    }
  }
  return orientations;
}

export function generateOrder(N: number): Array<number> {
  let arr = Array.from(new Array(N), (x, i) => i);
  return shuffleArray(arr);
}

export function splitValidator(value: string): boolean {
  if (value.length === 0) {
    return false;
  }
  let num = parseInt(value);
  if (num > 100) {
    return false;
  } else {
    return true;
  }
}
