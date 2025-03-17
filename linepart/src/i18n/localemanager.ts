import type { Composer } from 'vue-i18n'

export class LocaleManager {
  i18n: Composer

  constructor(i18n: Composer) {
    this.i18n = i18n
  }

  getAvailableLocales(): string[] {
    return this.i18n.availableLocales
  }

  isLocaleSupported(locale: string | null): boolean {
    return locale != null && this.getAvailableLocales().includes(locale)
  }

  get currentLocale(): string {
    return this.i18n.locale.value
  }

  set currentLocale(locale: string) {
    this.i18n.locale.value = locale
    localStorage.setItem('user-locale', locale)
    document?.querySelector('html')?.setAttribute('lang', locale)
  }

  getBrowserLocale(): string {
    return window.navigator.language.split('-')[0]
  }

  getPersistedLocale(): string | null {
    return localStorage.getItem('user-locale')
  }

  getPreferredLocale(): string {
    // Try locales by order of preference : local storage, then browser, then default
    for (const locale of [this.getPersistedLocale(), this.getBrowserLocale()]) {
      if (locale != null && this.isLocaleSupported(locale)) {
        return locale
      }
    }
    return this.currentLocale
  }
}
