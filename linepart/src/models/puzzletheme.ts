import { Direction, directions, PuzzlePiece } from '@/models/puzzle'

export class Coordinates {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  copy() {
    return new Coordinates(this.x, this.y)
  }

  toSvg(scale: Coordinates = new Coordinates(1, 1)) {
    return `${this.x * scale.x},${this.y * scale.y}`
  }
}

export class CubicCurve {
  startPoint: Coordinates
  startHandle: Coordinates
  endPoint: Coordinates
  endHandle: Coordinates

  constructor(
    startPoint: Coordinates,
    endPoint: Coordinates,
    startHandle: Coordinates,
    endHandle: Coordinates,
  ) {
    this.startPoint = startPoint
    this.startHandle = startHandle
    this.endPoint = endPoint
    this.endHandle = endHandle
  }

  toSvg(scale: Coordinates = new Coordinates(1, 1)) {
    return `M ${this.startPoint.toSvg(scale)} C ${this.startHandle.toSvg(
      scale,
    )} ${this.endHandle.toSvg(scale)} ${this.endPoint.toSvg(scale)}`
  }
}

export class SvgPiece {
  cubicCurves: CubicCurve[]

  constructor(cubicCurves: CubicCurve[]) {
    this.cubicCurves = cubicCurves
  }

  toSvg(scale: Coordinates = new Coordinates(1, 1)) {
    return this.cubicCurves.map(c => c.toSvg(scale)).join(' ')
  }
}

export interface PuzzleTheme {
  toSvg(piece: PuzzlePiece): SvgPiece
}

export class PuzzleThemeA implements PuzzleTheme {
  static firstEdge = 0
  static firstPoint = 0.25
  static middlePoint = 0.5
  static lastPoint = 0.75
  static lastEdge = 1

  static leftCorners = [0, 3, 6, 9]
  static rightCorners = [2, 5, 8, 11]
  static middles = [1, 4, 7, 10]

  static coordinates = [
    // UP
    new Coordinates(PuzzleThemeA.lastPoint, PuzzleThemeA.firstEdge),
    new Coordinates(PuzzleThemeA.middlePoint, PuzzleThemeA.firstEdge),
    new Coordinates(PuzzleThemeA.firstPoint, PuzzleThemeA.firstEdge),
    // LEFT
    new Coordinates(PuzzleThemeA.firstEdge, PuzzleThemeA.firstPoint),
    new Coordinates(PuzzleThemeA.firstEdge, PuzzleThemeA.middlePoint),
    new Coordinates(PuzzleThemeA.firstEdge, PuzzleThemeA.lastPoint),
    // DOWN
    new Coordinates(PuzzleThemeA.firstPoint, PuzzleThemeA.lastEdge),
    new Coordinates(PuzzleThemeA.middlePoint, PuzzleThemeA.lastEdge),
    new Coordinates(PuzzleThemeA.lastPoint, PuzzleThemeA.lastEdge),
    // RIGHT
    new Coordinates(PuzzleThemeA.lastEdge, PuzzleThemeA.lastPoint),
    new Coordinates(PuzzleThemeA.lastEdge, PuzzleThemeA.middlePoint),
    new Coordinates(PuzzleThemeA.lastEdge, PuzzleThemeA.firstPoint),
  ]

  toSvg(piece: PuzzlePiece): SvgPiece {
    // List active points
    let activePoints = new Array<number>()
    for (const dir of directions) {
      const edge = piece.getEdge(dir, false)
      for (const idx of [0, 1, 2]) {
        // For UP and RIGHT, reverse the point order so that it matches the opposite side
        const newIdx = [Direction.UP, Direction.RIGHT].includes(dir)
          ? 2 - idx
          : idx
        if ((edge & (1 << idx)) != 0) activePoints.push(3 * dir + newIdx)
      }
    }

    const connections = new Array<Array<number>>()
    // 1. attach corners to nearest point, not on the same edge
    // 2. attach corners to the nearest point on the same edge
    for (const dist of [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 10]) {
      // Last 2 inverted on purpose, see above comment
      for (const rc of PuzzleThemeA.rightCorners) {
        if (activePoints.includes(rc)) {
          const target = (rc + dist) % PuzzleThemeA.coordinates.length
          if (activePoints.includes(target)) {
            // connect rc and target
            connections.push([rc, target])
            activePoints = activePoints.filter(x => ![rc, target].includes(x))
          }
        }
      }
      for (const lc of PuzzleThemeA.leftCorners) {
        if (activePoints.includes(lc)) {
          const target = (lc - dist) % PuzzleThemeA.coordinates.length
          if (activePoints.includes(target)) {
            // connect lc and target
            connections.push([lc, target])
            activePoints = activePoints.filter(x => ![lc, target].includes(x))
          }
        }
      }
    }

    // 3. attach any remaining centers to the nearest center
    for (const dist of [3, 6]) {
      for (const mid of PuzzleThemeA.middles) {
        if (activePoints.includes(mid)) {
          const target = (mid + dist) % PuzzleThemeA.coordinates.length
          if (activePoints.includes(target)) {
            // connect mid and target
            connections.push([mid, target])
            activePoints = activePoints.filter(x => ![mid, target].includes(x))
          }
        }
      }
    }

    // 4. any remaining point cannot be saved
    for (const alone of activePoints) {
      connections.push([alone, alone])
    }

    // Convert connections to SVG
    return new SvgPiece(
      connections.map(con => {
        const startPoint = PuzzleThemeA.coordinates[con[0]]
        const startHandle = startPoint.copy()
        const endPoint = PuzzleThemeA.coordinates[con[1]]
        const endHandle = endPoint.copy()
        for (const handle of [startHandle, endHandle]) {
          if (handle.x == PuzzleThemeA.firstEdge)
            handle.x = PuzzleThemeA.firstPoint
          if (handle.x == PuzzleThemeA.lastEdge)
            handle.x = PuzzleThemeA.lastPoint
          if (handle.y == PuzzleThemeA.firstEdge)
            handle.y = PuzzleThemeA.firstPoint
          if (handle.y == PuzzleThemeA.lastEdge)
            handle.y = PuzzleThemeA.lastPoint
        }
        return new CubicCurve(startPoint, endPoint, startHandle, endHandle)
      }),
    )
  }
}
