<template>
  <div v-if="piece" v-ripple class="relative-position container flex flex-center cursor-pointer"
    :style="{ color: lineColor }" @click="() => { if (!isLocked) piece?.addRotation() }">
    <svg v-if="theme" :style="pieceStyle">
      <path :d="svgPath" :style="pathStyle" />
    </svg>
    <div v-else :style="pieceStyle">
      x{{ piece.myup() }}x<br />
      {{ piece.myleft() }} {{ piece.myright() }}<br />
      x{{ piece.mydown() }}x
    </div>
  </div>
  <div v-else>
    xxx<br />
    x x<br />
    xxx
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PuzzlePiece } from 'src/models/puzzle';
import { Coordinates, PuzzleTheme } from 'src/models/puzzletheme';

const {
  piece = null, theme = null, scale = 100, pieceColor = '#ffffff', lineColor = '#000000', isLocked = false
} = defineProps<{
  piece: PuzzlePiece | null;
  theme?: PuzzleTheme | null;
  scale?: number;
  pieceColor?: string;
  lineColor?: string;
  isLocked?: boolean
}>();

const scaleVector = computed(() => {
  return new Coordinates(scale || 1, scale || 1)
});

const svgPath = computed(() => {
  if (theme && piece && scale) {
    return theme.toSvg(piece).toSvg(scaleVector.value);
  }
  return ''
});

const pieceStyle = computed(() => {
  return {
    width: `${scale || 50}px`,
    height: `${scale || 50}px`,
    background: pieceColor,
    color: lineColor,
    transform: `rotate(${90 * (piece?.rotation || 0)}deg)`
  }
});

const pathStyle = computed(() => {
  return {
    stroke: lineColor,
    'stroke-width': scale / 10,
    fill: 'none',
  }
})
</script>
