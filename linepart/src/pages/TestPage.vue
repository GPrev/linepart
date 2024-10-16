<template>
  <q-page padding>
    <WinBoxView />
    <q-input v-model.number="scale" type="number" label="Scale" />
    <q-input v-model.number="piece.edges[0]" type="number" />
    <q-input v-model.number="piece.edges[1]" type="number" />
    <q-input v-model.number="piece.edges[2]" type="number" />
    <q-input v-model.number="piece.edges[3]" type="number" />
    <PuzzlePieceView :piece="piece" :theme="theme" :scale="scale" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PuzzlePieceView from 'src/components/PuzzlePieceView.vue';
import WinBoxView from '../components/WinBoxView.vue';
import { PuzzlePiece } from 'src/models/puzzle';
import { PuzzleThemeA } from 'src/models/puzzletheme';

const scale = ref(50)
const piece = ref(new PuzzlePiece())
const theme = ref(new PuzzleThemeA())
</script>
