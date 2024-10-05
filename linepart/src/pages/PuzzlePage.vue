<template>
  <q-page class="column content-center justify-center">
    <q-btn class="topleft" href="/" flat round color="primary" icon="arrow_back" />
    <PuzzleGridView :puzzle="puzzleState" :theme="theme" :scale="scale" />
    <div v-if="test">
      <br />
      <p>{{ isSolved }}</p>
      <PuzzleGridView :puzzle="puzzleState" :scale="scale" />
    </div>
  </q-page>
</template>

<style lang="css">
.topleft {
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import PuzzleGridView from '../components/PuzzleGridView.vue';
import { RotationPuzzle } from 'src/models/puzzle';
import { PuzzleThemeA } from 'src/models/puzzletheme';

const puzzle = ref(RotationPuzzle.makeRandom(3, 3, 8))
const puzzleState = ref(puzzle.value.makeRandomStartingState())

const scale = ref(100)
const theme = ref(new PuzzleThemeA())

const test = ref(false)

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
