<template>
  <div v-if="props.puzzle" :style="{
    'display': 'grid',
    'grid-template-columns': `repeat(${props.puzzle.width()}, ${props.scale || 50}px)`,
    'grid-auto-rows': `${props.scale || 50}px`,
  }">
    <PuzzlePieceView v-for="(piece, index) in props.puzzle.allPieces()" :key="index" :piece="piece" :theme="props.theme"
      :scale="props.scale" />
  </div>
</template>

<script setup lang="ts">
import PuzzlePieceView from './PuzzlePieceView.vue';
import { PuzzleState } from 'src/models/puzzle';
import { PuzzleTheme } from 'src/models/puzzletheme';

const props = defineProps<{
  puzzle: PuzzleState | null;
  theme?: PuzzleTheme | undefined;
  scale?: number | undefined;
}>();
</script>
