<template>
  <q-page class="column content-center justify-center">
    <TitlePuzzle />
    <div class="spacer" />
    <q-btn color="primary" tag="a" href="puzzle">Play</q-btn>
  </q-page>
</template>

<style lang="css">
.spacer {
  padding: 1em;
}
</style>

<script setup lang="ts">
import TitlePuzzle from 'src/components/TitlePuzzle.vue';
</script>
