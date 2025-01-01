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
  background: rgba(200, 200, 200, .3);
  padding: v-bind('scale / 10 + "px"');
  border-radius: v-bind('scale / 10 + "px"');
}

.puzzle.win {
  animation: v-bind('`puzzle-on-win ${(isAnimated ? ".5s" : "0s")} ease-in`');
  animation-fill-mode: forwards;
}

.puzzle.win .piece {
  animation: v-bind('`piece-on-win ${(isAnimated ? ".5s" : "0s")} ease-in`');
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
import PuzzlePieceView from '@/components/PuzzlePieceView.vue';
import { PuzzleState } from '@/models/puzzle';
import { type PuzzleTheme } from '@/models/puzzletheme';

const {
  puzzle = null, theme = null, scale = 100, pieceColor = '#ffffff', lineColor = '#000000', isLocked = false, isAnimated = true
} = defineProps<{
  puzzle: PuzzleState | null;
  theme?: PuzzleTheme | null;
  scale?: number;
  pieceColor?: string;
  lineColor?: string;
  isLocked?: boolean
  isAnimated?: boolean
}>();
</script>
