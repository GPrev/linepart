<template>
  <div class="custom-select" @click.stop="() => dropdownOpen = !dropdownOpen">
    <div class="selection">
      <div class="custom-option" :class="['flag', localemanager.currentLocale]" />
    </div>
    <div v-if="dropdownOpen" class="dropdown">
      <div v-for="locale in localemanager.getAvailableLocales().filter(l => l != localemanager.currentLocale)"
        :key="`locale-${locale}`" class="custom-option" :class="['flag', locale]"
        @click="() => { localemanager.currentLocale = locale }" />
    </div>
  </div>
</template>

<style lang="css">
.custom-select {
  color: var(--main-button-color);
  background-color: var(--main-background-color);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(255, 255, 200, 0.4);
  overflow: hidden;
  cursor: pointer;
}

.custom-option {
  padding: .5em;
  position: relative;
}

.custom-option::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
}

.custom-option:hover:after {
  background-color: var(--main-button-color);
  opacity: 0.2;
}

.flag {
  display: flex;
  align-items: center;
}

.flag::before {
  flex-shrink: 0;
  content: "";
  height: 24px;
  width: 24px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.flag.en::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23002781' d='M46,6H2C0.896,6,0,6.896,0,8v32c0,1.104,0.896,2,2,2h44c1.104,0,2-0.896,2-2V8C48,6.896,47.104,6,46,6z'/%3E%3Cpath fill='%23E6E6E6' d='M48,8c0-1.104-0.896-2-2-2h-5.161L28,15.876V6h-8v9.876L7.161,6H2C0.896,6,0,6.896,0,8v2.586L12.239,20H0v8 h12.239L0,37.415V40c0,1.104,0.896,2,2,2h5.161L20,32.124V42h8v-9.876L40.839,42H46c1.104,0,2-0.896,2-2v-2.585L35.761,28H48v-8 H35.761L48,10.586V8z'/%3E%3Cpolygon fill='%23D10D24' points='48,22 26,22 26,6 22,6 22,22 0,22 0,26 22,26 22,42 26,42 26,26 48,26 '/%3E%3Cpath fill='%23D10D24' d='M47.001,6.307L29.2,20h3.28L48,8.062V8C48,7.268,47.587,6.656,47.001,6.307z'/%3E%3Cpath fill='%23D10D24' d='M32.48,28H29.2l17.801,13.693C47.587,41.344,48,40.732,48,40v-0.062L32.48,28z'/%3E%3Cpath fill='%23D10D24' d='M15.52,28L0,39.938V40c0,0.732,0.413,1.344,0.999,1.693L18.8,28H15.52z'/%3E%3Cpath fill='%23D10D24' d='M15.52,20h3.28L0.999,6.307C0.413,6.656,0,7.268,0,8v0.062L15.52,20z'/%3E%3C/svg%3E");
}

.flag.fr::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%2301209F' d='M16,42H2c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h14V42z'/%3E%3Cpath fill='%23EF4234' d='M48,40c0,1.105-0.895,2-2,2H32V6h14c1.105,0,2,0.895,2,2V40z'/%3E%3Crect x='16' y='6' fill='%23E6E6E6' width='16' height='36'/%3E%3C/svg%3E");
}
</style>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { LocaleManager } from '@/i18n/localemanager'

// Sets the locale according to user preference
const i18n = useI18n()
const localemanager = new LocaleManager(i18n)
localemanager.currentLocale = localemanager.getPreferredLocale()

const dropdownOpen = ref(false)

// When clicking outside the dropdown, close the dropdown
onBeforeUnmount(() => {
  document.removeEventListener('click', () => dropdownOpen.value = false)
})
onMounted(() => {
  document.addEventListener('click', () => dropdownOpen.value = false)
})
</script>
