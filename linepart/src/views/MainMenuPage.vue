<template>
  <div class="column content-center justify-center">
    <PwaInstallButton class="topleft ma-xs" />
    <TitlePuzzle :piece-color="pieceColor" :line-color="lineColor" />
    <div class="spacer" />
    <RouterLink to="/puzzle" class="button">
      {{ $t("home.play") }}</RouterLink>
    <div class="smallspacer" />
    <RouterLink to="/puzzle?tutorial=0" class="button">
      {{ $t("home.tutorial") }}</RouterLink>
    <div class="bottomright my-sm mx-md">{{ $t("home.version", { version: version }) }}</div>
  </div>
</template>

<style lang="css">
.spacer {
  padding: 1em;
}

.smallspacer {
  padding: 0.5em;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import TitlePuzzle from '@/components/TitlePuzzle.vue';
import PwaInstallButton from '@/components/PwaInstallButton.vue';

const version = __APP_VERSION__
const pieceColor = ref('#333333')
const lineColor = ref('#eeeeaa')
</script>
