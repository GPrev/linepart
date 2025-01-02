<template>
  <button v-if="deferredPrompt" class="round install button" @click="installApp"><span>￬</span></button>
</template>

<style lang="css">
.install {
  text-decoration: underline;
}

.install span {
  font-size: 30px;
  line-height: 15px;
}
</style>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt (): Promise<void>;
}

window.addEventListener("DOMContentLoaded", async () => {
  if ('BeforeInstallPromptEvent' in window) {
    showResult("⏳ BeforeInstallPromptEvent supported but not fired yet");
  } else {
    showResult("❌ BeforeInstallPromptEvent NOT supported");
  }
});

const deferredPrompt: Ref<BeforeInstallPromptEvent | null> = ref(null);

window.addEventListener('beforeinstallprompt', (e: Event) => {
  // Prevents the default mini-infobar or install dialog from appearing on mobile
  e.preventDefault();
  // Save the event because you’ll need to trigger it later.
  deferredPrompt.value = e as BeforeInstallPromptEvent;
  // Show your customized install prompt for your PWA
  showResult("✅ BeforeInstallPromptEvent fired");

});

window.addEventListener('appinstalled', () => {
  showResult("✅ AppInstalled fired");
});

async function installApp () {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    showResult("🆗 Installation Dialog opened");
    // Find out whether the user confirmed the installation or not
    const { outcome } = await deferredPrompt.value.userChoice;
    // The deferredPrompt can only be used once.
    deferredPrompt.value = null;
    // Act on the user's choice
    if (outcome === 'accepted') {
      showResult('😀 User accepted the install prompt.');
    } else if (outcome === 'dismissed') {
      showResult('😟 User dismissed the install prompt');
    }

  }
}

function showResult (text: string) {
  console.log(text)
}
</script>
