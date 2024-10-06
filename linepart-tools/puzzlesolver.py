from typing import List
import random
import copy


class Direction:
    UP = 0
    LEFT = 1
    DOWN = 2
    RIGHT = 3
    NB = 4
    ALL = [UP, LEFT, DOWN, RIGHT]

    def rotate(dir: int, amount = 1):
        return (Direction.NB + dir - amount) % Direction.NB
class PuzzlePiece:
    def __init__(self, up: int = 0, left: int = 0, down: int = 0, right: int = 0, random_edgecount = 0) -> None:
        if random_edgecount > 0:
            self.up = random.randint(1, random_edgecount)
            self.left = random.randint(1, random_edgecount)
            self.down = random.randint(1, random_edgecount)
            self.right = random.randint(1, random_edgecount)
        else:
            self.up = up
            self.left = left
            self.down = down
            self.right = right

    def __str__(self) -> str:
        return f"<{self.left}^{self.up}{self.down}v{self.right}>"
    
    def getEdge(self, direction: int):
        match direction:
            case Direction.UP:
                return self.up
            case Direction.LEFT:
                return self.left
            case Direction.DOWN:
                return self.down
            case Direction.RIGHT:
                return self.right
            case _:
                return -1
    
    def edges(self):
        return [self.up, self.left, self.down, self.right]
    
    def rotate(self, amount: int = 1) -> None:
        for _ in range(amount):
            self.up, self.left, self.down, self.right = self.right, self.up, self.left, self.down

class Puzzle:
    def __init__(self, vertical_edges:List[List[int]] = None, horizontal_edges:List[List[int]] = None, width:int = None, height:int = None, random_edgecount = 0, no_symmetry = False) -> None:
        if vertical_edges is not None and horizontal_edges is not None :
            self.vertical_edges = vertical_edges
            self.horizontal_edges = horizontal_edges
        elif width is not None and height is not None:
            randmin = 1 if random_edgecount > 0 else 0
            self.vertical_edges = [[random.randint(randmin, random_edgecount) for _ in range(width + 1)] for _ in range(height)]
            self.horizontal_edges = [[random.randint(randmin, random_edgecount) for _ in range(width)] for _ in range(height + 1)]
        else:
            self.vertical_edges = []
            self.horizontal_edges = []

        self.height = len(self.vertical_edges)
        self.width = 0 if self.height == 0 else len(self.horizontal_edges[0])
        
        if no_symmetry:
            for row in range(self.height):
                for col in range(self.width):
                    up = lambda: self.horizontal_edges[row][col]
                    left = lambda: self.vertical_edges[row][col]
                    down = lambda: self.horizontal_edges[row+1][col]
                    right = lambda: self.vertical_edges[row][col+1]
                    while(up() == down() and left() == right()):
                        for x in range(2):
                            self.horizontal_edges[row+x][col] = random.randint(randmin, random_edgecount)
                            self.vertical_edges[row][col+x] = random.randint(randmin, random_edgecount)

        self.pieces = [[PuzzlePiece(up=self.horizontal_edges[line][col], 
                                    left=self.vertical_edges[line][col], 
                                    down=self.horizontal_edges[line + 1][col], 
                                    right=self.vertical_edges[line][col + 1]) 
                        for col in range(self.width)] for line in range(self.height)]
        
    def __str__(self) -> str:
        res = "Puzzle :"
        for row in range(self.height + 1):
            res += "\n|" + "".join([f"-{v}-|" for v in self.horizontal_edges[row]])
            if row < self.height:
                res += "\n" + "   ".join([f"{v}" for v in self.vertical_edges[row]])
        return res
   
class RotationPuzzle(Puzzle):
        pass

class RotationPuzzleAttempt:
    def __init__(self, puzzle: RotationPuzzle) -> None:
        self.puzzle = puzzle
        self.pieces = puzzle.pieces

    def __str__(self) -> str:
        res = "RotationPuzzleAttempt :"
        for row in self.pieces:
            res += "\n" + "".join([f"|-{p.up}-|" for p in row])
            res += "\n" + "".join([f"{p.left}   {p.right}" for p in row])
            res += "\n" + "".join([f"|-{p.down}-|" for p in row])
        return res

    def randomize(self) -> None:
        for row in self.pieces:
            for piece in row:
                for _ in range(random.randint(0, 3)):
                    piece.rotate()
    
    def checkValidity(self):
        for row in range(self.puzzle.height - 1):
            for col in range(self.puzzle.width):
                if self.pieces[row][col].down != self.pieces[row + 1][col].up:
                    return False
        for row in range(self.puzzle.height):
            for col in range(self.puzzle.width - 1):
                if self.pieces[row][col].right != self.pieces[row][col + 1].left:
                    return False
        return True

