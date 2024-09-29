<template>
  <p>{{ isSolved }}</p>
  <q-page padding>
    <PuzzleGridView :puzzle="puzzleState" :theme="theme" :scale="scale" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import PuzzleGridView from '../components/PuzzleGridView.vue';
import { RotationPuzzle } from 'src/models/puzzle';
import { PuzzleThemeA } from 'src/models/puzzletheme';

const puzzle = ref(RotationPuzzle.makeRandom(3, 3, 8))
const puzzleState = ref(puzzle.value.makeRandomStartingState())

const scale = ref(50)
const theme = ref(new PuzzleThemeA())

const isSolved = computed(() => {
  return puzzleState.value.isSolved();
});

watch(isSolved, async (isSolved) => {
  if (isSolved)
    console.log('Puzzle solved !')
}, {
  immediate: true
})
</script>
