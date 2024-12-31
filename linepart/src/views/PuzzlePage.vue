<template>
  <div class="column content-center justify-center items-center">
    <RouterLink to="/" class=" round button topleft ma-xs">◀</RouterLink>
    <PuzzleGridView :puzzle="puzzleState" :theme="theme" :scale="scale" :piece-color="pieceColor"
      :line-color="lineColor" :isLocked="isSolved" />
    <div v-if="test">
      <br />
      <p>{{ isSolved }}</p>
      <PuzzleGridView :puzzle="puzzleState" :scale="scale" />
    </div>
    <div :class="[{ ['win']: isSolved }, 'popup-container']">
      <WinBoxView v-if="isSolved" :class="[{ ['win']: isSolved }, 'win-popup']" :theme="theme" :piece-color="pieceColor"
        :line-color="lineColor" :scale="scale" @new-puzzle-click="newPuzzle()" />
    </div>
  </div>
</template>

<style lang="css">
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
import PuzzleGridView from '../components/PuzzleGridView.vue';
import WinBoxView from '../components/WinBoxView.vue';
import { RotationPuzzle } from '/src/models/puzzle';
import { PuzzleThemeA } from '/src/models/puzzletheme';

const puzzleWidth = 3
const puzzleHeight = 3
const permutations = 8

const puzzle = ref(RotationPuzzle.makeRandom(puzzleWidth, puzzleHeight, permutations))
const puzzleState = ref(puzzle.value.makeRandomStartingState())

const scale = ref(100)
const theme = ref(new PuzzleThemeA())
const pieceColor = ref('#333333')
const lineColor = ref('#eeeeaa')

const test = ref(false)

function newPuzzle () {
  puzzle.value = RotationPuzzle.makeRandom(puzzleWidth, puzzleHeight, permutations)
  puzzleState.value = puzzle.value.makeRandomStartingState()
}

const isSolved = computed(() => {
  return puzzleState.value.isSolved();
});
</script>
