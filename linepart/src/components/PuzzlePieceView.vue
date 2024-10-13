<template>
  <div v-if="piece" class="piece relative-position container flex flex-center cursor-pointer"
    :style="pieceStyle" @click="() => { if (!isLocked) piece?.addRotation() }">
    <svg v-if="theme">
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

<style lang="css">
.piece::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: v-bind(lineColor);
    opacity: 0;
}
.piece:active:after {
  animation: piece-clicked .2s ease-in
}
@keyframes piece-clicked {
  from {
  opacity: .5;
  }
}
</style>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
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
    width: `${scale}px`,
    height: `${scale}px`,
    'border-radius': `${scale / 10}px`,
    overflow: 'hidden',
    background: pieceColor,
    color: lineColor,
    transform: `rotate(${rotationValue.value}deg)`,
    'transition-duration': '0.2s',
    'transition-property': 'transform',
  }
});

const pathStyle = computed(() => {
  return {
    stroke: lineColor,
    'stroke-width': scale / 10,
    fill: 'none',
  }
})

function closestEquivalentAngle (from: number, to: number) {
  var delta = ((((to - from) % 360) + 540) % 360) - 180;
  return from + delta;
}

const rotationValue = ref(90 * (piece?.rotation || 0))
watch(() => piece?.rotation, (newRotation) => {
  const newAngle = 90 * (newRotation || 0)
  rotationValue.value = closestEquivalentAngle(rotationValue.value, newAngle)
})

</script>
