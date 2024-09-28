from typing import List
import random

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

class Puzzle:
    def __init__(self, vertical_edges:List[List[int]] = None, horizontal_edges:List[List[int]] = None, width:int = None, height:int = None, random_edgecount = 0) -> None:
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