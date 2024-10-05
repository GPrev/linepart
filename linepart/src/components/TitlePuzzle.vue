<template>
  <div>
    <PuzzleGridView :puzzle="puzzle" :theme="theme" :scale="scale" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PuzzleGridView from './PuzzleGridView.vue';
import { PuzzlePiece, PuzzleState } from 'src/models/puzzle';
import { PuzzleThemeA } from 'src/models/puzzletheme';

const puzzle = ref(new PuzzleState([
  [[4, 0, 4, 0], [0, 0, 2, 0], [0, 0, 5, 0], [0, 0, 4, 4], [0, 4, 1, 0], [0, 0, 0, 0]],
  [[4, 0, 0, 4], [2, 0, 2, 0], [5, 0, 5, 0], [4, 0, 0, 4], [1, 5, 0, 0], [0, 0, 0, 0]],
  [[0, 0, 4, 2], [0, 2, 2, 0], [0, 0, 1, 2], [0, 2, 5, 2], [0, 2, 2, 0], [0, 4, 0, 4]],
  [[4, 0, 4, 0], [2, 2, 0, 0], [1, 0, 1, 2], [5, 0, 5, 0], [2, 3, 2, 0], [2, 0, 2, 0]],
].map(r => r.map(p => new PuzzlePiece(...p))))
)

const scale = ref(40)
const theme = ref(new PuzzleThemeA())
</script>
