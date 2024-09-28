import { describe, expect, it } from '@jest/globals';
import { PuzzlePiece } from 'src/models/puzzle';
import { Coordinates, CubicCurve, PuzzleThemeA } from 'src/models/puzzletheme';

describe('PuzzleThemeA', () => {
  const theme = new PuzzleThemeA();

  it('should make straights', () => {
    const piece = new PuzzlePiece(2, 0, 2, 0);
    const svg = theme.toSvg(piece);
    expect(svg.cubicCurves).toHaveLength(1);
    expect(svg.cubicCurves[0]).toEqual(
      new CubicCurve(
        new Coordinates(0.5, 0),
        new Coordinates(0.5, 1),
        new Coordinates(0.5, 0.25),
        new Coordinates(0.5, 0.75)
      )
    );
  });
  it('should make curves', () => {
    const piece = new PuzzlePiece(2, 2, 0, 0);
    const svg = theme.toSvg(piece);
    expect(svg.cubicCurves).toHaveLength(1);
    expect(svg.cubicCurves[0]).toEqual(
      new CubicCurve(
        new Coordinates(0.5, 0),
        new Coordinates(0, 0.5),
        new Coordinates(0.5, 0.25),
        new Coordinates(0.25, 0.5)
      )
    );
  });
  it('should make corners', () => {
    const piece = new PuzzlePiece(4, 1, 0, 0);
    const svg = theme.toSvg(piece);
    expect(svg.cubicCurves).toHaveLength(1);
    expect(svg.cubicCurves[0]).toEqual(
      new CubicCurve(
        new Coordinates(0.25, 0),
        new Coordinates(0, 0.25),
        new Coordinates(0.25, 0.25),
        new Coordinates(0.25, 0.25)
      )
    );
  });
});
