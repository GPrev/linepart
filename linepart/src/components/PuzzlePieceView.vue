<template>
  <div v-if="props.piece" v-ripple class="relative-position container flex flex-center cursor-pointer"
    @click="props.piece.addRotation">
    <svg v-if="props.theme" :style="rotationStyle">
      <path :d="svgPath" />
    </svg>
    <div v-else :style="rotationStyle">
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

<style>
path {
  stroke: #000000;
  stroke-width: 5;
  fill: none;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { PuzzlePiece } from 'src/models/puzzle';
import { Coordinates, PuzzleTheme } from 'src/models/puzzletheme';

const props = defineProps<{
  piece: PuzzlePiece | null;
  theme?: PuzzleTheme | undefined;
  scale?: number | undefined;
}>();

const scaleVector = computed(() => {
  return new Coordinates(props.scale || 1, props.scale || 1)
});

const svgPath = computed(() => {
  if (props.theme && props.piece && props.scale) {
    return props.theme.toSvg(props.piece).toSvg(scaleVector.value);
  }
  return ''
});

const rotationStyle = computed(() => {
  return {
    width: `${props.scale || 50}px`,
    height: `${props.scale || 50}px`,
    transform: `rotate(${90 * (props.piece?.rotation || 0)}deg)`
  }
});
</script>
