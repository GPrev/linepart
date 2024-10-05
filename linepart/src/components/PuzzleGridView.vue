<template>
  <div v-if="puzzle" :style="{
    'display': 'grid',
    'grid-template-columns': `repeat(${puzzle.width()}, ${scale}px)`,
    'grid-auto-rows': `${scale}px`,
  }">
    <PuzzlePieceView v-for="(piece, index) in puzzle.allPieces()" :key="index" :piece="piece" :theme="theme"
      :scale="scale" :piece-color="pieceColor" :line-color="lineColor" :isLocked="isLocked" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PuzzlePieceView from './PuzzlePieceView.vue';
import { PuzzleState } from 'src/models/puzzle';
import { PuzzleTheme } from 'src/models/puzzletheme';

const {
  puzzle = null, theme = null, scale = 100, isLocked = false
} = defineProps<{
  puzzle: PuzzleState | null;
  theme?: PuzzleTheme | null;
  scale?: number;
  isLocked?: boolean
}>();

const pieceColor = ref('#333333')
const lineColor = ref('#eeeeaa')
</script>
