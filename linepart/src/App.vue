<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { RotationPuzzle } from '@/models/puzzle';
import { PuzzleThemeA } from '@/models/puzzletheme';
import PuzzleGridView from '@/components/PuzzleGridView.vue';
import LanguageSelector from '@/components/LanguageSelector.vue';

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)
onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  })
})

const scale = ref(100)
const puzzleWidth = computed(() => {
  return Math.ceil(windowWidth.value / scale.value)
});
const puzzleHeight = computed(() => {
  return Math.ceil(windowHeight.value / scale.value)
});

const theme = ref(new PuzzleThemeA())
const pieceColor = ref('#161616')
const lineColor = ref('#222222')

const puzzle = computed(() => {
  return RotationPuzzle.makeRandom(puzzleWidth.value, puzzleHeight.value, 8)
})

const puzzleState = computed(() => {
  return puzzle.value.solution
})

</script>

<template>
  <div class="background-puzzle">
    <PuzzleGridView :puzzle="puzzleState" :theme="theme" :scale="scale" :piece-color="pieceColor"
      :line-color="lineColor" :is-locked="true" :is-animated="false" />
  </div>
  <div class="main-container">
    <LanguageSelector class="topright" />
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style lang="css">
.background-puzzle {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main-container {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
