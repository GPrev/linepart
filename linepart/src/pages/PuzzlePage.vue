<template>
  <p>{{ isSolved }}</p>
  <q-page padding>
    <PuzzleGridView :puzzle="puzzleState" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { RotationPuzzle } from 'src/models/puzzle';
import PuzzleGridView from '../components/PuzzleGridView.vue';

const puzzle = ref(RotationPuzzle.makeRandom(3, 3, 8))
const puzzleState = ref(puzzle.value.makeRandomStartingState())

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
