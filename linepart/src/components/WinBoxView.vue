<template>
  <div class="winbox q-my-md shadow">
    <svg class="win-svg left">
      <path d="M 20 0 C 20 60 100 90 100 150" />
    </svg>
    <svg class="win-svg right">
      <path d="M 20 0 C 20 60 100 90 100 150" />
    </svg>
    <p class="text-h6 q-ma-xs">Congratulations !</p>
    <p class="q-ma-none">You did it !</p>
    <div class="row content-around">
      <q-btn class="button" outline :color="lineColor" tag="a" href="/puzzle">New puzzle</q-btn>
      <q-btn class="button" outline :color="lineColor" tag="a" href="/">Main menu</q-btn>
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

.button {
  margin: 10px;
}

.button::before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: v-bind(pieceColor);
  opacity: .8;
}

.win-svg {
  position: absolute;
  top: 50%;
  opacity: .3;
  translate: 0 -50%;
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
