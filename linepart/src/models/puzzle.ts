export enum Direction {
  UP = 0,
  LEFT = 1,
  DOWN = 2,
  RIGHT = 3,
  NB_DIRECTIONS = 4,
}

export const directions = [
  Direction.UP,
  Direction.LEFT,
  Direction.DOWN,
  Direction.RIGHT,
];

export class PuzzlePiece {
  edges: number[];
  rotation = 0;

  constructor(up: number, left: number, down: number, right: number) {
    this.edges = [up, left, down, right];
  }

  copy() {
    return new PuzzlePiece(this.up(), this.left(), this.down(), this.right());
  }

  getEdge(dir: Direction, rotation = true): number {
    return this.edges[
      (dir + (rotation ? this.rotation : 0)) % Direction.NB_DIRECTIONS
    ];
  }
  up(): number {
    return this.getEdge(Direction.UP);
  }
  right(): number {
    return this.getEdge(Direction.RIGHT);
  }
  down(): number {
    return this.getEdge(Direction.DOWN);
  }
  left(): number {
    return this.getEdge(Direction.LEFT);
  }

  myup(): number {
    return this.getEdge(Direction.UP, false);
  }
  myright(): number {
    return this.getEdge(Direction.RIGHT, false);
  }
  mydown(): number {
    return this.getEdge(Direction.DOWN, false);
  }
  myleft(): number {
    return this.getEdge(Direction.LEFT, false);
  }

  setRotation(rotation: number) {
    this.rotation = rotation % Direction.NB_DIRECTIONS;
  }
  addRotation() {
    this.setRotation(this.rotation + 1);
  }
  randomizeRotation() {
    this.rotation = Math.floor(Math.random() * Direction.NB_DIRECTIONS);
  }
}

export class PuzzleState {
  pieces: PuzzlePiece[][];

  constructor(pieces: PuzzlePiece[][] = []) {
    this.pieces = pieces;
  }

  height() {
    return this.pieces.length;
  }

  width() {
    return this.pieces.length == 0 ? 0 : this.pieces[0].length;
  }

  copy() {
    return new PuzzleState(
      this.pieces.map((row) => row.map((piece) => piece.copy()))
    );
  }

  *allPieces() {
    for (const row of this.pieces) yield* row;
  }

  isSolved() {
    if (!this) return false;
    for (const row of Array(this.height).keys()) {
      for (const col of Array(this.width).keys()) {
        if (
          row + 1 < this.height() &&
          this.pieces[row][col].down() != this.pieces[row + 1][col].up()
        )
          return false;
        if (
          col + 1 < this.width() &&
          this.pieces[row][col].right() != this.pieces[row][col + 1].left()
        )
          return false;
      }
    }
    return true;
  }

  randomizeAllRotations() {
    this.pieces.forEach((row) =>
      row.forEach((piece) => piece.randomizeRotation())
    );
  }

  static makeSolved(width: number, height: number, nb_different_edges: number) {
    const vertical_edges = [...Array(height).keys()].map(() =>
      [...Array(width + 1).keys()].map(
        () => 1 + Math.floor(Math.random() * nb_different_edges)
      )
    );
    const horizontal_edges = [...Array(height + 1).keys()].map(() =>
      [...Array(width).keys()].map(
        () => 1 + Math.floor(Math.random() * nb_different_edges)
      )
    );

    const pieces = [...Array(height).keys()].map((row) =>
      [...Array(width).keys()].map(
        (col) =>
          new PuzzlePiece(
            horizontal_edges[row][col],
            vertical_edges[row][col],
            horizontal_edges[row + 1][col],
            vertical_edges[row][col + 1]
          )
      )
    );
    return new PuzzleState(pieces);
  }
}

export class Puzzle {
  solution: PuzzleState;

  constructor(solution: PuzzleState) {
    this.solution = solution;
  }
}

export class RotationPuzzle extends Puzzle {
  constructor(solution: PuzzleState) {
    super(solution);
  }

  makeRandomStartingState() {
    const res = this.solution.copy();
    res.randomizeAllRotations();
    return res;
  }

  static makeRandom(width: number, height: number, nb_different_edges: number) {
    return new RotationPuzzle(
      PuzzleState.makeSolved(width, height, nb_different_edges)
    );
  }
}
