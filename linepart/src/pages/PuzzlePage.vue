<template>
  <q-page class="column content-center justify-center items-center">
    <q-btn class="topleft" href="/" flat round color="primary" icon="arrow_back" />
    <PuzzleGridView :puzzle="puzzleState" :theme="theme" :scale="scale" :isLocked="isSolved" />
    <div v-if="test">
      <br />
      <p>{{ isSolved }}</p>
      <PuzzleGridView :puzzle="puzzleState" :scale="scale" />
    </div>
    <div :class="[{ ['win']: isSolved }, 'popup-container']">
      <q-card v-if="isSolved" :class="[{ ['win']: isSolved }, 'win-popup', 'q-my-md', 'bg-green-2']">
        <q-card-section>
          <p class="text-h6">Congratulations !</p>
          <p class="q-ma-none">You did it !</p>
        </q-card-section>
        <q-card-actions>
          <q-btn outline color="primary" tag="a" href="/puzzle">New puzzle</q-btn>
          <q-btn outline color="primary" tag="a" href="/">Main menu</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<style lang="css">
.topleft {
  position: absolute;
  top: 0px;
  left: 0px;
}

.win-popup {
  transform: scale(0);
}

.win-popup.win {
  animation: popup-on-win .5s ease-in;
  animation-delay: .5s;
  animation-fill-mode: forwards;
}

@keyframes popup-on-win {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.popup-container {
  height: 0;
}

.popup-container.win {
  animation: container-on-win .5s ease-in;
  animation-delay: .5s;
  animation-fill-mode: forwards;
}

@keyframes container-on-win {
  to {
    height: 100px;
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PuzzleGridView from '../components/PuzzleGridView.vue';
import { RotationPuzzle } from 'src/models/puzzle';
import { PuzzleThemeA } from 'src/models/puzzletheme';

const puzzle = ref(RotationPuzzle.makeRandom(3, 3, 8))
const puzzleState = ref(puzzle.value.makeRandomStartingState())

const scale = ref(100)
const theme = ref(new PuzzleThemeA())

const test = ref(false)

const isSolved = computed(() => {
  return puzzleState.value.isSolved();
});
</script>
