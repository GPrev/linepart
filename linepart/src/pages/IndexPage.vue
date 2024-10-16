<template>
  <q-page class="column content-center justify-center">
    <TitlePuzzle :piece-color="pieceColor" :line-color="lineColor" />
    <div class="spacer" />
    <q-btn class="button" tag="a" href="puzzle">Play</q-btn>
  </q-page>
</template>

<style lang="css">
.spacer {
  padding: 1em;
}

.button {
  color: v-bind(lineColor);
  background-color: v-bind(pieceColor);
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import TitlePuzzle from 'src/components/TitlePuzzle.vue';
const pieceColor = ref('#333333')
const lineColor = ref('#eeeeaa')
</script>
