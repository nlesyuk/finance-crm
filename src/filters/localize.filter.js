import store from '../store/store'
import en from '@/locales/en'
import ru from '@/locales/ru'


const locales = {
  'en-US': en,
  'ru-RU': ru,
}

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[localize error]: key ${key} not found`
}
