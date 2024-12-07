<template>
  <div v-if="piece" class="piece relative-position container flex flex-center cursor-pointer"
    @click="() => { if (!isLocked) piece?.addRotation() }">
    <svg v-if="theme">
      <path :d="svgPath" class="path" />
    </svg>
    <div v-else>
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
.path {
  stroke: v-bind(lineColor);
  stroke-width: v-bind(scale / 10);
  fill: none;
}

.piece {
  width: v-bind(scale);
  height: v-bind(scale);
  border-radius: v-bind('scale / 10 + "px"');
  overflow: hidden;
  background: v-bind(pieceColor);
  color: v-bind(lineColor);
  transform: v-bind('"rotate(" + rotationValue + "deg)"');
  transition-duration: 0.2s;
  transition-property: transform;
  transition-timing-function: ease-out;
}

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
  animation: piece-clicked .5s ease-out
}

@keyframes piece-clicked {
  from {
    opacity: .3;
  }
}
</style>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { PuzzlePiece } from '/src/models/puzzle';
import { Coordinates, PuzzleTheme } from '/src/models/puzzletheme';

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

function closestEquivalentAngle (from: number, to: number) {
  const delta = ((((to - from) % 360) + 540) % 360) - 180;
  return from + delta;
}

const rotationValue = ref(90 * (piece?.rotation || 0))
watch(() => piece?.rotation, (newRotation) => {
  const newAngle = 90 * (newRotation || 0)
  rotationValue.value = closestEquivalentAngle(rotationValue.value, newAngle)
})

</script>
