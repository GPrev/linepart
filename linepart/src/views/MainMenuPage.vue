<template>
  <div class="column content-center justify-center">
    <TitlePuzzle :piece-color="pieceColor" :line-color="lineColor" />
    <div class="spacer" />
    <RouterLink to="/puzzle" class="button">
      Play</RouterLink>
  </div>
</template>

<style lang="css">
.spacer {
  padding: 1em;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import TitlePuzzle from '@/components/TitlePuzzle.vue';
const pieceColor = ref('#333333')
const lineColor = ref('#eeeeaa')
</script>
