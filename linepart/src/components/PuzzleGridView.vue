<template>
  <div v-if="props.puzzle" :style="{
    'display': 'grid',
    'grid-template-columns': 'repeat(' + props.puzzle.width() + ', 1fr)',
    'grid-auto-rows': 'minmax(100px, auto)',
  }">
    <PuzzlePieceView v-for="(piece, index) in props.puzzle.allPieces()" :key="index" :piece="piece" />
  </div>
</template>

<script setup lang="ts">
import PuzzlePieceView from './PuzzlePieceView.vue';
import { PuzzleState } from 'src/models/puzzle';

const props = defineProps<{
  puzzle: PuzzleState | null;
}>();
</script>
