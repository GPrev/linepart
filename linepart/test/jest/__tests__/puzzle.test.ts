import { describe, expect, it } from '@jest/globals';
import { PuzzlePiece, PuzzleState, RotationPuzzle } from 'src/models/puzzle';

describe('PuzzlePiece', () => {
  it('should rotate', () => {
    const piece = new PuzzlePiece(1, 2, 3, 4);

    for (const rotation of Array(5).keys()) {
      expect(piece.up()).toBe(1 + (rotation % 4));
      expect(piece.left()).toBe(1 + ((1 + rotation) % 4));
      expect(piece.down()).toBe(1 + ((2 + rotation) % 4));
      expect(piece.right()).toBe(1 + ((3 + rotation) % 4));
      piece.addRotation();
    }
  });
});

describe('PuzzleState', () => {
  const width = 6;
  const height = 8;
  const nbDiffEdges = 7;
  const pieceNumber = width * height;

  it('should have all pieces', () => {
    const puzzle = PuzzleState.makeSolved(width, height, nbDiffEdges);
    let count = 0;
    for (const _ of puzzle.allPieces()) count++;
    expect(count).toBe(pieceNumber);
  });
});

describe('RotationPuzzle', () => {
  const width = 6;
  const height = 8;
  const nbDiffEdges = 7;
  const edgeNumber = width * height * 4;

  it('should make a valid puzzle', () => {
    const puzzle = RotationPuzzle.makeRandom(width, height, nbDiffEdges);
    // Should be the right size
    expect(puzzle.solution.height()).toBe(height);
    expect(puzzle.solution.width()).toBe(width);

    const edgeCountPerValue = new Map<number, number>();
    puzzle.solution.pieces.forEach((row) =>
      row.forEach((piece) => {
        edgeCountPerValue.set(
          piece.up(),
          1 + (edgeCountPerValue.get(piece.up()) || 0)
        );
        edgeCountPerValue.set(
          piece.left(),
          1 + (edgeCountPerValue.get(piece.left()) || 0)
        );
        edgeCountPerValue.set(
          piece.down(),
          1 + (edgeCountPerValue.get(piece.down()) || 0)
        );
        edgeCountPerValue.set(
          piece.right(),
          1 + (edgeCountPerValue.get(piece.right()) || 0)
        );
      })
    );
    // Should have almost all edge numbers
    expect(edgeCountPerValue.size).toBeGreaterThan(nbDiffEdges - 3);

    let sum = 0;
    for (const [key, value] of edgeCountPerValue) {
      // Validate that we counted correctly
      expect(key).toBeLessThan(nbDiffEdges + 1);
      expect(key).toBeGreaterThan(0);
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThan(edgeNumber);
      sum += value;
    }
    // Should have the correct number of edges
    expect(sum).toBe(edgeNumber);
  });

  it('should check if solved', () => {
    const puzzle = RotationPuzzle.makeRandom(width, height, nbDiffEdges);
    expect(puzzle.solution.isSolved()).toBeTruthy();
    const notSolved = puzzle.solution.copy();
    // Values intentionnaly too big, can't be correct
    notSolved.pieces[0][0].edges = [9, 9, 9, 9];
    expect(notSolved.isSolved()).toBeFalsy();
  });

  it('should randomize', () => {
    const puzzle = RotationPuzzle.makeRandom(width, height, nbDiffEdges);
    const solution = puzzle.solution;
    const startState = puzzle.makeRandomStartingState();
    expect(startState.isSolved()).toBeFalsy();

    const rotationCount = new Map<number, number>();
    for (const row of Array(height).keys()) {
      for (const col of Array(width).keys()) {
        const startPiece = startState.pieces[row][col];
        // The pieces should not have moved, only rotated
        expect(startPiece.edges).toEqual(solution.pieces[row][col].edges);
        rotationCount.set(
          startPiece.rotation,
          1 + (rotationCount.get(startPiece.rotation) || 0)
        );
      }
    }
    // Should have all rotations
    expect(rotationCount.size).toBe(4);
  });
});
