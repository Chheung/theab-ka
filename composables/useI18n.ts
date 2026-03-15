import kh from '~/locales/kh'
import en from '~/locales/en'

const messages: Record<string, any> = { kh, en }

export function useI18n() {
  const locale = useState<string>('locale', () => 'kh')

  function t(key: string): string {
    const keys = key.split('.')
    let result: any = messages[locale.value]
    for (const k of keys) {
      result = result?.[k]
    }
    return result ?? key
  }

  /** Get a translated value by key path — returns any type (string, array, object) */
  function tv(key: string): any {
    const keys = key.split('.')
    let result: any = messages[locale.value]
    for (const k of keys) {
      result = result?.[k]
    }
    return result
  }

  function setLocale(lang: string) {
    locale.value = lang
  }

  function toggleLocale() {
    locale.value = locale.value === 'kh' ? 'en' : 'kh'
  }

  return { locale, t, tv, setLocale, toggleLocale }
}
