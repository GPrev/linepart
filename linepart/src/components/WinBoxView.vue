<template>
  <div class="winbox my-md shadow">
    <svg class="win-svg left">
      <path d="M 20 0 C 20 60 100 90 100 150" />
    </svg>
    <svg class="win-svg right">
      <path d="M 20 0 C 20 60 100 90 100 150" />
    </svg>
    <p class="text-h6 ma-xs">Congratulations !</p>
    <p class="ma-none">You did it !</p>
    <div class="win-button-row row content-around">
      <RouterLink to="/puzzle" class="button">New puzzle</RouterLink>
      <RouterLink to="/" class="button">Main menu</RouterLink>
    </div>
  </div>
</template>

<style lang="css">
.winbox {
  position: relative;
  border: 2px;
  border-color: v-bind(lineColor);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: v-bind(pieceColor);
  color: v-bind(lineColor);
  overflow: hidden;
}

.winbox div .button {
  position: relative;
  z-index: 1;
  margin: 10px;
  border: solid 1px var(--main-button-color);
  background-color: transparent;
}

.winbox div .button::after {
  background-color: var(--main-background-color);
  opacity: 0.8;
  z-index: -1;
}

.winbox div .button:hover:after {
  background-color: var(--main-button-color);
  opacity: 0.2;
}

.win-svg {
  position: absolute;
  top: 50%;
  opacity: .3;
  translate: 0 -50%;
  pointer-events: none;
}

.win-svg.left {
  left: 0;
}

.win-svg.right {
  right: 0;
  scale: -1 1;
}

.win-svg path {
  stroke: v-bind(lineColor);
  stroke-width: v-bind('scale / 10');
  fill: none;
}
</style>

<script setup lang="ts">
const {
  scale = 100, pieceColor = '#ffffff', lineColor = '#000000'
} = defineProps<{
  scale?: number;
  pieceColor?: string;
  lineColor?: string;
}>();
</script>
