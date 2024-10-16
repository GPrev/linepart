<template>
  <div v-if="puzzle" :class="['puzzle', 'shadow', { ['win']: isLocked }]">
    <PuzzlePieceView v-for="(piece, index) in puzzle.allPieces()" :key="index" :piece="piece" :theme="theme"
      :scale="scale" :piece-color="pieceColor" :line-color="lineColor" :isLocked="isLocked" />
  </div>
</template>

<style lang="css">
.puzzle {
  display: grid;
  grid-template-columns: v-bind('`repeat(${puzzle?.width()}, ${scale}px)`');
  grid-auto-rows: v-bind('scale + "px"');
  grid-column-gap: v-bind('scale / 15 + "px"');
  grid-row-gap: v-bind('scale / 15 + "px"');
  background: dimgray;
  padding: v-bind('scale / 10 + "px"');
  border-radius: v-bind('scale / 10 + "px"');
}

.puzzle.win {
  animation: puzzle-on-win .5s ease-in;
  animation-fill-mode: forwards;
}

.puzzle.win .piece {
  animation: piece-on-win .5s ease-in;
  animation-fill-mode: forwards;
}

@keyframes puzzle-on-win {
  to {
    border-radius: 0;
    padding: 0;
    grid-column-gap: 0;
    grid-row-gap: 0;
  }
}

@keyframes piece-on-win {
  to {
    border-radius: 0;
  }
}
</style>

<script setup lang="ts">
import PuzzlePieceView from './PuzzlePieceView.vue';
import { PuzzleState } from 'src/models/puzzle';
import { PuzzleTheme } from 'src/models/puzzletheme';

const {
  puzzle = null, theme = null, scale = 100, pieceColor = '#ffffff', lineColor = '#000000', isLocked = false
} = defineProps<{
  puzzle: PuzzleState | null;
  theme?: PuzzleTheme | null;
  scale?: number;
  pieceColor?: string;
  lineColor?: string;
  isLocked?: boolean
}>();
</script>
