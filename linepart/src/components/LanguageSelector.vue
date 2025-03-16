<template>
  <select v-model="i18n.locale.value">
    <option v-for="locale in i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
  </select>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
</script>
