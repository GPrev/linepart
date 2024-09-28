export enum Direction {
  UP = 0,
  LEFT = 1,
  DOWN = 2,
  RIGHT = 3,
  NB_DIRECTIONS = 4,
}

export class PuzzlePiece {
  edges: number[];
  rotation = 0;

  constructor(up: number, left: number, down: number, right: number) {
    this.edges = [up, left, down, right];
  }

  copy() {
    return new PuzzlePiece(this.up(), this.left(), this.down(), this.right());
  }

  getEdge(dir: Direction): number {
    return this.edges[(dir + this.rotation) % Direction.NB_DIRECTIONS];
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

  randomizeRotation() {
    this.rotation = Math.floor(Math.random() * Direction.NB_DIRECTIONS);
  }
}

export class PuzzleState {
  pieces: PuzzlePiece[][];

  constructor(pieces: PuzzlePiece[][] = []) {
    this.pieces = pieces;
  }

  copy() {
    return new PuzzleState(
      this.pieces.map((row) => row.map((piece) => piece.copy()))
    );
  }

  randomizeAllRotations() {
    this.pieces.forEach((row) =>
      row.forEach((piece) => piece.randomizeRotation())
    );
  }

  static makeSolved(width: number, height: number, nb_different_edges: number) {
    const vertical_edges = [...Array(height).keys()].map((_) =>
      [...Array(width + 1).keys()].map(
        (_) => 1 + Math.floor(Math.random() * nb_different_edges)
      )
    );
    const horizontal_edges = [...Array(height + 1).keys()].map((_) =>
      [...Array(width).keys()].map(
        (_) => 1 + Math.floor(Math.random() * nb_different_edges)
      )
    );

    const pieces = [...Array(height).keys()].map((row) =>
      [...Array(width + 1).keys()].map(
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
}
