import { describe, expect, it } from 'vitest'
import { PuzzlePiece } from '@/models/puzzle'
import { Coordinates, CubicCurve, PuzzleThemeA } from '@/models/puzzletheme'

describe('PuzzleThemeA', () => {
  const theme = new PuzzleThemeA()

  it('should make straights', () => {
    const piece = new PuzzlePiece(2, 0, 2, 0)
    const svg = theme.toSvg(piece)
    expect(svg.cubicCurves).toHaveLength(1)
    expect(svg.cubicCurves[0]).toEqual(
      new CubicCurve(
        new Coordinates(0.5, 0),
        new Coordinates(0.5, 1),
        new Coordinates(0.5, 0.25),
        new Coordinates(0.5, 0.75),
      ),
    )
  })
  it('should make curves', () => {
    const piece = new PuzzlePiece(2, 2, 0, 0)
    const svg = theme.toSvg(piece)
    expect(svg.cubicCurves).toHaveLength(1)
    expect(svg.cubicCurves[0]).toEqual(
      new CubicCurve(
        new Coordinates(0.5, 0),
        new Coordinates(0, 0.5),
        new Coordinates(0.5, 0.25),
        new Coordinates(0.25, 0.5),
      ),
    )
  })
  it('should make corners', () => {
    const piece = new PuzzlePiece(1, 1, 0, 0)
    const svg = theme.toSvg(piece)
    expect(svg.cubicCurves).toHaveLength(1)
    expect(svg.cubicCurves[0]).toEqual(
      new CubicCurve(
        new Coordinates(0.25, 0),
        new Coordinates(0, 0.25),
        new Coordinates(0.25, 0.25),
        new Coordinates(0.25, 0.25),
      ),
    )
  })
  it('should make complex shapes', () => {
    const piece = new PuzzlePiece(2, 5, 7, 6)
    const svg = theme.toSvg(piece)
    expect(svg.cubicCurves).toHaveLength(4)
    for (const curve of [
      {
        endHandle: { x: 0.25, y: 0.75 },
        endPoint: { x: 0.25, y: 1 },
        startHandle: { x: 0.25, y: 0.75 },
        startPoint: { x: 0, y: 0.75 },
      },
      {
        endHandle: { x: 0.75, y: 0.75 },
        endPoint: { x: 1, y: 0.75 },
        startHandle: { x: 0.75, y: 0.75 },
        startPoint: { x: 0.75, y: 1 },
      },
      {
        endHandle: { x: 0.5, y: 0.25 },
        endPoint: { x: 0.5, y: 0 },
        startHandle: { x: 0.25, y: 0.25 },
        startPoint: { x: 0, y: 0.25 },
      },
      {
        endHandle: { x: 0.75, y: 0.5 },
        endPoint: { x: 1, y: 0.5 },
        startHandle: { x: 0.5, y: 0.75 },
        startPoint: { x: 0.5, y: 1 },
      },
    ]) {
      expect(svg.cubicCurves).toContainEqual(curve)
    }
  })
})
