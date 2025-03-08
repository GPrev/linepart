import { describe, expect, it } from 'vitest'
import {
  Direction,
  PuzzlePiece,
  PuzzleState,
  RotationPuzzleState,
  RotationPuzzle,
} from '@/models/puzzle'

const nb_different_edges = 8

describe('PuzzlePiece', () => {
  it('should rotate', () => {
    const piece = new PuzzlePiece(1, 2, 3, 4)

    for (const rotation of Array(5).keys()) {
      expect(piece.up()).toBe(1 + (rotation % 4))
      expect(piece.left()).toBe(1 + ((1 + rotation) % 4))
      expect(piece.down()).toBe(1 + ((2 + rotation) % 4))
      expect(piece.right()).toBe(1 + ((3 + rotation) % 4))
      piece.addRotation()
    }
  })
})

describe('PuzzleState', () => {
  const width = 6
  const height = 8
  const pieceNumber = width * height

  it('should have all pieces', () => {
    const puzzle = PuzzleState.makeSolved(width, height, nb_different_edges)
    let count = 0
    const it = puzzle.allPieces()
    while (!it.next().done) count++
    expect(count).toBe(pieceNumber)
  })
})

describe('RotationPuzzleState', () => {
  it.each([
    [0, 0],
    [1, 4],
    [2, 2],
    [3, 6],
    [4, 1],
    [5, 5],
    [6, 3],
    [7, 7],
  ])("should find the match for '%s'", (value: number, expected: number) => {
    expect(RotationPuzzleState.getEdgeMatch(value, nb_different_edges)).toBe(
      expected,
    )
  })

  it('should check if solved, horizontally', () => {
    for (const link of [1, 3, 4, 6]) {
      for (const other of [0, 2, 5]) {
        const puzzleState = new RotationPuzzleState(
          [
            [
              [other, other, other, link],
              [other, link, other, link],
            ],
          ].map(r =>
            r.map(
              p =>
                new PuzzlePiece(
                  p[Direction.UP],
                  p[Direction.LEFT],
                  p[Direction.DOWN],
                  p[Direction.RIGHT],
                ),
            ),
          ),
          nb_different_edges,
          true,
        )

        expect(
          puzzleState.isSolved(),
          `Puzzle should be solved : left = ${puzzleState.pieces[0][0].right()}, right = ${puzzleState.pieces[0][1].left()}`,
        ).toBeTruthy()

        for (const rotation of [1, 2, 3]) {
          puzzleState.pieces[0][1].setRotation(rotation)

          expect(
            puzzleState.isSolved(),
            `Puzzle should NOT be solved : left = ${puzzleState.pieces[0][0].right()}, right = ${puzzleState.pieces[0][1].left()}`,
          ).toBeFalsy()
        }
      }
    }
  })

  it('should check if solved, vertically', () => {
    for (const link of [1, 3, 4, 6]) {
      for (const other of [0, 2, 5]) {
        // prettier-ignore
        const puzzleState = new RotationPuzzleState(
          [
            [[other, other, link, other]],
            [[link, other, link, other]],
          ].map(r =>
            r.map(
              p =>
                new PuzzlePiece(
                  p[Direction.UP],
                  p[Direction.LEFT],
                  p[Direction.DOWN],
                  p[Direction.RIGHT],
                ),
            ),
          ),
          nb_different_edges,
          true
        )
        expect(
          puzzleState.isSolved(),
          `Puzzle should be solved : down = ${puzzleState.pieces[0][0].down()}, up = ${puzzleState.pieces[1][0].up()}`,
        ).toBeTruthy()

        for (const rotation of [1, 2, 3]) {
          puzzleState.pieces[1][0].setRotation(rotation)
          expect(
            puzzleState.isSolved(),
            `Puzzle should NOT be solved : down = ${puzzleState.pieces[0][0].down()}, up = ${puzzleState.pieces[1][0].up()}`,
          ).toBeFalsy()
        }
      }
    }
  })
})

describe('RotationPuzzle', () => {
  const width = 6
  const height = 8
  const edgeNumber = width * height * 4

  it('should make a valid puzzle', () => {
    const puzzle = RotationPuzzle.makeRandom(width, height, nb_different_edges)
    // Should be the right size
    expect(puzzle.solution.height()).toBe(height)
    expect(puzzle.solution.width()).toBe(width)

    const edgeCountPerValue = new Map<number, number>()
    puzzle.solution.pieces.forEach(row =>
      row.forEach(piece => {
        edgeCountPerValue.set(
          piece.up(),
          1 + (edgeCountPerValue.get(piece.up()) || 0),
        )
        edgeCountPerValue.set(
          piece.left(),
          1 + (edgeCountPerValue.get(piece.left()) || 0),
        )
        edgeCountPerValue.set(
          piece.down(),
          1 + (edgeCountPerValue.get(piece.down()) || 0),
        )
        edgeCountPerValue.set(
          piece.right(),
          1 + (edgeCountPerValue.get(piece.right()) || 0),
        )
      }),
    )
    // Should have almost all edge numbers
    expect(edgeCountPerValue.size).toBeGreaterThan(nb_different_edges - 3)

    let sum = 0
    for (const [key, value] of edgeCountPerValue) {
      // Validate that we counted correctly
      expect(key).toBeLessThan(nb_different_edges)
      expect(key).toBeGreaterThanOrEqual(0)
      expect(value).toBeGreaterThan(0)
      expect(value).toBeLessThan(edgeNumber)
      sum += value
    }
    // Should have the correct number of edges
    expect(sum).toBe(edgeNumber)
  })

  it('should check if solved', () => {
    const puzzle = RotationPuzzle.makeRandom(width, height, nb_different_edges)
    expect(puzzle.solution.isSolved()).toBeTruthy()
    let notSolved = puzzle.solution.copy()
    // Values intentionnaly too big, can't be correct
    notSolved.pieces[0][0].edges = [9, 9, 9, 9]
    expect(notSolved.isSolved()).toBeFalsy()
    // Test the bottom right square
    notSolved = puzzle.solution.copy()
    notSolved.pieces[height - 1][width - 1].edges[Direction.DOWN] = 9
    expect(puzzle.solution.isSolved()).toBeTruthy()
    notSolved.pieces[height - 1][width - 1].edges[Direction.RIGHT] = 9
    expect(puzzle.solution.isSolved()).toBeTruthy()
    notSolved.pieces[height - 1][width - 1].edges[Direction.UP] = 9
    expect(notSolved.isSolved()).toBeFalsy()
    notSolved = puzzle.solution.copy()
    notSolved.pieces[height - 1][width - 1].edges[Direction.LEFT] = 9
    expect(notSolved.isSolved()).toBeFalsy()
  })

  it('should randomize', () => {
    const puzzle = RotationPuzzle.makeRandom(width, height, nb_different_edges)
    const solution = puzzle.solution as RotationPuzzleState
    const startState = puzzle.makeRandomStartingState() as RotationPuzzleState

    expect(startState.isSolved()).toBeFalsy()

    const rotationCount = new Map<number, number>()
    for (const row of Array(height).keys()) {
      for (const col of Array(width).keys()) {
        const startPiece = startState.pieces[row][col]
        // The pieces should not have moved, only rotated
        expect(startPiece.edges).toEqual(solution.pieces[row][col].edges)
        rotationCount.set(
          startPiece.rotation,
          1 + (rotationCount.get(startPiece.rotation) || 0),
        )
      }
    }
    // Should have all rotations
    expect(rotationCount.size).toBe(4)
  })
})
