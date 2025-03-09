<template>
  <div class="column content-center justify-center items-center">
    <RouterLink to="/" class=" round button topleft ma-xs">◀</RouterLink>
    <div v-if="isTutorial" class="tutorial-box ma-lg">
      <span class="tutorial-i">&#x1F6C8;</span>
      <span class="tutorial-text">{{ tutorialText[tutorial] }}</span>
    </div>
    <PuzzleGridView :puzzle="puzzleState" :theme="theme" :scale="scale" :piece-color="pieceColor"
      :line-color="lineColor" :isLocked="isSolved" />
    <div v-if="test">
      <br />
      <p>{{ isSolved }}</p>
      <PuzzleGridView :puzzle="puzzleState" :scale="scale" />
    </div>
    <div :class="[{ ['win']: isSolved }, 'popup-container']">
      <WinBoxView v-if="isSolved" :class="[{ ['win']: isSolved }, 'win-popup', 'my-lg']" :theme="theme"
        :piece-color="pieceColor" :line-color="lineColor" :scale="scale"
        :new-puzzle-text="isTutorial ? (lastTutorial ? 'Start playing' : 'Next Tutorial') : undefined"
        @new-puzzle-click="newPuzzle()" />
    </div>
  </div>
</template>

<style lang="css">
.tutorial-box {
  display: flex;
  padding: 4px 8px;
  color: v-bind('lineColor');
  background-color: v-bind('pieceColor');
  border: solid 1px;
  border-color: v-bind('lineColor');
  border-radius: 16px;
}

.tutorial-i {
  font-size: 25px;
  line-height: 15px;
  translate: -3px 3px;
}

.tutorial-text {
  margin-left: 4px;
  margin-right: 4px;
  white-space: pre-line;
}

.win-popup {
  transform: scale(0);
}

.win-popup.win {
  animation: popup-on-win .5s ease-in;
  animation-delay: .5s;
  animation-fill-mode: forwards;
}

@keyframes popup-on-win {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.popup-container {
  height: 0;
}

.popup-container.win {
  animation: container-on-win .5s ease-in;
  animation-delay: .5s;
  animation-fill-mode: forwards;
}

@keyframes container-on-win {
  to {
    height: 100px;
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import PuzzleGridView from '@/components/PuzzleGridView.vue';
import WinBoxView from '@/components/WinBoxView.vue';
import { PuzzlePiece, RotationPuzzle, RotationPuzzleState } from '@/models/puzzle';
import { PuzzleThemeA } from '@/models/puzzletheme';

const router = useRouter()

const puzzleWidth = 3
const puzzleHeight = 3
const permutations = 8

const scale = ref(100)
const theme = ref(new PuzzleThemeA())
const pieceColor = ref('#333333')
const lineColor = ref('#eeeeaa')

const test = ref(false)

const {
  tutorial = -1
} = defineProps<{
  tutorial?: number
}>()

const tutorialText = [
  "Touch the tiles to rotate them, and connect the lines.",
  "Lines leaving the edge of the puzzle are allowed.\nJust connect the lines in between tiles.",
  "Tiles that match might still be in the wrong position.",
]

const tutorialPuzzles = [
  [[[2, 0, 0, 0], [0, 0, 2, 0]]],
  [[[2, 1, 1, 1], [5, 5, 2, 5]]],
  [
    [[0, 4, 3, 2], [5, 2, 2, 3]],
    [[1, 1, 1, 1], [2, 5, 1, 0]],
  ],
].map(puzzleData => new RotationPuzzleState(puzzleData.map(row => row.map(p => new PuzzlePiece(...p))), permutations, true))

const isTutorial = (tutorial >= 0 && tutorial < tutorialPuzzles.length)
const lastTutorial = (tutorial == tutorialPuzzles.length - 1)

const puzzle = ref(isTutorial ? new RotationPuzzle(tutorialPuzzles[tutorial]) : RotationPuzzle.makeRandom(puzzleWidth, puzzleHeight, permutations))
const puzzleState = ref(isTutorial ? tutorialPuzzles[tutorial] : puzzle.value.makeRandomStartingState())

function newPuzzle () {
  if (isTutorial) {
    router.push({ path: '/puzzle', query: { tutorial: lastTutorial ? undefined : tutorial + 1 } })
  }
  else {
    puzzle.value = RotationPuzzle.makeRandom(puzzleWidth, puzzleHeight, permutations)
    puzzleState.value = puzzle.value.makeRandomStartingState()
  }
}

const isSolved = computed(() => {
  // Special case for tutorial 0 : force the chosen solution
  if (tutorial == 0 && puzzleState.value.pieces[0][0].right() == 0)
    return false
  return puzzleState.value.isSolved();
});
</script>
