<template>
  <div v-if="props.piece" v-ripple class="relative-position container flex flex-center cursor-pointer"
    @click="props.piece.addRotation">
    <div :style="{ transform: 'rotate(' + 90 * props.piece.rotation + 'deg)' }">
      x{{ props.piece.myup() }}x<br />
      {{ props.piece.myleft() }} {{ props.piece.myright() }}<br />
      x{{ props.piece.mydown() }}x
    </div>
  </div>
  <div v-else>
    xxx<br />
    x x<br />
    xxx
  </div>
</template>

<script setup lang="ts">
import { PuzzlePiece } from 'src/models/puzzle';

const props = defineProps<{
  piece: PuzzlePiece | null;
}>();
</script>