class RotationPuzzleSolver:
    def analyze(self, puzzle: RotationPuzzle):
        return {
            "solutions": self.findAllSolutions(puzzle)
        }
    
    def findAllSolutions(self, puzzle: RotationPuzzle):
        validAngles = [[self.findValidAngles(puzzle, row, col) for col in range(puzzle.width)] for row in range(puzzle.height)]
        oldValidAngles = None
        while validAngles != oldValidAngles:
            oldValidAngles = validAngles
            validAngles = [[self.findValidAngles(puzzle, row, col, oldValidAngles) for col in range(puzzle.width)] for row in range(puzzle.height)]
        return self.makeSolutions(puzzle, validAngles)
    
    def makeSolutions(self, puzzle: RotationPuzzle, validAngles: List[List[List[int]]], row = 0, col = 0, attempt: RotationPuzzleAttempt = None):
        if col >= puzzle.width:
            col = 0
            row += 1
        if row >= puzzle.height:
            return [attempt]
        if attempt is None:
            attempt = RotationPuzzleAttempt(puzzle)
        def makeRotation(dir):
            newAttempt = copy.deepcopy(attempt)
            newAttempt.pieces[row][col].rotate(dir)
            return newAttempt
        return [solution for dir in validAngles[row][col] for solution in self.makeSolutions(puzzle, validAngles, row, col+1, makeRotation(dir))]

    def findValidAngles(self, puzzle: RotationPuzzle, row: int, col: int, validAngles: List[List[List[int]]]= None):
        if validAngles and len(validAngles[row][col]) == 1:
            return validAngles[row][col]
        elif validAngles:
            return [dir for dir in validAngles[row][col] if self.isValidAngle(puzzle, row, col, dir, validAngles)]
        else:
            return [dir for dir in Direction.ALL if self.isValidAngle(puzzle, row, col, dir)]

    def isValidAngle(self, puzzle: RotationPuzzle, row: int, col: int, angle: int, validAngles: List[List[List[int]]]= None) -> bool:
        if validAngles:
            upOk = row == 0 or puzzle.pieces[row][col].getEdge(Direction.rotate(Direction.UP, angle)) in [puzzle.pieces[row - 1][col].getEdge(Direction.rotate(Direction.DOWN, dir)) for dir in validAngles[row - 1][col]]
            leftOk = col == 0 or puzzle.pieces[row][col].getEdge(Direction.rotate(Direction.LEFT, angle)) in [puzzle.pieces[row][col - 1].getEdge(Direction.rotate(Direction.RIGHT, dir)) for dir in validAngles[row][col - 1]]
            downOk = row == puzzle.height - 1 or puzzle.pieces[row][col].getEdge(Direction.rotate(Direction.DOWN, angle)) in [puzzle.pieces[row + 1][col].getEdge(Direction.rotate(Direction.UP, dir)) for dir in validAngles[row + 1][col]]
            rightOk = col == puzzle.width - 1 or puzzle.pieces[row][col].getEdge(Direction.rotate(Direction.RIGHT, angle)) in [puzzle.pieces[row][col + 1].getEdge(Direction.rotate(Direction.LEFT, dir)) for dir in validAngles[row][col + 1]]
            return upOk and leftOk and downOk and rightOk
        else:
            upOk = row == 0 or puzzle.pieces[row][col].getEdge(Direction.rotate(Direction.UP, angle)) in puzzle.pieces[row - 1][col].edges()
            leftOk = col == 0 or puzzle.pieces[row][col].getEdge(Direction.rotate(Direction.LEFT, angle)) in puzzle.pieces[row][col - 1].edges()
            downOk = row == puzzle.height - 1 or puzzle.pieces[row][col].getEdge(Direction.rotate(Direction.DOWN, angle)) in puzzle.pieces[row + 1][col].edges()
            rightOk = col == puzzle.width - 1 or puzzle.pieces[row][col].getEdge(Direction.rotate(Direction.RIGHT, angle)) in puzzle.pieces[row][col + 1].edges()
            return upOk and leftOk and downOk and rightOk

    def checkDifficulty(self, puzzle: RotationPuzzle):
        pass
