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
]

export class PuzzlePiece {
  edges: number[]
  rotation: number

  constructor(up = 0, left = 0, down = 0, right = 0, rotation = 0) {
    this.edges = [up, left, down, right]
    this.rotation = rotation
  }

  copy(): PuzzlePiece {
    return new PuzzlePiece(...this.edges, this.rotation)
  }

  getEdge(dir: Direction, rotation = true): number {
    return this.edges[
      (dir + (rotation ? this.rotation : 0)) % Direction.NB_DIRECTIONS
    ]
  }
  up(): number {
    return this.getEdge(Direction.UP)
  }
  right(): number {
    return this.getEdge(Direction.RIGHT)
  }
  down(): number {
    return this.getEdge(Direction.DOWN)
  }
  left(): number {
    return this.getEdge(Direction.LEFT)
  }

  myup(): number {
    return this.getEdge(Direction.UP, false)
  }
  myright(): number {
    return this.getEdge(Direction.RIGHT, false)
  }
  mydown(): number {
    return this.getEdge(Direction.DOWN, false)
  }
  myleft(): number {
    return this.getEdge(Direction.LEFT, false)
  }

  setRotation(rotation: number) {
    this.rotation = rotation % Direction.NB_DIRECTIONS
  }
  addRotation() {
    this.setRotation(this.rotation + 1)
  }
  randomizeRotation() {
    this.rotation = Math.floor(Math.random() * Direction.NB_DIRECTIONS)
  }
}

export class PuzzleState {
  pieces: PuzzlePiece[][]

  constructor(pieces: PuzzlePiece[][] = []) {
    this.pieces = pieces
  }

  height() {
    return this.pieces.length
  }

  width() {
    return this.pieces.length == 0 ? 0 : this.pieces[0].length
  }

  copy() {
    return new PuzzleState(
      this.pieces.map(row => row.map(piece => piece.copy())),
    )
  }

  *allPieces() {
    for (const row of this.pieces) yield* row
  }

  getEdgeMatch(edgeValue: number) {
    return edgeValue
  }

  isSolved() {
    if (!this) return false
    for (const row of Array(this.height()).keys()) {
      for (const col of Array(this.width()).keys()) {
        if (
          row + 1 < this.height() &&
          this.pieces[row][col].down() !=
            this.getEdgeMatch(this.pieces[row + 1][col].up())
        )
          return false
        if (
          col + 1 < this.width() &&
          this.pieces[row][col].right() !=
            this.getEdgeMatch(this.pieces[row][col + 1].left())
        )
          return false
      }
    }
    return true
  }

  randomizeAllRotations() {
    this.pieces.forEach(row => row.forEach(piece => piece.randomizeRotation()))
  }

  static makeSolved(
    width: number,
    height: number,
    nb_different_edges: number,
  ): PuzzleState {
    return new PuzzleState(
      PuzzleState.makeSolvedPieces(width, height, nb_different_edges),
    )
  }

  static makeSolvedPieces(
    width: number,
    height: number,
    nb_different_edges: number,
  ) {
    const vertical_edges = [...Array(height).keys()].map(() =>
      [...Array(width + 1).keys()].map(() =>
        Math.floor(Math.random() * nb_different_edges),
      ),
    )
    const horizontal_edges = [...Array(height + 1).keys()].map(() =>
      [...Array(width).keys()].map(() =>
        Math.floor(Math.random() * nb_different_edges),
      ),
    )

    const pieces = [...Array(height).keys()].map(row =>
      [...Array(width).keys()].map(
        col =>
          new PuzzlePiece(
            horizontal_edges[row][col],
            vertical_edges[row][col],
            horizontal_edges[row + 1][col],
            vertical_edges[row][col + 1],
          ),
      ),
    )
    return pieces
  }
}

export class RotationPuzzleState extends PuzzleState {
  nb_different_edges: number

  static edge_matching_cache: number[][] = []

  constructor(
    pieces: PuzzlePiece[][] = [],
    nb_different_edges: number,
    old_format = false,
  ) {
    super(
      old_format
        ? pieces.map(row =>
            row.map(p =>
              RotationPuzzleState.fromOldFormat(p, nb_different_edges),
            ),
          )
        : pieces,
    )
    this.nb_different_edges = nb_different_edges
  }

  copy() {
    return new RotationPuzzleState(
      this.pieces.map(row => row.map(piece => piece.copy())),
      this.nb_different_edges,
    )
  }

  getEdgeMatch(edgeValue: number) {
    return RotationPuzzleState.getEdgeMatch(edgeValue, this.nb_different_edges)
  }

  static getEdgeMatch(edgeValue: number, nb_different_edges: number) {
    if (
      RotationPuzzleState.edge_matching_cache[nb_different_edges] == undefined
    ) {
      RotationPuzzleState.edge_matching_cache[nb_different_edges] = Array.from(
        { length: nb_different_edges },
        (_, i) =>
          RotationPuzzleState.caluculateEdgeMatch(i, nb_different_edges),
      )
    }

    return RotationPuzzleState.edge_matching_cache[nb_different_edges][
      edgeValue
    ]
  }

  static caluculateEdgeMatch(edgeValue: number, nb_different_edges: number) {
    // Here, we want to reverse the bit order of the value, for example 0101 -> 1010
    // We start by converting the number to a binary representation
    const bitString = edgeValue.toString(2)
    const nbBits = Math.max(
      bitString.length,
      (nb_different_edges - 1).toString(2).length,
    )
    // For each bit, add it to the result, shifted as needed to obtain the desired result
    let matchValue = 0
    for (const [index, bit] of bitString.split('').reverse().entries()) {
      matchValue += (bit == '1' ? 1 : 0) << (nbBits - index - 1)
    }
    return matchValue
  }

  static fromOldFormat(
    piece: PuzzlePiece,
    nb_different_edges: number,
    in_place = true,
  ): PuzzlePiece {
    if (!in_place) {
      piece = piece.copy()
    }
    piece.edges[Direction.UP] = RotationPuzzleState.getEdgeMatch(
      piece.edges[Direction.UP],
      nb_different_edges,
    )
    piece.edges[Direction.RIGHT] = RotationPuzzleState.getEdgeMatch(
      piece.edges[Direction.RIGHT],
      nb_different_edges,
    )
    return piece
  }

  static makeSolved(
    width: number,
    height: number,
    nb_different_edges: number,
  ): RotationPuzzleState {
    return new RotationPuzzleState(
      PuzzleState.makeSolvedPieces(
        width,
        height,
        nb_different_edges,
      ) as PuzzlePiece[][],
      nb_different_edges,
      true,
    )
  }
}

export class Puzzle {
  solution: PuzzleState

  constructor(solution: PuzzleState) {
    this.solution = solution
  }
}

export class RotationPuzzle extends Puzzle {
  constructor(solution: RotationPuzzleState) {
    super(solution)
  }

  makeRandomStartingState() {
    const res = this.solution.copy()
    res.randomizeAllRotations()
    return res
  }

  static makeRandom(width: number, height: number, nb_different_edges: number) {
    return new RotationPuzzle(
      RotationPuzzleState.makeSolved(width, height, nb_different_edges),
    )
  }
}
